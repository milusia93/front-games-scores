import axios from "axios";
import config from "../config";
import { useState } from "react";
import PlayerForm from "../components/PlayerForm"


const choicesColors = [
    ['', 'Wybierz swój kolor...'],
    ['red', 'czerwony'],
    ['blue', 'niebieski'],
    ['green', 'zielony']
  ]
  
const AddPlayer = () => {

    const [addedPlayer, setAddedPlayer] = useState({
        name: "",
        email: "",
        color: ""
    })

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        color: ""
    })
     
    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        
        setAddedPlayer({
            ...addedPlayer,
            [name]: target.value,
        });
    }


    const savePlayer = (playerObj) => {
        axios
            .post(config.api.url + "/players/add", playerObj, {mode: "cors"})
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err)
            });
    }

    const resetForm = () => {
        setAddedPlayer({
            name: "",
            email: "",
            color: ""
        });
        setErrors({
            name: "",
            email: "",
            color: ""
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        savePlayer(addedPlayer)
        resetForm()
    }

    // const validateForm = (e) => {
    //     e.preventDefault()
    //     console.log(addedPlayer)
    //     savePlayer()
    //     resetForm()
    // }

    console.log(addedPlayer)
    return (
        <PlayerForm addedPlayer={addedPlayer} handleInputChange={handleInputChange} handleSubmit={handleSubmit} choicesColors={choicesColors}/>
    )
}
export default AddPlayer