import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Container, Form, FormControl, FormGroup, FormLabel, FormSelect, FormText } from "react-bootstrap";
import SelectColor from "./SelectColor";
const PlayerForm = (props) => {


  return (
    <Container>
      <Form onSubmit={props.handleSubmit}>
        <FormGroup className="mb-3" controlId="playerName">
          <FormLabel>Nazwa gracza</FormLabel>
          <FormControl type="text" name="name" placeholder="Username" value={props.addedPlayer.name} onChange={props.handleInputChange} />
          <Form.Text id="nameHelp">Wybierz swoją nazwę użytkownika.</Form.Text>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel>Adres email</FormLabel>
          <FormControl type="email" name="email" value={props.addedPlayer.email} onChange={props.handleInputChange} />
          <FormText id="emailHelp">Nie będziemy dzielić się Twoim adresem email.</FormText>
        </FormGroup>
        {/* <div className="mb-3">
          <label htmlFor="player-password" className="form-label">Password</label>
          <input type="password" className="form-control" id="player-password" />
        </div> */}
        <FormGroup className="mb-3">
          <FormLabel>Kolor</FormLabel>
          <SelectColor values={props.choicesColors} handleInputChange={props.handleInputChange} selectedValue={props.addedPlayer.color}/>
        </FormGroup>
        <Button variant="primary" type="submit">
          Zatwierdź
        </Button>
      </Form>
    </Container>
  )
}

export default PlayerForm;