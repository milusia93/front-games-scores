import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, FormText } from "react-bootstrap";
import SelectColor from "./SelectColor";
import config from "../config";
import "./PlayerForm.css"
const PlayerForm = (props) => {
  const renderImagePreview = () => {
    if (props.addedPlayer.file) {
      const imageUrl = URL.createObjectURL(props.addedPlayer.file);
      return (
        <div className="image-preview">
          <img src={imageUrl} alt="Podgląd wybranego obrazu" className="image" />
        </div>
      );
    }
  
    if (props.addedPlayer.avatarUrl) {
      return (
        <div className="image-preview mb-2">
          <img
            src={`${config.api.url}/${props.addedPlayer.avatarUrl}`}
            alt="Obecny avatar"
            className="image"
          />
        </div>
      );
    }
  
    return null;
  };

  return (
    <Form onSubmit={props.handleSubmit}>
      <FormGroup className="mb-3" controlId="playerName">
        <FormLabel>Nazwa gracza</FormLabel>
        <FormControl type="text" name="name" placeholder="Username" value={props.addedPlayer.name} onChange={props.handleInputChange} />
        {/* <Form.Text id="nameHelp">Wybierz swoją nazwę użytkownika.</Form.Text> */}
        {props.errors.name && <p className="warning">{props.errors.name}</p>}
      </FormGroup>
      <FormGroup className="mb-3">
        <FormLabel>Adres email</FormLabel>
        <FormControl type="email" name="email" value={props.addedPlayer.email} onChange={props.handleInputChange} />
        {/* <FormText id="emailHelp">Nie będziemy dzielić się Twoim adresem email.</FormText> */}
        {props.errors.email && <p className="warning">{props.errors.email}</p>}
      </FormGroup>
      <FormGroup className="mb-3">
        <FormLabel>Avatar</FormLabel>
        <FormControl
          type="file"
          name="file"
          onChange={props.handleFileChange}
          ref={props.fileInputRef}
        />
        {/* <FormText id="emailHelp">Twój avatar</FormText> */}
        {props.errors.file && <p className="warning">{props.errors.file}</p>}
        {renderImagePreview()}
      </FormGroup>
      {/* <div className="mb-3">
          <label htmlFor="player-password" className="form-label">Password</label>
          <input type="password" className="form-control" id="player-password" />
        </div> */}
      <FormGroup className="mb-3">
        <FormLabel>Kolor</FormLabel>
        <SelectColor values={props.choicesColors} handleInputChange={props.handleInputChange} selectedValue={props.addedPlayer.color} />
        {props.errors.color && <p className="warning">{props.errors.color}</p>}
      </FormGroup>
      <Button variant="primary" type="submit">
        Zatwierdź
      </Button>
    </Form>
  )
}

export default PlayerForm;