import { useEffect, useState } from "react"
import config from "../config"
import axios from "axios"
import { Table } from "react-bootstrap"
import { PersonFill } from "react-bootstrap-icons"

const Home = () => {

    const [championsStats, setChampionStats] = useState([])

    const getChampionTitles = () => {
        axios
            .get(config.api.url + "/statistics/current_champion_title_counter")
            .then((res) => {
                setChampionStats(res.data)
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