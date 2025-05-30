import axios from "axios";
import config from "../config";
import WinnerModal from "../components/WinnerModal";
import "./GameSessions.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { PersonFill } from "react-bootstrap-icons";
import "./SingleGameSession.css"

const SingleGameSession = () => {
    const [gameSession, setGameSession] = useState(null)
    const [showWinnerModal, setShowWinnerModal] = useState(false);
    // const [loading, setLoading] = useState(false);
    const params = useParams();
    const id = params.id
    const navigate = useNavigate();

    const handleSaveWinner = (winnerId) => {
        axios.put(`${config.api.url}/gamingsessions/update/${id}`, {
            winner: winnerId,
            finished: true,
        })
            .then(res => {
                setGameSession(res.data);
                setShowWinnerModal(false);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {

        const getSingleGameSession = () => {
            // setLoading(true)
            axios
                .get(config.api.url + `/gamingsessions/${id}`)
                .then((res) => {
                    setGameSession(res.data)
                })
                .catch((err) => {
                    console.error(err);
                });
            // setLoading(false)
        }

        getSingleGameSession()

    }, [id])


    console.log(gameSession)
    if (!gameSession) {
        return <h2>Loading...</h2>
    }

    return (
        <Container className="sessions-container">

            <h1>Gaming Session</h1>


            {/* {loading ? <p>Ładowanie...</p> : */}
            <Card key={gameSession._id} className={gameSession.finished ? "mb-3 bg-success" : "mb-3 bg-danger"}>
                <Card.Header>Nazwa gry: {gameSession.game?.name || "Nieznana gra"}</Card.Header>
                <Card.Body>
                    <p>Liczba graczy: {gameSession.numplayers}</p>
                    <p>Data: {new Date(gameSession.date).toLocaleDateString()}</p>
                    <strong>Gracze:</strong>
                    <ListGroup as="ul" className="mb-3">
                        {gameSession.players.map((player) => (
                            <ListGroup.Item as="li" key={player._id} className="">
                                {player.avatarUrl ? (
                                    <img className="personAvatarIcon" src={`${config.api.url}/${player.avatarUrl}`} />
                                ) : (
                                    <div
                                        className="personAvatarIcon"
                                        style={{ backgroundColor: player.color }}
                                    >
                                        <PersonFill />
                                    </div>
                                )}{" "}{player.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <p>Status sesji: {gameSession.finished ? "Zakończona" : "W trakcie"}</p>

                    {gameSession.winner && (
                        <div className="winner-info">
                            <span>Zwycięzca: </span>
                            {gameSession.winner.avatarUrl ? (
                                <img className="personAvatarIcon" src={`${config.api.url}/${gameSession.winner.avatarUrl}`} />
                            ) : (
                                <div
                                    className="personAvatarIcon"
                                    style={{ backgroundColor: gameSession.winner.color }}
                                >
                                    <PersonFill />
                                </div>
                            )}
                            {" "}{gameSession.winner.name}
                        </div>
                    )}
                       {gameSession.winner ? (
                <Button className="btn" onClick={() => setShowWinnerModal(true)}>Zmień zwycięzcę</Button>
            ) : (
                <Button onClick={() => setShowWinnerModal(true)}>Wybierz zwycięzcę</Button>
            )}  
              <Link className="btn btn-primary" to={`/gamesessions/update/${gameSession._id}`}>
                        Edytuj
                    </Link>                  
                </Card.Body>
            </Card>
            {/* } */}
         

            <WinnerModal
                show={showWinnerModal}
                onHide={() => setShowWinnerModal(false)}
                players={gameSession.players}
                initialWinnerId={gameSession.winner?._id}
                onSave={handleSaveWinner}
            />

        </Container>
    );
};

export default SingleGameSession