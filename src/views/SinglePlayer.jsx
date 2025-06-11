import axios from "axios";
import config from "../config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import "./SinglePlayer.css";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const SinglePlayer = () => {

    const [player, setPlayer] = useState(null)
    const { playerId } = useParams()
    const navigate = useNavigate();


    useEffect(() => {
        const getSinglePlayer = () => {
            axios
                .get(config.api.url + `/players/${playerId}`)
                .then((res) => {
                    setPlayer(res.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        getSinglePlayer();

    }, [playerId])
    
    if(!player) {
        return <h2>Loading...</h2>
    }

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
                        <Link className="btn btn-primary" to={`/players/update/${player._id}`}>Edytuj</Link>
                        <Button onClick={()=>{deletePlayer(player._id)}}>Usuń Gracza</Button>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}
export default SinglePlayer