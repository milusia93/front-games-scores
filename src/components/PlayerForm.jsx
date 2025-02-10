import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Form, FormControl, FormGroup, FormLabel, FormSelect, FormText } from "react-bootstrap";
import SelectColor from "./SelectColor";
const PlayerForm = () => {

  const [playerColor, setPlayerColor] = useState({ key: '', val: '' })
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

  const choicesColors = [
    ['', 'Choose your color...'],
    ['red', 'Red'],
    ['blue', 'Blue'],
    ['green', 'Green']
  ]

  const handleChangeColor = (e) => {
    setPlayerColor({
      key: e.target.value,
      val: e.target.options[e.target.selectedIndex].innerText
    })
    handleInputChangeColor(e)
  }
  const handleImputChange = (e) => {
    const target = e.target;
    const name = target.name;
    console.log(e.target)
    setAddedPlayer({
      ...addedPlayer,
      [name]: target.value,
    });
  }

  const handleInputChangeColor = (e) => {
    const target = e.target;
    const options = target.options
    setAddedPlayer({
      ...addedPlayer,
      color: options[target.selectedIndex].innerText,
    });
  }

  const savePlayer = (eventObj) => {
    console.log('player saved')
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

  const validateForm = (e) => {
    e.preventDefault()

    savePlayer()
    resetForm()
  }
  console.log(addedPlayer)
  return (
    <Container>
      <Form onSubmit={validateForm}>
        <FormGroup className="mb-3" controlId="playerName">
          <FormLabel>Username</FormLabel>
          <FormControl type="text" name="name" placeholder="Username" value={addedPlayer.name} onChange={handleImputChange} />
          <Form.Text id="nameHelp">Choose your username.</Form.Text>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel>Email address</FormLabel>
          <FormControl type="email" name="email" value={addedPlayer.email} onChange={handleImputChange} />
          <FormText id="emailHelp">We'll never share your email with anyone else.</FormText>
        </FormGroup>
        {/* <div className="mb-3">
          <label htmlFor="player-password" className="form-label">Password</label>
          <input type="password" className="form-control" id="player-password" />
        </div> */}
        <FormGroup>
          <FormLabel>Color</FormLabel>
          <SelectColor values={choicesColors} handleChangeColor={handleChangeColor} selectedValue={playerColor.key} name="color" />
        </FormGroup>
        <div className="mb-3">
          <label htmlFor="player-color" className="form-label">Color</label>
          <select className="form-select form-select-lg mb-3" aria-label=".form-select-sm example" id="player-color" onChange={handleInputChangeColor} value={addedPlayer.color} >
            <option value="" disabled>Choose your color...</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </Form>
    </Container>
  )
}

export default PlayerForm;