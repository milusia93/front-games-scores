import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
import GameSessionForm from "../components/GameSessionForm";
import config from "../config";

const AddNewGameSession = () => {
  const { sessionId } = useParams();
  const [newSession, setNewSession] = useState({
    game: "",
    numplayers: 0,
    players: [],
    date: "",
    finished: false,
    winner: null,
  });


  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);
  const [errors, setErrors] = useState({
    game: "",
    numplayers: "",
    players: "",
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
  }, [sessionId]);

  useEffect(() => {
    if (sessionId) {
      axios
        .get(config.api.url + "/gamingsessions/" + sessionId)
        .then((response) => {
          setNewSession(response.data);

          const selectedGame = games.find(
            (game) => game._id === response.data.game
          );
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

  const handlePlayerCheckboxChange = (e, playerId) => {
    if (e.target.checked) {
      if (newSession.players.length < newSession.numplayers) {
        setNewSession((prev) => ({
          ...prev,
          players: [...prev.players, playerId],
        }));
      }
    } else {
      setNewSession((prev) => ({
        ...prev,
        players: prev.players.filter((id) => id !== playerId),
      }));
    }
    console.log(newSession.players)
  };

  const handleGameChange = (e) => {
    const selectedGameId = e.target.value;

    const selectedGame = games.find((game) => game._id === selectedGameId);
    setNewSession({
      ...newSession,
      game: selectedGameId,
      numplayers: "",
    });

    if (selectedGame) {
      setMinNumPlayers(selectedGame.minnumplayers);
      setMaxNumPlayers(selectedGame.maxnumplayers);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    let hasErrors = false;
    if (!newSession.game) {
      setErrors((prev) => ({ ...prev, game: "Wybierz grę" }));
      hasErrors = true;
    } else {
      setErrors((prev) => ({ ...prev, game: "" }));
    }

    if (newSession.numplayers < minnumplayers || newSession.numplayers > maxnumplayers) {
      setErrors((prev) => ({
        ...prev,
        numplayers: `Liczba graczy musi mieścić się w przedziale od ${minnumplayers} do ${maxnumplayers}`,
      }));
      hasErrors = true;
    } else {
      setErrors((prev) => ({ ...prev, numplayers: "" }));
    }

    if (newSession.players.length < newSession.numplayers) {
      setErrors((prev) => ({ ...prev, players: "Wybierz graczy" }));
      hasErrors = true;
    } else {
      setErrors((prev) => ({ ...prev, players: "" }));
    }

    if (!newSession.date) {
      setErrors((prev) => ({ ...prev, date: "Wybierz datę sesji" }));
      hasErrors = true;
    } else {
      setErrors((prev) => ({ ...prev, date: "" }));
    }

    if (hasErrors) return;

    const requestMethod = sessionId ? "put" : "post";
    const requestUrl = sessionId
      ? `${config.api.url}/gamingsessions/${sessionId}`
      : `${config.api.url}/gamingsessions/add`;

    axios
    [requestMethod](requestUrl, newSession)
      .then((res) => {
        setMessage("");
        navigate("/gamesessions");
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
        handlePlayerCheckboxChange={handlePlayerCheckboxChange}
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