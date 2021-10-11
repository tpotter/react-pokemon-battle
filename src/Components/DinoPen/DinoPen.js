import React, { useState } from 'react';
import MiniDinoIcon from './MiniDinoIcon';

function DinoPen(props) {
    
    const [selectedDino, setSelectedDino] = useState(null);
    
    return (
        <div id="dino-pen-container">
            <input className="back-button" type="button" value="Back" onClick={props.viewupdate.bind(null,0)} />
            <h1>The Dino Pen</h1>
            <div id="dino-pen-content" className={determineIfExpandedView(selectedDino)} >
                <div id="dino-pen-flex">
                    {
                        renderDinoList(setSelectedDino)
                    }
                </div>
                <div id="dino-detail-container">

                </div>
            </div>
        </div>
    );
}

function renderDinoList(selectFunction) {
    //Sample dino data
    let myDinos = returnSampleDinoList();
    let dinoPenCollection = [];
    myDinos.forEach(dino => {
        dinoPenCollection.push(<MiniDinoIcon key={"dino-"+dino.dinoId} dinoimg={dino.image} dinoname={dino.name} onClick={selectFunction.bind(null, dino)} />);
    });

    return dinoPenCollection;
}

function determineIfExpandedView(currentlySelected) {
    if(currentlySelected !== null) {
        return "dino-detail-expanded";
    }
}

//TODO delete this
function returnSampleDinoList() {
    const dinoList = [
        {
            dinoId: "1234",
            name: "Poshasaurus",
            nickname: "Posh",
            image: "https://dinosols.app/images/Dino_dubya.png",
            level: 45,
            battleHistory: [

            ],
            experience: 5780,
            nextLevelExperience: 6000
        },
        {
            dinoId: "1235",
            name: "Blockiosaurus",
            nickname: null,
            image: "https://dinosols.app/images/Dino_dubya.png",
            level: 51,
            battleHistory: [

            ],
            experience: 8230,
            nextLevelExperience: 9000
        }
    ];

    return dinoList;
}

export default DinoPen;