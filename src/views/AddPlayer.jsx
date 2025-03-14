import axios from "axios";
import config from "../config";
import { useState } from "react";
import PlayerForm from "../components/PlayerForm"


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
        axios
            .post(config.api.url + "/players/add", playerObj, {
                headers: { "Content-Type": "multipart/form-data" },
            })
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", addedPlayer.file);
        formData.append("email", addedPlayer.email);
        formData.append("name", addedPlayer.name);
        formData.append("color", addedPlayer.color);
    
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
        <PlayerForm addedPlayer={addedPlayer} handleInputChange={handleInputChange} handleSubmit={handleSubmit} choicesColors={choicesColors}  handleFileChange={handleFileChange}/>
    )
}
export default AddPlayer