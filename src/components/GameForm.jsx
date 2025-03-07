import { Button, Container, Form, FormControl, FormGroup, FormLabel, FormText } from "react-bootstrap";
import CheckGenres from "./CheckGenres";

const GameForm = (props) => {
    return (
        <Container>
            <Form onSubmit={props.handleSubmit}>
                <FormGroup className="mb-3">
                    <FormLabel>Nazwa gry</FormLabel>
                    <FormControl type="text" name="name" value={props.addedGame.name} onChange={props.handleInputChange}></FormControl>
                    <FormText>Podaj nazwę gry</FormText>
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel>Liczba graczy</FormLabel>
                    <FormControl type="text" name="numplayers" value={props.addedGame.numplayers} onChange={props.handleInputChange}></FormControl>
                    <FormText>Podaj maksymalną liczbę graczy</FormText>
                </FormGroup>
                <CheckGenres values={props.choicesGenres} handleGenresCheck={props.handleGenresCheck} checkedValues={props.addedGame.genres} />
                <Button variant="primary" type="submit">
                    Zatwierdź
                </Button>
            </Form>
        </Container>
    )
}

export default GameForm;