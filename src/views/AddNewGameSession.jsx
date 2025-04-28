import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
import GameSessionForm from "../components/GameSessionForm";
import config from "../config";

const AddNewGameSession = () => {
    const { sessionId } = useParams(); // Pobieranie ID sesji z URL, jeśli edytujemy istniejącą sesję
    const [newSession, setNewSession] = useState({
        game: "",
        numplayers: 0,
        players: [],
        date: "",
        finished: false,
        winner: "",
    });

    const [games, setGames] = useState([]);
    const [players, setPlayers] = useState([]);
    const [errors, setErrors] = useState({
        game: "",
        numplayers: "",
        date: "",
    });

    const [message, setMessage] = useState("");
    const [minnumplayers, setMinNumPlayers] = useState(0);
    const [maxnumplayers, setMaxNumPlayers] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {

        axios
            .get(config.api.url + "/games")
            .then((response) => setGames(response.data))
            .catch((err) => console.error("Błąd podczas pobierania gier", err));


        axios
            .get(config.api.url + "/players")
            .then((response) => setPlayers(response.data))
            .catch((err) => console.error("Błąd podczas pobierania graczy", err));


        if (sessionId) {
            axios
                .get(config.api.url + "/gamingsession/" + sessionId)
                .then((response) => {
                    setNewSession(response.data);
  
                    const selectedGame = games.find(game => game._id === response.data.game);
                    if (selectedGame) {
                        setMinNumPlayers(selectedGame.minnumplayers);
                        setMaxNumPlayers(selectedGame.maxnumplayers);
                    }
                })
                .catch((err) => {
                    console.error("Błąd podczas pobierania sesji", err);
                    setMessage("Nie udało się pobrać danych sesji.");
                });
        }
    }, [sessionId, games]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSession({
            ...newSession,
            [name]: value,
        });
    };

    const handlePlayersChange = (e) => {
        const { value } = e.target;
        setNewSession({
            ...newSession,
            players: value ? value.split(",") : [],
        });
    };

    const handleGameChange = (e) => {
        const selectedGameId = e.target.value;
        setNewSession({
            ...newSession,
            game: selectedGameId,
        });

        const selectedGame = games.find((game) => game._id === selectedGameId);
        if (selectedGame) {
            setMinNumPlayers(selectedGame.minnumplayers);
            setMaxNumPlayers(selectedGame.maxnumplayers);
            setNewSession({
                ...newSession,
                numplayers: selectedGame.minnumplayers, 
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        let hasErrors = false;
        if (!newSession.game) {
            setErrors((prev) => ({ ...prev, game: "Wybierz grę" }));
            hasErrors = true;
        }
        if (newSession.numplayers < minnumplayers || newSession.numplayers > maxnumplayers) {
            setErrors((prev) => ({
                ...prev,
                numplayers: `Liczba graczy musi mieścić się w przedziale od ${minnumplayers} do ${maxnumplayers}`,
            }));
            hasErrors = true;
        }
        if (!newSession.date) {
            setErrors((prev) => ({ ...prev, date: "Wybierz datę sesji" }));
            hasErrors = true;
        }

        if (hasErrors) return;

        const requestMethod = sessionId ? "put" : "post";
        const requestUrl = sessionId
            ? `${config.api.url}/gamingsession/${sessionId}`
            : `${config.api.url}/gamingsession/add`; 

        axios
            [requestMethod](requestUrl, newSession)
            .then((res) => {
                setMessage("");
                navigate("/sessions");
            })
            .catch((err) => {
                console.error("Błąd podczas zapisywania sesji:", err);
                setMessage("Wystąpił błąd podczas zapisywania sesji gry.");
            });
    };

    return (
        <Container>
            {message && message.length > 0 && <Alert variant="danger">{message}</Alert>}

            <GameSessionForm
                newSession={newSession}
                games={games}
                players={players}
                errors={errors}
                handleInputChange={handleInputChange}
                handlePlayersChange={handlePlayersChange}
                handleSubmit={handleSubmit}
                sessionId={sessionId}
                minnumplayers={minnumplayers}  
                maxnumplayers={maxnumplayers} 
                handleGameChange={handleGameChange} 
            />
        </Container>
    );
};

export default AddNewGameSession;