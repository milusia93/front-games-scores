import React from "react";
import { Form, Button, FormGroup, FormLabel, FormCheck, FormControl } from "react-bootstrap";

const GameSessionForm = ({
    newSession,
    games,
    players,
    errors,
    handleInputChange,
    handlePlayerCheckboxChange,
    handleSubmit,
    sessionId,
    minnumplayers,
    maxnumplayers,
    handleGameChange,
}) => {
    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
                <FormLabel>Wybierz grę</FormLabel>
                <FormControl
                    as="select"
                    name="game"
                    value={newSession.game}
                    onChange={handleGameChange}
                >
                    <option value="">Wybierz grę</option>
                    {games.map((game) => (
                        <option key={game._id} value={game._id}>
                            {game.name}
                        </option>
                    ))}
                </FormControl>
                {errors.game && <p className="warning">{errors.game}</p>}
            </FormGroup>

            <FormGroup className="mb-3">
                <FormLabel>Liczba graczy (od {minnumplayers} do {maxnumplayers})</FormLabel>
                <FormControl
                    as="select"
                    name="numplayers"
                    value={newSession.numplayers}
                    onChange={handleInputChange}
                >
                    <option value="">Wybierz liczbę graczy</option>
                    {minnumplayers && maxnumplayers &&
                        Array.from({ length: maxnumplayers - minnumplayers + 1 }, (_, i) => i + minnumplayers).map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                </FormControl>
                {errors.numplayers && <p className="warning">{errors.numplayers}</p>}
            </FormGroup>

            {newSession.numplayers > 0 && (
                <FormGroup className="mb-3">
                    <FormLabel>Wybierz graczy ({newSession.players.length}/{newSession.numplayers})</FormLabel>
                    {players.map((player) => (
                        <FormCheck
                            key={player._id}
                            type="checkbox"
                            label={player.name}
                            value={player._id}
                            checked={newSession.players.includes(player._id)}
                            onChange={(e) => handlePlayerCheckboxChange(e, player._id)}
                            disabled={newSession.players.length >= newSession.numplayers && !newSession.players.includes(player._id)}
                        />
                    ))}
                    {errors.players && <p className="warning">{errors.players}</p>}
                </FormGroup>
            )}

            <FormGroup className="mb-3">
                <FormLabel>Data sesji</FormLabel>
                <FormControl
                    type="date"
                    name="date"
                    value={newSession.date}
                    onChange={handleInputChange}
                />
                {errors.date && <p className="warning">{errors.date}</p>}
            </FormGroup>

            <FormGroup className="mb-3">
                <FormLabel>Sesja zakończona?</FormLabel>
                <FormControl
                    as="select"
                    name="finished"
                    value={newSession.finished}
                    onChange={handleInputChange}
                >
                    <option value={false}>Nie</option>
                    <option value={true}>Tak</option>
                </FormControl>
            </FormGroup>

            {newSession.finished && (
                <FormGroup className="mb-3">
                    <FormLabel>Wybierz zwycięzcę</FormLabel>
                    <FormControl
                        as="select"
                        name="winner"
                        value={newSession.winner}
                        onChange={handleInputChange}
                    >
                        <option value="">Wybierz zwycięzcę</option>
                        {newSession.players.map((player) => (
                            <option key={player._id} value={player._id}>
                                {player._id}
                            </option>
                        ))}
                    </FormControl>
                </FormGroup>
            )}


            <Button variant="primary" type="submit">
                {sessionId ? "Zaktualizuj sesję" : "Dodaj sesję"}
            </Button>
        </Form>
    );
};

export default GameSessionForm;