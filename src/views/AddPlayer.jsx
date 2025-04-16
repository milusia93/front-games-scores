import axios from "axios";
import config from "../config";
import { useEffect, useRef, useState } from "react";
import PlayerForm from "../components/PlayerForm"
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Alert, Container } from "react-bootstrap";


const choicesColors = [
    ['', 'Wybierz swój kolor...'],
    ['red', 'czerwony'],
    ['blue', 'niebieski'],
    ['green', 'zielony'],
    ['yellow', 'żółty'],
    ['pink', 'różowy'],
    ['purple', 'fioletowy'],
    ['gray', 'szary'],
]

const AddPlayer = () => {

    const params = useParams()
    const id = params.id
    const navigate = useNavigate();

    const [addedPlayer, setAddedPlayer] = useState({
        name: "",
        email: "",
        color: "",
        file: "",
    })

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        color: "",
        file: "",
    })
    const [message, setMessage] = useState("")

    useEffect(() => {
        const getSinglePlayer = () => {
            axios
                .get(config.api.url + `/players/${id}`)
                .then((res) => {
                    setAddedPlayer(res.data);
                    console.log(addedPlayer)
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        if (id) {
            getSinglePlayer();
        }

        return () => {
            resetForm()
        }
    }, [id])

    const fileInputRef = useRef(null);


    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setAddedPlayer({
            ...addedPlayer,
            [name]: target.value,
        });
    }

    const handleFileChange = (e) => {
        setAddedPlayer({
            ...addedPlayer,
            file: e.target.files[0],
        });
    };



    const savePlayer = (playerObj) => {
        setMessage("");
        axios
            .post(config.api.url + "/players/add", playerObj, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                console.log("Dodano gracza:", res.data);
                fileInputRef.current.value = null;
                setMessage("");
                resetForm();
            })
            .catch((err) => {
                if (err.response && err.response.status === 409) {
                    const data = err.response.data;
                    const message = data.message || "Nieznany błąd";  
                    setMessage(message);  
                } else {
                    console.error("Inny błąd:", err);
                    setMessage("Wystąpił błąd serwera.");
                }
            });
    };

    const updatePlayer = (playerObj) => {

        axios
            .put(config.api.url + `/players/update/${id}`, playerObj, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                navigate(`/players/${id}`);
                console.log(res);
            })
            .catch((err) => {
                if (err.response && err.response.status === 409) {
                    const data = err.response.data;
                    const message = data.message || "Nieznany błąd";  
                    setMessage(message);  
                } else {
                    console.error("Inny błąd:", err);
                    setMessage("Wystąpił błąd serwera.");
                }
            });
    };

    const resetForm = () => {
        setAddedPlayer({
            name: "",
            email: "",
            color: "",
            file: "",
        });
        setErrors({
            name: "",
            email: "",
            color: "",
            file: "",
        })
    }



  
    const validateForm = () => {
        let hasErrors = false;

        if (addedPlayer.name.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: "Wpisz nazwę użytkownika.",
            }));
            hasErrors = true;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: "",
            }));
        }

        if (addedPlayer.email.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "Wpisz email.",
            }));
            hasErrors = true;
        } else if (!/\S+@\S+\.\S+/.test(addedPlayer.email)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "Wpisz poprawny adres email.",
            }));
            hasErrors = true;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "",
            }));
        }

        if (addedPlayer.color === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                color: "Wybierz kolor.",
            }));
            hasErrors = true;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                color: "",
            }));
        }

        // if (!addedPlayer.file) {
        //     setErrors((prevErrors) => ({
        //         ...prevErrors,
        //         file: "Wybierz avatar.",
        //     }));
        //     hasErrors = true;
        // } else {
        //     setErrors((prevErrors) => ({
        //         ...prevErrors,
        //         file: "",
        //     }));
        // }

        return hasErrors; 
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            return; 
        }

        const formData = new FormData();
        formData.append("name", addedPlayer.name);
        formData.append("email", addedPlayer.email);
        formData.append("color", addedPlayer.color);
        if (addedPlayer.file) {
            formData.append("file", addedPlayer.file);
        }

        if (id) {
            updatePlayer(formData); 
        } else {
            savePlayer(formData); 
        }
    };

    console.log(addedPlayer)
    return (
    <Container>
       {message && message.length > 0 && (
                <Alert variant="danger">
                    {message}
                </Alert>
            )}

      <PlayerForm
        addedPlayer={addedPlayer}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        choicesColors={choicesColors}
        handleFileChange={handleFileChange}
        fileInputRef={fileInputRef}
        errors={errors}
      />
    </Container>
  );
}
export default AddPlayer