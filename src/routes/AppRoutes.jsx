import { Route, Routes } from "react-router";
import Home from "../views/Home";
import Players from "../views/Players";
import AddPlayer from "../views/AddPlayer";
import SinglePayer from "../views/SinglePlayer";
import Games from "../views/Games";
import SingleGame from "../views/SingleGame";
import AddNewGameSession from "../views/AddNewGameSession";
import SingleGameSession from "../views/SingleGameSession";
import Statistics from "../views/Statistics";
import AddGame from "../views/AddGame";
import GameSessions from "../views/GameSessions";


const AppRoutes = () => {
    
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<Players />} />
            <Route path="/players/add" element={<AddPlayer />} />
            <Route path="/players/:playerId" element={<SinglePayer />} />
            <Route path="/players/update/:playerId" element={<AddPlayer />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/add" element={<AddGame />} />
            <Route path="/games/:gameId" element={<SingleGame />} />
            <Route path="/games/update/:gameId" element={<AddGame />} />
            <Route path="/gamesessions" element={<GameSessions />} />
            <Route path="/gamesessions/add" element={<AddNewGameSession />} />
            <Route path="/gamesessions/:sessionId" element={<SingleGameSession />} />
            <Route path="/gamesessions/update/:sessionId" element={<AddNewGameSession />} />
            <Route path="/statistics" element={<Statistics />} />
        </Routes>
    )
}

export default AppRoutes;