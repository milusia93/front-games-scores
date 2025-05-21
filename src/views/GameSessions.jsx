import axios from "axios";
import config from "../config";
import { useEffect, useState } from "react";
import { Card, Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const GameSessions = () => {
    const [gameSessions, setGameSessions] = useState([]);

    useEffect(() => {
        axios
        .get(config.api.url + "/gamingsessions")
        .then((res) => {
            console.log("ODPOWIEDŹ BACKENDU:", res.data);
            setGameSessions(res.data);
        })
        .catch((err) => console.error("Błąd podczas pobierania sesji gier", err));
    }, []);

    return (
        <Container>
            <h1>Gaming Sessions</h1>
            {gameSessions.map((session) => (
                <Card key={session._id} className="mb-3">
                    <Card.Header>Nazwa gry: {session.game?.name || "Nieznana gra"}</Card.Header>
                    <Card.Body>
                        <p>Liczba graczy: {session.numplayers}</p>
                        <p>Data: {new Date(session.date).toLocaleDateString()}</p>
                        <strong>Gracze:</strong>
                        <ListGroup as="ul" className="mb-3">
                            {session.players.map((player) => (
                                <ListGroup.Item as="li" key={player._id}>
                                    {player.name}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Link className="btn btn-primary" to={`/gamesessions/${session._id}`}>
                            Szczegóły
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default GameSessions;