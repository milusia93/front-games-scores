import axios from "axios";
import config from "../config";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Card, CardHeader, Container, Table } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import "./SinglePlayer.css";

const SinglePlayer = () => {

    const [player, setPlayer] = useState(null);
    const [playerTitles, setPlayerTitles] = useState(null);
    const { playerId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(config.api.url + `/players/${playerId}`)
            .then((res) => {
                setPlayer(res.data);
                console.log("dane", res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [playerId]);

    useEffect(() => {
        axios
            .get(config.api.url + "/statistics/current_champion_title_counter")
            .then((res) => {
                const found = res.data.find((p) => p.playerId === playerId);
                setPlayerTitles(found || { championTitles: 0 });
                console.log("playerTitles", found);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [playerId]);

    const deletePlayer = (playerId) => {
        if (player.gamesPlayed && player.gamesPlayed.length > 0) {
            alert("Nie można usunąć gracza, ponieważ brał udział w rozgrywkach.");
            return;
        }

        if (window.confirm("Usunąć gracza?")) {
            axios
                .delete(config.api.url + "/players/delete/" + playerId, { mode: "cors" })
                .then(() => {
                    navigate("/players");
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    if (!player || !player.gamesPlayed) return <h2>Loading...</h2>;

    return (
        <Container>
            <h1>Player</h1>
            <Card key={player._id} className="mb-2">
                <Card.Header>Informacje o graczu {player.name}</Card.Header>
                <Card.Body>
                    <div className="avatarAndInfoWrapper">
                        <div className="singlePlayerIconWrapper">
                            {player.avatarUrl ? (
                                <img className="playerCardAvatarIcon" src={`${config.api.url}/${player.avatarUrl}`} />
                            ) : (
                                <div
                                    className="personAvatarIcon"
                                    style={{ backgroundColor: player.color }}
                                >
                                    <PersonFill />
                                </div>
                            )}
                        </div>
                        <div className="playerInfoWrapper">
                            <p>Nazwa użytkownika: {player.name}</p>
                            <p>Email: {player.email}</p>
                            <p>Kolor: {player.color}</p>
                            {playerTitles && (
                                <p>Aktualne tytuły mistrza: {playerTitles.championTitles}</p>
                            )}
                            <p></p>
                        </div>

                    </div>
                    <Link className="btn btn-primary" to={`/players/update/${player._id}`}>Edytuj</Link>
                    <Button onClick={() => { deletePlayer(player._id) }}>Usuń Gracza</Button>
                </Card.Body>
            </Card>
            <Card>
                <CardHeader>Games played</CardHeader>
                <Card.Body>
                    {player.gamesPlayed.length === 0 ? (
                        <p>Brak rozegranych gier.</p>
                    ) : (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Nazwa gry</th>
                                    <th>Wynik</th>
                                </tr>
                            </thead>
                            <tbody>
                                {player.gamesPlayed.map((game, index) => {
                                    const session = game.sessionId;
                                    const gameName = session?.game?.name || "Nieznana gra";
                                    const date = session?.date ? new Date(session.date).toLocaleDateString() : "Brak daty";
                                    const result = game.isWinner ? "Zwycięstwo" : "Przegrana";

                                    return (
                                        <tr key={session?._id || index}>
                                            <td>{date}</td>
                                            <td>{gameName}</td>
                                            <td>{result}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>
        </Container>

    )
}
export default SinglePlayer