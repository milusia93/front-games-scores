import axios from "axios"
import config from "../config";
import { useEffect, useRef, useState } from "react";
import GameForm from "../components/GameForm"
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Alert, Container } from "react-bootstrap";


const choicesGenres = ['strategiczna', 'euro', 'kooperacyjna', 'RPG', 'ekonomiczna', 'dedukcyjna', 'karciana', 'wojenna', 'narracyjna', 'imprezowa', 'edukacyjna', 'logiczna', 'słowna', 'zręcznościowa', 'trivia']

const AddGame = () => {


    const { gameId } = useParams()
    const navigate = useNavigate();

    const [addedGame, setAddedGame] = useState({
        name: "",
        minnumplayers: 0,
        maxnumplayers: 0,
        genres: [],
        file: ""
    })

    const [errors, setErrors] = useState({
        name: "",
        minnumplayers: "",
        maxnumplayers: "",
        genres: "",
        file: ""
    })
    const [message, setMessage] = useState("")

    useEffect(() => {

        if (gameId) {
            axios
                .get(config.api.url + `/games/${gameId}`)
                .then((res) => {
                    setAddedGame(res.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        return () => {
            resetForm()
        }
    }, [gameId])

    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        let value = target.value;
    
        if (name === "minnumplayers" || name === "maxnumplayers") {
            value = Number(value); 
        }
    
        if (name === "minnumplayers") {
            setAddedGame({
                ...addedGame,
                [name]: value,
                maxnumplayers: "", 
            });
        } else {
            setAddedGame({
                ...addedGame,
                [name]: value,
            });
        }
    };

    const handleFileChange = (e) => {
        setAddedGame({
            ...addedGame,
            file: e.target.files[0],
        });
    };


    const handleGenresCheck = (e) => {

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

        axios
            .post(config.api.url + "/games/add", gameObj, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                fileInputRef.current.value = null;
                setMessage("");
                navigate("/games");
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

    const updateGame = (gameObj) => {
        axios
            .put(config.api.url + `/games/update/${gameId}`, gameObj, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                navigate("/games");
            })
            .catch((err) => {
                console.error("Błąd aktualizacji:", err);
                setMessage("Wystąpił błąd podczas aktualizacji gry.");
            });
    }


    const resetForm = () => {
        setAddedGame({
            name: "",
            minnumplayers: 0,
            maxnumplayers: 0,
            genres: [],
            file: "",
        });

        setErrors({
            name: "",
            minnumplayers: "",
            maxnumplayers: "",
            genres: "",
            file: "",
        });

        setMessage("");
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
    
            // Walidacja liczby graczy (minnumplayers)
        if (addedGame.minnumplayers <= 0 || isNaN(addedGame.minnumplayers)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                minnumplayers: "Wpisz poprawną liczbę graczy większą niż 0.",
            }));
            console.log("Błędna liczba minimalnych graczy");
            hasErrors = true;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                minnumplayers: "",
            }));
        }

        // Walidacja liczby graczy (maxnumplayers)
        if (addedGame.maxnumplayers <= 0 || isNaN(addedGame.maxnumplayers)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                maxnumplayers: "Wpisz poprawną liczbę graczy większą niż 0.",
            }));
            console.log("Błędna liczba maksymalnych graczy");
            hasErrors = true;
        } else if (addedGame.maxnumplayers < addedGame.minnumplayers) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                maxnumplayers: "Maksymalna liczba graczy musi być większa bądź równa minimalnej liczbie graczy.",
            }));
            console.log("Błędna liczba graczy");
            hasErrors = true;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                maxnumplayers: "",
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
        e.preventDefault()
        
        if (validateForm()) {
            return; 
        }
        const formData = new FormData();
        formData.append("name", addedGame.name);
        formData.append("minnumplayers", addedGame.minnumplayers);
        formData.append("maxnumplayers", addedGame.maxnumplayers);
        addedGame.genres.forEach(genre => {
            formData.append("genres[]", genre);  // używamy "genres[]" jako klucza, by wskazać, że to tablica
        });
        if (addedGame.file) {
            formData.append("file", addedGame.file);
        }
        if (gameId) {
            updateGame(formData); 
        } else {
            saveGame(formData); 
        }
        
    };

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