import axios from "axios"
import config from "../config";
import { useEffect, useRef, useState } from "react";
import GameForm from "../components/GameForm"
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Alert, Container } from "react-bootstrap";


const choicesGenres = ['strategiczna', 'euro', 'kooperacyjna', 'RPG', 'ekonomiczna', 'dedukcyjna', 'karciana', 'wojenna', 'narracyjna', 'imprezowa', 'edukacyjna', 'logiczna', 'słowna', 'zręcznościowa', 'trivia']

const AddGame = () => {

    const params = useParams()
    const id = params.id
    const navigate = useNavigate();

    const [addedGame, setAddedGame] = useState({
        name: "",
        numplayers: 0,
        genres: [],
        file: ""
    })

    const [errors, setErrors] = useState({
        name: "",
        numplayers: "",
        genres: "",
        file: ""
    })
    const [message, setMessage] = useState("")

    useEffect(() => {

        if (id) {
            axios
                .get(config.api.url + `/games/${id}`)
                .then((res) => {
                    setAddedGame(res.data);
                    console.log(addedGame)
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        return () => {
            resetForm()
        }
    }, [id])

    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        let value = target.value;

        if (name === "numplayers") {
            value = Number(value); 
        }

        setAddedGame({
            ...addedGame,
            [name]: value,
        });
    }

    const handleFileChange = (e) => {
        setAddedGame({
            ...addedGame,
            file: e.target.files[0],
        });
    };


    const handleGenresCheck = (e) => {
        console.log(e.target.value);
        const value = e.target.value;
        const isTargetInState = addedGame.genres.includes(value);
        if (isTargetInState) {
            setAddedGame({
                ...addedGame,
                genres: addedGame.genres.filter((g) => g !== value)
            });
        } else {
            setAddedGame({ ...addedGame, genres: [...addedGame.genres, value] });
        }
    };

    const saveGame = (gameObj) => {
        console.log("wysyłam grę") 
        axios
            .post(config.api.url + "/games/add", gameObj, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                console.log("Dodano grę:", res.data);
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
    }


    const resetForm = () => {
        setAddedGame({
            name: "",
            numplayers: 0,
            genres: [],
            file: "",
        });

        setErrors({
            name: "",
            numplayers: "",
            genres: "",
            file: "",
        });
    }

    const validateForm = () => {
        let hasErrors = false;
    
        // Walidacja nazwy gry
        if (addedGame.name.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: "Wpisz nazwę gry.",
            }));
            console.log("Błąd w nazwie gry");
            hasErrors = true;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: "",
            }));
        }
    
        // Walidacja liczby graczy (numplayers)
        if (addedGame.numplayers === 0) { // Sprawdzamy, czy liczba graczy to 0
            setErrors((prevErrors) => ({
                ...prevErrors,
                numplayers: "Wybierz liczbę graczy większą niż 0.",
            }));
            console.log("Za mała liczba graczy");
            hasErrors = true;
        } else if (isNaN(addedGame.numplayers) || addedGame.numplayers <= 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                numplayers: "Wpisz poprawną liczbę graczy.",
            }));
            console.log("Błędna liczba graczy");
            hasErrors = true;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                numplayers: "",
            }));
        }
    
        // Walidacja gatunków
        if (addedGame.genres.length === 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                genres: "Wybierz co najmniej jeden gatunek.",
            }));
            console.log("Nie wybrano gatunków");
            hasErrors = true;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                genres: "",
            }));
        }
    
        return hasErrors;
    };

    const handleSubmit = (e) => {
        console.log("gra dodana")
        e.preventDefault()
        
        if (validateForm()) {
            console.log("Formularz ma błędy");
            return; 
        }
        const formData = new FormData();
        formData.append("name", addedGame.name);
        formData.append("numplayers", addedGame.numplayers);
        formData.append("genres", addedGame.genres);
        if (addedGame.file) {
            formData.append("file", addedGame.file);
        }
        console.log("Form data", formData);
        if (id) {
            updateGame(formData); 
        } else {
            saveGame(formData); 
        }
        
    };

    // console.log(addedGame)
    return (
        <Container>
            {message && message.length > 0 && (
                <Alert variant="danger">
                    {message}
                </Alert>
            )}
            <GameForm
                addedGame={addedGame}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleFileChange={handleFileChange}
                handleGenresCheck={handleGenresCheck}
                choicesGenres={choicesGenres}
                fileInputRef={fileInputRef}
                errors={errors}
            />
        </Container>
    )
}
export default AddGame;