import React from "react";
import { Form, Button, FormGroup, FormLabel, FormControl } from "react-bootstrap";

const GameSessionForm = ({
    newSession,
    games,
    players,
    errors,
    handleInputChange,
    handlePlayersChange,
    handleSubmit,
    sessionId,
    minnumplayers,
    maxnumplayers,
    handleGameChange,
}) => {
    // Tworzymy tablicę z dostępnymi opcjami liczby graczy
    const playerOptions = [];
    for (let i = minnumplayers; i <= maxnumplayers; i++) {
        playerOptions.push(i);
    }

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
                    {playerOptions.map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </FormControl>
                {errors.numplayers && <p className="warning">{errors.numplayers}</p>}
            </FormGroup>

            <FormGroup className="mb-3">
                <FormLabel>Wybierz graczy</FormLabel>
                <FormControl
                    type="text"
                    name="players"
                    value={newSession.players.join(",")}
                    onChange={handlePlayersChange}
                    placeholder="Wpisz ID graczy, oddzielone przecinkiem"
                />
            </FormGroup>

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
                        {players.map((player) => (
                            <option key={player._id} value={player._id}>
                                {player.name}
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