import React, { useState } from 'react';
import DinoRadio from '../Dinosol/DinoRadio';
import DinoNotSelected from '../../Resources/img/dino-not-selected.jpg';


function DinoSelection(props) {

    function renderDinoList() {
        let dinoRadioJsx = [];
        Object.keys(props.dinomap).forEach(dinoId => {
            dinoRadioJsx.push(
                <DinoRadio dinoid={props.dinomap[dinoId].dinosolId} 
                    dinolabel={props.dinomap[dinoId].dinosolName} 
                    dinoimage={props.dinomap[dinoId].dinosolImage}  
                    groupname="dinosolRadio" 
                    updatefunction={handleDinoUpdate} 
                    dinoval={props.dinomap[dinoId].dinosolId} />
            );
        });
    
        return dinoRadioJsx;
    }
    
    function handleDinoUpdate(dinoId) {
        props.currentupdater(props.dinomap[dinoId]);
    }
    
    function proceedToOpponentGeneration() {
        if(props.currentdino !== null) {
            props.viewupdate(5);
        } else {
            console.log("No Dino Selected!");
        }
    }
    
    function renderSelectedDinosolImage() {
        const imgToDisplay = (props.currentdino !== null) ? props.currentdino.dinosolImage : DinoNotSelected;
        const backgroundStyle = {
            backgroundImage: `url(${imgToDisplay})`
        };
        
        return backgroundStyle;
    }



    return(
        <div className="dino-selection">
            <div id="selected-dino-display" style={renderSelectedDinosolImage()} >
                
            </div>
            <div id="dino-selection-panel" className='section-container'>
                <input className="back-button" type="button" value="Back" onClick={props.viewupdate.bind(null,0)} />
                <h1 className="selection-header">Choose Your Dinosol!</h1>
                <div className="dino-flex">
                    { renderDinoList() }
                </div>
                <div className="selection-button-container">
                    <input type="button" className="continue-button" value="Continue >" onClick={proceedToOpponentGeneration} />
                </div>
            </div>
        </div>
    );
}




export default DinoSelection;