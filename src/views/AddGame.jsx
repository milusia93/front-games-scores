import { useState } from "react"
import GameForm from "../components/GameForm"

const choicesGenres = ['strategiczna', 'euro', 'kooperacyjna', 'RPG', 'ekonomiczna', 'dedukcyjna', 'karciana', 'wojenna', 'narracyjna', 'imprezowa', 'edukacyjna', 'logiczna', 'słowna', 'zręcznościowa', 'trivia']

const AddGame = () => {

    const [addedGame, setAddedGame] = useState({
        name: "",
        numplayers: "",
        genres: ""
    })

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setAddedGame({
            ...addedGame,
            [name]: target.value,
        });
    }

    const handleSubmit = (e) => {
        console.log("gra dodana")
        // e.preventDefault()
        // savePlayer(addedPlayer)
        // resetForm()
    }
    console.log(addedGame)
    return (
        <GameForm addedGame={addedGame} handleInputChange={handleInputChange} handleSubmit={handleSubmit} choicesGenres={choicesGenres}/>
    )
}
export default AddGame