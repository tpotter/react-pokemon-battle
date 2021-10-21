import React, { useEffect, useState } from "react";
import "./animate.css";
import "./bootstrap.css";
import "./App.scss";
import Home from "./Components/Home/Home";
import DinoPen from "./Components/DinoPen/DinoPen";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import DinoSelection from "./Components/DinoSelection/DinoSelection";
import PlayerConfig from "./Resources/player-config.json";
import OpponentGeneration from "./Components/OpponentGeneration/OpponentGeneration";
import BattleInterface from "./Components/BattleInterface/BattleInterface";


function App() {
    
    const [currentView, setCurrentView] = useState(0);
    const [playerDinosol, setPlayerDinosol] = useState(null);
    const [playerDinosolMap, setPlayerDinosolMap] = useState([]);
    const [opponentDinosol, setOpponentDinosol] = useState(null);

    useEffect(() => {
        let dinoMap = PlayerConfig.playerDinosols.reduce(function(map, dino) {
            map[dino.dinosolId] = dino;
            return map;
        }, {});

        setPlayerDinosolMap(dinoMap);
    }, []);

    return (
        <div id="app-container">
            {
                renderCurrentView(currentView, setCurrentView, playerDinosol, playerDinosolMap, setPlayerDinosol, opponentDinosol, setOpponentDinosol)
            }
        </div>
    );
}

function renderCurrentView(currView, 
    viewUpdater, 
    playerDinosol, 
    playerDinosolMap,
    playerDinosolUpdater,
    opponentDinosol,
    opponentDinosolUpdater ) {
    let viewJsx = null;
    
    switch (currView) {
        case 0: //Home page
            viewJsx = (
                <Home viewupdate={viewUpdater} />
            );
            break;
        case 1: //Battle Setup
            viewJsx = (
                <DinoSelection dinomap={playerDinosolMap} 
                    currentdino={playerDinosol}
                    currentupdater={playerDinosolUpdater}
                    viewupdate={viewUpdater} />
            );
            break;
        case 2: //Battle
            viewJsx = (
                <BattleInterface />
            );
            break;
        case 3: //Leaderboards
            viewJsx = (
                <Leaderboard viewupdate={viewUpdater} />
            );
            break;
        case 4: //View Dinosols
            viewJsx = (
                <DinoPen viewupdate={viewUpdater} dinomap={playerDinosolMap} />
            );    
            break;
        case 5: //Select Opponent
            viewJsx = (
                <OpponentGeneration playerdino={playerDinosol} 
                    opponentdino={opponentDinosol} 
                    opponentupdater={opponentDinosolUpdater} 
                    viewupdate={viewUpdater}    
                />
            );
            break;
        case 6: //Buy Dinosols
            break;
        default:
            break;
    } 

    return viewJsx;
}


export default App;