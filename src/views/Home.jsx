import { useEffect, useState } from "react"
import config from "../config"
import axios from "axios"
import { Table } from "react-bootstrap"
import { PersonFill } from "react-bootstrap-icons"
import "./Home.css"

const Home = () => {

    const [championsStats, setChampionStats] = useState([])

    const getChampionTitles = () => {
        axios
            .get(config.api.url + "/statistics/current_champion_title_counter")
            .then((res) => {
                setChampionStats(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        getChampionTitles();
    }, []);

    return (
        <div className="container">
              {championsStats.length >= 3 && (
            <div className="podium-container">
                <div className="podium-place second"> {championsStats[0].avatarUrl ? (
                    <img className="podium-personAvatarIcon" src={`${config.api.url}/${championsStats[0].avatarUrl}`} />
                ) : (
                    <div
                        className="personAvatarIcon"
                        style={{ backgroundColor: championsStats[0].color }}
                    >
                        <PersonFill />
                    </div>
                )}
                    <div className="podium-number silver">2</div>
                </div> <p>{championsStats[0].name}</p>
                <div className="podium-place first">{championsStats[1].avatarUrl ? (
                    <img className="podium-personAvatarIcon" src={`${config.api.url}/${championsStats[1].avatarUrl}`} />
                ) : (
                    <div
                        className="personAvatarIcon"
                        style={{ backgroundColor: championsStats[1].color }}
                    >
                        <PersonFill />
                    </div>
                )}
                    <div className="podium-number gold">1</div>
                </div>
                <div className="podium-place third">{championsStats[2].avatarUrl ? (
                    <img className="podium-personAvatarIcon" src={`${config.api.url}/${championsStats[2].avatarUrl}`} />
                ) : (
                    <div
                        className="personAvatarIcon"
                        style={{ backgroundColor: championsStats[2].color }}
                    >
                        <PersonFill />
                    </div>
                )}
                    <div className="podium-number bronze">3</div>
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
                        <tr key={player.playerId}>
                            <td>{index + 1}</td>
                            <td> {player.avatarUrl ? (
                                <img className="personAvatarIcon" src={`${config.api.url}/${player.avatarUrl}`} />
                            ) : (
                                <div
                                    className="personAvatarIcon"
                                    style={{ backgroundColor: player.color }}
                                >
                                    <PersonFill />
                                </div>
                            )}
                                {player.name}</td>
                            <td>{player.championTitles}</td>
                            <td>{player.totalWins}</td>
                            <td>{player.gamesCount}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
export default Home