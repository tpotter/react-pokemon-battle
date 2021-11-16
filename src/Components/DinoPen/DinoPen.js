import React, { useEffect, useState } from 'react';
import DinoRadio from '../Dinosol/DinoRadio';
import DinoFeature from './DinoFeature';


function DinoPen(props) {
    
    const [selectedDino, setSelectedDino] = useState(null);
    

    useEffect(()=> {

    }, []);


    function renderDinoList() {
        let dinoPenCollection = [];
        Object.keys(props.dinomap).forEach(dinoId => {
            dinoPenCollection.push(
                <DinoRadio dinoid={props.dinomap[dinoId].dinosolId} 
                    dinolabel={props.dinomap[dinoId].dinosolName} 
                    dinoimage={props.dinomap[dinoId].dinosolImage}  
                    groupname="dinosolRadio" 
                    updatefunction={returnDinoById} 
                    dinoval={props.dinomap[dinoId].dinosolId}
                />
                
            );
        });
        
        return dinoPenCollection;
    }

    function returnDinoById(id) {
        setSelectedDino(props.dinomap[id]);
    }

    function renderSelectedDinosol() {

        if(selectedDino !== null) {
            return (
                <DinoFeature dino={selectedDino} close={setSelectedDino} />
            );
        }
    }


    return (
        <div id="dino-pen-container" className='section-container'>
            <input className="back-button" type="button" value="Back" onClick={props.viewupdate.bind(null,0)} />
            <h1>The Dino Pen</h1>
            <div id="dino-pen-content" >
                <div id="dino-pen-flex">
                    {
                        renderDinoList()
                    }
                </div>
                <div id="dino-detail-container">
                    { renderSelectedDinosol() }
                </div>
            </div>
        </div>
    );
}


//TODO delete this
/*function returnSampleDinoList() {
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
}*/

export default DinoPen;


/*

<div className="mini-dino-icon" onClick={selectFunction.bind(null, dino)}>
                <img src={dino.image} alt="Dinosol Profile" />
                <p>{dino.name}</p>
            </div>

            */