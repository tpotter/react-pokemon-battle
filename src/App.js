import React, { useState } from "react";
import "./animate.css";
import "./bootstrap.css";
import "./App.scss";
import Home from "./Components/Home/Home";
import DinoPen from "./Components/DinoPen/DinoPen";
import Leaderboard from "./Components/Leaderboard/Leaderboard";


function App() {
    
    const [currentView, setCurrentView] = useState(0);

    return (
        <div id="app-container">
            {
                renderCurrentView(currentView, setCurrentView)
            }
        </div>
    );
}

function renderCurrentView(currView, viewUpdater) {
    let viewJsx = null;
    
    switch (currView) {
        case 0: //Home page
            viewJsx = (
                <Home viewupdate={viewUpdater} />
            );
            break;
        case 1: //Battle Setup
            viewJsx = (
                <div>
                    Battle Setup!
                </div>
            );
            break;
        case 2: //Battle
            break;
        case 3: //Leaderboards
            viewJsx = (
                <Leaderboard viewupdate={viewUpdater} />
            );
            break;
        case 4: //View Dinosols
            viewJsx = (
                <DinoPen viewupdate={viewUpdater} />
            );    
            break;
        case 5: //Buy Dinosols
            break;
        default:
            break;
    } 

    return viewJsx;
}


export default App;