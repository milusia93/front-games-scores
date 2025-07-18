import { useEffect, useState } from "react"
import config from "../config"
import axios from "axios"
import { Table } from "react-bootstrap"
import { PersonFill } from "react-bootstrap-icons"
import "./Home.css"
import { useNavigate } from "react-router"

const Home = () => {

    const [championsStats, setChampionStats] = useState([])

    const getChampionTitles = () => {
        axios
            .get(config.api.url + "/statistics/current_champion_title_counter")
            .then((res) => {
                setChampionStats(res.data)
                console.log("championstats",res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        getChampionTitles();
    }, []);

    const navigate = useNavigate();

  return (
    <div className="container">
      {championsStats.length >= 3 && (
        <div className="podium-container">
          <div className="podium-place-holder second pointer" onClick={() => navigate(`/players/${championsStats[1].playerId}`)}>
            <div className="podium-place">
              {championsStats[1].avatarUrl ? (
                <img
                  className="podium-personAvatarIcon"
                  src={`${config.api.url}/${championsStats[1].avatarUrl}`}
                />
              ) : (
                <div
                  className="placeholderPodium personAvatarIcon"
                  style={{ backgroundColor: championsStats[1].color }}
                >
                  <PersonFill />
                </div>
              )}
              <div className="podium-number silver">2</div>
            </div>
            <p>{championsStats[1].name}</p>
          </div>

          <div className="podium-place-holder  first pointer" onClick={() => navigate(`/players/${championsStats[0].playerId}`)}>
            <div className="podium-place">
              {championsStats[0].avatarUrl ? (
                <img
                  className="podium-personAvatarIcon"
                  src={`${config.api.url}/${championsStats[0].avatarUrl}`}
                />
              ) : (
                <div
                  className="placeholderPodium personAvatarIcon"
                  style={{ backgroundColor: championsStats[0].color }}
                >
                  <PersonFill />
                </div>
              )}
              <div className="podium-number gold">1</div>
            </div>
            <p>{championsStats[0].name}</p>
          </div>
          <div className="podium-place-holder  third pointer" onClick={() => navigate(`/players/${championsStats[2].playerId}`)}>
            <div className="podium-place">
              {championsStats[2].avatarUrl ? (
                <img
                  className="podium-personAvatarIcon"
                  src={`${config.api.url}/${championsStats[2].avatarUrl}`}
                />
              ) : (
                <div
                  className="placeholderPodium personAvatarIcon"
                  style={{ backgroundColor: championsStats[2].color }}
                >
                  <PersonFill />
                </div>
              )}
              <div className="podium-number bronze">3</div>
            </div>
            <p>{championsStats[2].name}</p>
          </div>
        </div>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Gracz</th>
            <th>Aktualne tytuły mistrza</th>
            <th>Wszystkie zwycięstwa</th>
            <th>Liczba rozegranych gier</th>
          </tr>
        </thead>
        <tbody>
          {championsStats.map((player, index) => (
            <tr className="pointer" key={player.playerId} onClick={() => navigate(`/players/${player.playerId}`)}>
              <td>{index + 1}</td>
              <td className="playerAvatarAndNameWrapper"> <div className="personAvatarListWrapper">
                {" "}
                {player.avatarUrl ? (
                  <img
                    className="personAvatarIcon"
                    src={`${config.api.url}/${player.avatarUrl}`}
                  />
                ) : (
                  <div
                    className="personAvatarIcon"
                    style={{ backgroundColor: player.color }}
                  >
                    <PersonFill />
                  </div>
                )}
                </div>
                <div>{player.name}</div>
                
              </td>
              <td>{player.championTitles}</td>
              <td>{player.totalWins}</td>
              <td>{player.gamesCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default Home