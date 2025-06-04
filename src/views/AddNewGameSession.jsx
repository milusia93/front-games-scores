import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
import GameSessionForm from "../components/GameSessionForm";
import config from "../config";

const AddNewGameSession = () => {
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
    winner: "",
  });
  const params = useParams();
  const sessionId = params.id

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
          setNewSession({
            ...response.data,
            date: response.data.date?.slice(0, 10), 
          });

          const selectedGame = games.find(
            (game) => game._id === response.data.game._id
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

  const isPastOrToday = (dateString) => {
    if (!dateString) return false;
    const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
    return dateString <= today;
  };
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name === "finished") {
  //     const isFinished = value === "true"; // konwersja na boolean
  //     setNewSession((prev) => ({
  //       ...prev,
  //       finished: isFinished,
  //       winner: isFinished ? prev.winner : null, // resetuj winner jeśli nie zakończono sesji
  //     }));
  //   } else {
  //     setNewSession({
  //       ...newSession,
  //       [name]: value,
  //     });
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "finished") {
      const isFinished = value === "true"; // konwersja string → boolean

      setNewSession((prev) => ({
        ...prev,
        finished: isFinished,
        winner: isFinished ? prev.winner : null, // jeśli sesja nie jest zakończona, usuń zwycięzcę
      }));
    } else if (name === "date") {
      const isFutureDate = !isPastOrToday(value);

      if (isFutureDate && newSession.finished === true) {
        setNewSession((prev) => ({
          ...prev,
          date: value,
          finished: false,
          winner: null, // reset, bo sesja w przyszłości nie może być zakończona
        }));
      } else {
        setNewSession((prev) => ({
          ...prev,
          date: value,
        }));
      }
    } else {
      setNewSession((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePlayerCheckboxChange = (e, player) => {
    if (e.target.checked) {
      if (newSession.players.length < newSession.numplayers) {
        setNewSession((prev) => ({
          ...prev,
          players: [...prev.players, player],
        }));
      }
    } else {
      setNewSession((prev) => ({
        ...prev,
        players: prev.players.filter(p => p._id !== player._id)
      }));
    }
  };

  const handleGameChange = (e) => {
    const selectedGameId = e.target.value;

    const selectedGame = games.find((game) => game._id === selectedGameId);
    setNewSession({
      ...newSession,
      game: selectedGameId,
      numplayers: 0,
      players: [],
    });

    if (selectedGame) {
      setMinNumPlayers(selectedGame.minnumplayers);
      setMaxNumPlayers(selectedGame.maxnumplayers);
    }
  };

  const validateForm = () => {
    let hasErrors = false;

    if (!newSession.game) {
      setErrors((prev) => ({ ...prev, game: "Wybierz grę" }));
      hasErrors = true;
    } else {
      setErrors((prev) => ({ ...prev, game: "" }));
    }

    if (
      newSession.numplayers < minnumplayers ||
      newSession.numplayers > maxnumplayers
    ) {
      setErrors((prev) => ({
        ...prev,
        numplayers: `Liczba graczy musi mieścić się w przedziale od ${minnumplayers} do ${maxnumplayers}.`,
      }));
      hasErrors = true;
    } else {
      setErrors((prev) => ({ ...prev, numplayers: "" }));
    }

    if (newSession.players.length < newSession.numplayers) {
      setErrors((prev) => ({
        ...prev,
        players: "Wybierz odpowiednią liczbę graczy.",
      }));
      hasErrors = true;
    } else {
      setErrors((prev) => ({ ...prev, players: "" }));
    }

    if (!newSession.date) {
      setErrors((prev) => ({ ...prev, date: "Wybierz datę sesji." }));
      hasErrors = true;
    } else {
      setErrors((prev) => ({ ...prev, date: "" }));
    }

    // NOWOŚĆ: jeśli sesja zakończona, ale nie ma winnera
    if (newSession.finished && !newSession.winner) {
      setErrors((prev) => ({ ...prev, winner: "Jeśli sesja jest zakończona, musisz wybrać zwycięzcę." }));
      hasErrors = true;
    } else {
      setErrors((prev) => ({ ...prev, winner: "" }));
    }

    return hasErrors;
  };

  const handleSubmit = (e) => {
    console.log(newSession)
    e.preventDefault();

    if (validateForm()) return;

    const requestMethod = sessionId ? "put" : "post";
    const requestUrl = sessionId
      ? `${config.api.url}/gamingsessions/update/${sessionId}`
      : `${config.api.url}/gamingsessions/add`;

    axios[requestMethod](requestUrl, newSession)
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
        isPastOrToday={isPastOrToday}
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