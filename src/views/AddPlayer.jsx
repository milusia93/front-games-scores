import axios from "axios";
import config from "../config";
import { useEffect, useRef, useState } from "react";
import PlayerForm from "../components/PlayerForm"
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";


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

    useEffect(() => {
        const getSinglePlayer = () => {
            axios
                .get(config.api.url + `/players/${id}`)
                .then((res) => {
                    setAddedPlayer(res.data);
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
        axios
            .post(config.api.url + "/players/add", playerObj, {
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
            console.error(err);
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        if (addedPlayer.file) { 
            formData.append("file", addedPlayer.file);
        }
        formData.append("email", addedPlayer.email);
        formData.append("name", addedPlayer.name);
        formData.append("color", addedPlayer.color);
    
        console.log(id, addedPlayer)
        if (id) {
            updatePlayer(formData);
            
          } else {
            savePlayer(formData);
            resetForm();
          }
     
    }

    // const validateForm = (e) => {
    //     e.preventDefault()
    //     console.log(addedPlayer)
    //     savePlayer()
    //     resetForm()
    // }

    console.log(addedPlayer)
    return (
        <PlayerForm addedPlayer={addedPlayer} handleInputChange={handleInputChange} handleSubmit={handleSubmit} choicesColors={choicesColors}  handleFileChange={handleFileChange} fileInputRef={fileInputRef}/>
    )
}
export default AddPlayer