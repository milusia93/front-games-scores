import axios from "axios"
import config from "../config";
import { useRef, useState } from "react";
import GameForm from "../components/GameForm"


const choicesGenres = ['strategiczna', 'euro', 'kooperacyjna', 'RPG', 'ekonomiczna', 'dedukcyjna', 'karciana', 'wojenna', 'narracyjna', 'imprezowa', 'edukacyjna', 'logiczna', 'słowna', 'zręcznościowa', 'trivia']

const AddGame = () => {

    const [addedGame, setAddedGame] = useState({
        name: "",
        numplayers: "",
        genres: [],
        file: ""
    })

    const [errors, setErrors] = useState({
        name: "",
        numplayers: "",
        genres: "",
        file: ""
    })

    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setAddedGame({
            ...addedGame,
            [name]: target.value,
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
        axios
            .post(config.api.url + "/games/add", gameObj, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                console.log(res);
                fileInputRef.current.value = null
            })
            .catch((err) => {
                console.error(err)
            });
    }


    const resetForm = () => {
        setAddedGame({
            name: "",
            numplayers: "",
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

    const handleSubmit = (e) => {
        console.log("gra dodana")
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", addedGame.name);
        formData.append("numplayers", addedGame.numplayers);
        formData.append("genres", addedGame.genres);
        formData.append("file", addedGame.file);
        saveGame(addedGame)
        resetForm()
    };

    console.log(addedGame)
    return (
        <GameForm handleFileChange={handleFileChange} handleGenresCheck={handleGenresCheck} addedGame={addedGame} handleInputChange={handleInputChange} handleSubmit={handleSubmit} choicesGenres={choicesGenres} fileInputRef={fileInputRef}/>
    )
}
export default AddGame;