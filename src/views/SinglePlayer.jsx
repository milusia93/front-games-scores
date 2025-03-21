import axios from "axios";
import config from "../config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import "./SinglePlayer.css";

const SinglePlayer = () => {

    const [player, setPlayer] = useState(null)
    const params = useParams();
    const id = params.id

    const getSinglePlayer = () => {
        axios
            .get(config.api.url + `/players/${id}`)
            .then((res) => {
                setPlayer(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    useEffect(() => {
        getSinglePlayer();

    }, [id])

    return (
        <div>
            <Container>
                <h1>Player</h1>
                <Card key={player._id} className="mb-2">
                    <Card.Header>{player.name}</Card.Header>
                    <Card.Body>
                        <p>Email: {player.email}</p>
                        <div className="playerIconWrapper">
                            Avatar:{" "}
                            {player.avatarUrl ? (
                                <img className="personAvatarIcon" src={`${config.api.url}/${player.avatarUrl}`} />
                            ) : (
                                <div
                                    className="personAvatarIcon"
                                    style={{ backgroundColor: player.color }}
                                >
                                    <PersonFill />
                                </div>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}
export default SinglePlayer