import axios from "axios";
import config from "../config";
import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import "./Players.css";
import { Link } from "react-router";

const Players = () => {
  const [players, setPlayers] = useState([]);

  const getPlayers = () => {
    axios
      .get(config.api.url + "/players")
      .then((res) => {
        setPlayers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <Container>
      <h1>Players</h1>
      {players.map((player) => {
        return (
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
              <Link className="btn btn-primary" to={`/players/${player._id}`}>Szczegóły</Link>
            </Card.Body>
          </Card>
        );
      })}
    </Container>
  );
};
export default Players;
