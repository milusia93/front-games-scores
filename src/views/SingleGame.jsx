import axios from "axios";
import config from "../config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import { Image } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./SingleGame.css";

const SingleGame = () => {
    const [game, setGame] = useState(null);
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    // Fetch the game data
    const getSingleGame = () => {
        axios
            .get(config.api.url + `/games/${id}`)
            .then((res) => {
                setGame(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        getSingleGame();
    }, [id]);

    if (!game) {
        return <h2>Loading...</h2>;
    }

    const deleteGame = (gameId) => {
        if (window.confirm("Usunąć grę?")) {
            axios
                .delete(config.api.url + "/games/delete/" + gameId, { mode: "cors" })
                .then(() => {
                    navigate("/games");
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    return (
        <div>
            <Container>
                <h1>Gra</h1>
                <Card key={game._id} className="mb-2">
                    <Card.Header>{game.name}</Card.Header>
                    <Card.Body>
                        <p>Liczba graczy: {game.numplayers}</p>
                        <p>Gatunki: {game.genres.join(", ")}</p>
                        <div className="gameIconWrapper">
                            Obrazek:{" "}
                            {game.imageUrl ? (
                                <img
                                    className="gameAvatarIcon"
                                    src={`${config.api.url}/${game.imageUrl}`}
                                    alt="Game Avatar"
                                />
                            ) : (
                                <div
                                    className="gameAvatarIcon"
                                    style={{ backgroundColor: "#cccccc" }}
                                >
                                    <Image />
                                </div>
                            )}
                        </div>
                        <Link className="btn btn-primary" to={`/games/update/${game._id}`}>
                            Edytuj
                        </Link>
                        <Button onClick={() => deleteGame(game._id)}>Usuń Grę</Button>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default SingleGame;
