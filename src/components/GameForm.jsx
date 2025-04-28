import { Button, Container, Form, FormControl, FormGroup, FormLabel, FormText } from "react-bootstrap";
import CheckGenres from "./CheckGenres";
import config from "../config";

const GameForm = (props) => {
    const renderImagePreview = () => {
        if (props.addedGame.file) {
            const imageUrl = URL.createObjectURL(props.addedGame.file);
            return (
                <div className="image-preview">
                    <img src={imageUrl} alt="Podgląd wybranego obrazu" className="image" />
                </div>
            );
        }

        if (props.addedGame.imageUrl) {
            return (
                <div className="image-preview mb-2">
                    <img
                        src={`${config.api.url}/${props.addedGame.imageUrl}`}
                        alt="Obecny avatar"
                        className="image"
                    />
                </div>
            );
        }

        return null;
    };
    return (
        <Container>
            <Form onSubmit={props.handleSubmit}>
                <FormGroup className="mb-3">
                    <FormLabel>Nazwa gry</FormLabel>
                    <FormControl type="text" name="name" value={props.addedGame.name} onChange={props.handleInputChange}></FormControl>
                    {/* <FormText>Podaj nazwę gry</FormText> */}
                    {props.errors.name && <p className="warning">{props.errors.name}</p>}
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel>Maksymalna liczba graczy</FormLabel>
                    <FormControl as="select" name="numplayers" value={props.addedGame.numplayers} onChange={props.handleInputChange}>
                        <option value="">Wybierz liczbę graczy</option>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </FormControl>
                    {/* <FormText>Podaj maksymalną liczbę graczy</FormText> */}
                    {props.errors.numplayers && <p className="warning">{props.errors.numplayers}</p>}
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel>Grafika dla gry</FormLabel>
                    <FormControl
                        type="file"
                        name="file"
                        onChange={props.handleFileChange}
                        ref={props.fileInputRef}
                    />
                    {/* <FormText id="emailHelp">Obraz dla gry</FormText> */}
                    {props.errors.file && <p className="warning">{props.errors.file}</p>}
                    {renderImagePreview()}
                </FormGroup>
                <CheckGenres values={props.choicesGenres} handleGenresCheck={props.handleGenresCheck} checkedValues={props.addedGame.genres} />
                {props.errors.genres && <p className="warning">{props.errors.genres}</p>}
                <Button variant="primary" type="submit">
                    Zatwierdź
                </Button>
            </Form>
        </Container>
    )
}

export default GameForm;