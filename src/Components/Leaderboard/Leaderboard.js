import React, { useEffect, useState } from 'react';
import DinosolTable from '../Utility/DinosolTable';

function Leaderboard(props) {

    const [leaders, setLeaders] = useState([]);
    
    useEffect(() => {
        setLeaders(generateDemoDataList());
    },[]);
    
    return (
        <div id="leaderboard-container" className='section-container'>
            <input className="back-button" type="button" value="Back" onClick={props.viewupdate.bind(null,0)} />
            <h1>LeaderBoard</h1>
            <div id="leader-table-container">
                <DinosolTable rowdata={leaders} colconfig={createColumnConfigs()} />
            </div>
            
        </div>
    );
}


function createColumnConfigs() {
    const colConfig = [
        {columnName: "Dinosol", fieldName: "dinosol"},
        {columnName: "Species", fieldName: "species"},
        {columnName: "Level", fieldName: "level"},
        {columnName: "Wins", fieldName: "wins"},
        {columnName: "Losses", fieldName: "losses"}
    ]

    return colConfig;

}

function generateDemoDataList() {
    const leaderList = [
        {
            dinosol: "Dinosol 1234",
            species: "Raptor",
            level: 45,
            wins: 125,
            losses: 45
        },
        {
            dinosol: "Dinosol 1234",
            species: "Raptor",
            level: 45,
            wins: 125,
            losses: 45
        },
        {
            dinosol: "Dinosol 1234",
            species: "Raptor",
            level: 45,
            wins: 125,
            losses: 45
        },
        {
            dinosol: "Dinosol 1234",
            species: "Raptor",
            level: 45,
            wins: 125,
            losses: 45
        },
        {
            dinosol: "Dinosol 1234",
            species: "Raptor",
            level: 45,
            wins: 125,
            losses: 45
        },
        {
            dinosol: "Dinosol 1234",
            species: "Raptor",
            level: 45,
            wins: 125,
            losses: 45
        },
        {
            dinosol: "Dinosol 1234",
            species: "Raptor",
            level: 45,
            wins: 125,
            losses: 45
        },
        {
            dinosol: "Dinosol 1234",
            species: "Raptor",
            level: 45,
            wins: 125,
            losses: 45
        },
        {
            dinosol: "Dinosol 1234",
            species: "Raptor",
            level: 45,
            wins: 125,
            losses: 45
        },
        {
            dinosol: "Dinosol 1234",
            species: "Raptor",
            level: 45,
            wins: 125,
            losses: 45
        },
        {
            dinosol: "Dinosol 1234",
            species: "Raptor",
            level: 45,
            wins: 125,
            losses: 45
        },
        {
            dinosol: "Dinosol 1234",
            species: "Raptor",
            level: 45,
            wins: 125,
            losses: 45
        },
        {
            dinosol: "Dinosol 1234",
            species: "Raptor",
            level: 45,
            wins: 125,
            losses: 45
        },
        {
            dinosol: "Dinosol 1234",
            species: "Raptor",
            level: 45,
            wins: 125,
            losses: 45
        },
        {
            dinosol: "Dinosol 1234",
            species: "Raptor",
            level: 45,
            wins: 125,
            losses: 45
        }
    ];

    return leaderList;
}

export default Leaderboard;