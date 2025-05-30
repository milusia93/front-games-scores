import axios from "axios";
import config from "../config";
import "./GameSessions.css"
import { useEffect, useState } from "react";
import { Card, Container, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PersonFill } from "react-bootstrap-icons";

const GameSessions = () => {
    const [gameSessions, setGameSessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [limit, setLimit] = useState(0);
    const [sortState, setSortState] = useState("descending");
    const [sortCategory, setSortCategory] = useState("date");
    const [statusFilter, setStatusFilter] = useState("all");
    const [gameFilter, setGameFilter] = useState("all");
    const [gameList, setGameList] = useState([]);

    useEffect(() => {
        axios
            .get(`${config.api.url}/games`)
            .then((res) => setGameList(res.data))
            .catch((err) => console.error("Błąd podczas pobierania listy gier", err));
    }, []);

    const getGameSessions = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${config.api.url}/gamingsessions`, {
                params: {
                    page,
                    direction: sortState,
                    category: sortCategory,
                    status: statusFilter !== "all" ? statusFilter : undefined,
                    gameId: gameFilter !== "all" ? gameFilter : undefined,
                },
            });
            setGameSessions(res.data.data);
            setPageCount(res.data.pages);
            setLimit(res.data.limit);
        } catch (err) {
            console.error("Błąd podczas pobierania sesji gier", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        getGameSessions();
    }, [page, sortState, sortCategory, statusFilter, gameFilter]);

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < pageCount) setPage(page + 1);
    };

    const paginate = (pageNumber) => setPage(pageNumber);


    return (
        <Container className="sessions-container">

            <h1>Gaming Sessions</h1>
            <select
                defaultValue="descending,date"
                onChange={(e) => {
                    const [direction, category] = e.target.value.split(",");
                    setSortState(direction);
                    setSortCategory(category);
                    setPage(1); 
                }}
            >
                <option value="descending,date">Data malejąco</option>
                <option value="ascending,date">Data rosnąco</option>
                <option value="ascending,numplayers">Liczba graczy rosnąco</option>
                <option value="descending,numplayers">Liczba graczy malejąco</option>
                <option value="ascending,game.name">Gra A-Z</option>
                <option value="descending,game.name">Gra Z-A</option>
            </select>
            <select
                defaultValue="all"
                onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                }}
                style={{ marginLeft: "10px" }}
            >
                <option value="all">Wszystkie sesje</option>
                <option value="finished">Tylko zakończone</option>
                <option value="ongoing">Tylko w trakcie</option>
            </select>
            <select
                defaultValue="all"
                onChange={(e) => {
                    setGameFilter(e.target.value);
                    setPage(1);
                }}
                style={{ marginLeft: "10px" }}
            >
                <option value="all">Wszystkie gry</option>
                {gameList.map((game) => (
                    <option key={game._id} value={game._id}>
                        {game.name}
                    </option>
                ))}
            </select>

            {loading ? <p>Ładowanie...</p> : gameSessions.map((session) => (
                <Card key={session._id} className={session.finished ? "mb-3 bg-success" : "mb-3 bg-danger"}>
                    <Card.Header>Nazwa gry: {session.game?.name || "Nieznana gra"}</Card.Header>
                    <Card.Body>
                        <p>Liczba graczy: {session.numplayers}</p>
                        <p>Data: {new Date(session.date).toLocaleDateString()}</p>
                        <strong>Gracze:</strong>
                        <ListGroup as="ul" className="mb-3">
                            {session.players.map((player) => (
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
                        <p>Status sesji: {session.finished ? "Zakończona" : "W trakcie"}</p>
                        {session.winner && (
                            <p>Zwycięzca: {session.winner.avatarUrl ? (
                                <img className="personAvatarIcon" src={`${config.api.url}/${session.winner.avatarUrl}`} />
                            ) : (
                                <div
                                    className="personAvatarIcon"
                                    style={{ backgroundColor: session.winner.color }}
                                >
                                    <PersonFill />
                                </div>
                            )}{" "}{session.winner.name}</p>
                        )}
                        <Link className="btn btn-primary" to={`/gamesessions/${session._id}`}>
                            Szczegóły
                        </Link>
                    </Card.Body>
                </Card>
            ))}
            <div className="d-flex justify-content-between mt-4 pagination-fixed">
                <Button onClick={handlePrevious} disabled={page === 1}>Poprzednia</Button>
                {/* <span>Strona {page} z {pageCount}</span> */}
                <div className="mt-3 d-flex justify-content-center gap-2">
                    {[...Array(pageCount)].map((_, i) => (
                        <Button
                            key={i}
                            variant={i + 1 === page ? "primary" : "outline-primary"}
                            onClick={() => paginate(i + 1)}
                        >
                            {i + 1}
                        </Button>
                    ))}
                </div>
                <Button onClick={handleNext} disabled={page === pageCount}>Następna</Button>
            </div>
        </Container>
    );
};

export default GameSessions;