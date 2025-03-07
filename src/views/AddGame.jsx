import axios from "axios"
import config from "../config";
import { useState } from "react"
import GameForm from "../components/GameForm"


const choicesGenres = ['strategiczna', 'euro', 'kooperacyjna', 'RPG', 'ekonomiczna', 'dedukcyjna', 'karciana', 'wojenna', 'narracyjna', 'imprezowa', 'edukacyjna', 'logiczna', 'słowna', 'zręcznościowa', 'trivia']

const AddGame = () => {

    const [addedGame, setAddedGame] = useState({
        name: "",
        numplayers: "",
        genres: [],
    })

    const [errors, setErrors] = useState({
        name: "",
        numplayers: "",
        genres: "",
    })

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setAddedGame({
            ...addedGame,
            [name]: target.value,
        });
    }

  

    const handleGenresCheck = (e) => {
        console.log(e.target.value);
        const value = e.target.value;
        const isTargetInState = addedGame.genres.includes(value);
        if (isTargetInState) {
            setAddedGame({
                ...addedGame,
                genres:addedGame.genres.filter((g) => g !== value)
            });
        } else {
            setAddedGame({ ...addedGame, genres: [ ...addedGame.genres, value ]});
        }
    };

    const saveGame = (gameObj) => {
        axios
            .post(config.api.url + "/games/add", gameObj, {mode: "cors"})
            .then((res) => {
                console.log(res);
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
        });

        setErrors({
            name: "",
            numplayers: "",
            genres: "",
        });
    }

    const handleSubmit = (e) => {
        console.log("gra dodana")
        e.preventDefault()
        saveGame(addedGame)
        resetForm()
    };

    console.log(addedGame)
    return (
        <GameForm handleGenresCheck={handleGenresCheck} addedGame={addedGame} handleInputChange={handleInputChange} handleSubmit={handleSubmit} choicesGenres={choicesGenres}/>
    )
}
export default AddGame;