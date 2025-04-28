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
                    {props.errors.name && <p className="warning">{props.errors.name}</p>}
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel>Minimalna liczba graczy</FormLabel>
                    <FormControl as="select" name="minnumplayers" value={props.addedGame.minnumplayers} onChange={props.handleInputChange}>
                        <option value="">Wybierz minimalną liczbę graczy</option>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </FormControl>
                    {props.errors.minnumplayers && <p className="warning">{props.errors.minnumplayers}</p>}
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel>Maksymalna liczba graczy</FormLabel>
                    <FormControl as="select" name="maxnumplayers" value={props.addedGame.maxnumplayers} onChange={props.handleInputChange} disabled={!props.addedGame.minnumplayers}>
                    <option value="">Wybierz maksymalną liczbę graczy</option>
                        {props.addedGame.minnumplayers &&
                            Array.from(
                                { length: 10 - props.addedGame.minnumplayers + 1 },
                                (_, i) => i + props.addedGame.minnumplayers
                            ).map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                        ))}
                    </FormControl>
                    {props.errors.maxnumplayers && <p className="warning">{props.errors.maxnumplayers}</p>}
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel>Grafika dla gry</FormLabel>
                    <FormControl
                        type="file"
                        name="file"
                        onChange={props.handleFileChange}
                        ref={props.fileInputRef}
                    />
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