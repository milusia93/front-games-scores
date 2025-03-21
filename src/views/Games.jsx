import axios from "axios";
import config from "../config";
import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { ImageFill } from "react-bootstrap-icons";
import "./Games.css";

const Games = () => {
    const [games, setGames] = useState([]);

    const getGames = () => {
        axios
            .get(config.api.url + "/games")
            .then((res) => {
                setGames(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        getGames();
    }, []);

    return (
        <Container>
            <h1>Games</h1>
            {games.map((game) => {
                return (
                    <Card key={game._id} className="mb-2">
                        <Card.Header>{game.name}</Card.Header>
                        <Card.Body>
                            <p>Maksymalna ilość graczy: {game.numplayers}</p>
                            <p>Gatunki: {game.genres.join(', ')}</p>
                            <div className="gameIconWrapper">
                                Image:{" "}
                                {game.imageUrl ? (
                                    <img className="gameImage" src={`${config.api.url}/${game.imageUrl}`} />
                                ) : (
                                    <div
                                        className="gameImage"
                                    >
                                        <ImageFill />
                                    </div>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                );
            })}
        </Container>
    );
};
export default Games