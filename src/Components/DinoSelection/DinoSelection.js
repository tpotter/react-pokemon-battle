import React, { useState } from 'react';
import DinoRadio from '../Dinosol/DinoRadio';
import DinoNotSelected from '../../Resources/img/dino-not-selected.jpg';


function DinoSelection(props) {

    return(
        <div className="dino-selection">
            <div id="selected-dino-display" style={renderSelectedDinosolImage(props.currentdino, props.dinomap)} >
                
            </div>
            <div id="dino-selection-panel" className='section-container'>
                <input className="back-button" type="button" value="Back" onClick={props.viewupdate.bind(null,0)} />
                <h1 className="selection-header">Choose Your Dinosol!</h1>
                <div className="dino-flex">
                    { renderDinoList(props.dinomap, props.currentupdater) }
                </div>
                <div className="selection-button-container">
                    <input type="button" className="continue-button" value="Continue >" onClick={proceedToOpponentGeneration.bind(null, props.currentdino, props.viewupdate)} />
                </div>
            </div>
        </div>
    );
}

function renderDinoList(dinoMap, dinoUpdater) {
    let dinoRadioJsx = [];
    Object.keys(dinoMap).forEach(dinoId => {
        dinoRadioJsx.push(
            <DinoRadio dinoid={dinoMap[dinoId].dinosolId} 
                dinolabel={dinoMap[dinoId].dinosolName} 
                dinoimage={dinoMap[dinoId].dinosolImage}  
                groupname="dinosolRadio" 
                updatefunction={dinoUpdater} 
                dinoval={dinoMap[dinoId].dinosolId} />
        );
    });

    return dinoRadioJsx;
}

function proceedToOpponentGeneration(selectedDino, updateFunction) {
    if(selectedDino !== null) {
        updateFunction(5);
    } else {
        console.log("No Dino Selected!");
    }
}

function renderSelectedDinosolImage(selectedDino, dinoMap) {
    const imgToDisplay = (selectedDino !== null) ? dinoMap[selectedDino].dinosolImage : DinoNotSelected;
    
    const backgroundStyle = {
        backgroundImage: `url(${imgToDisplay})`
    };
    
    return backgroundStyle;
}


export default DinoSelection;

/*
 <DinoRadio dinoid="poshasaur" dinolabel={"Poshasaurus Rex"}  ischecked={poshasaurChecked} updatefunction={setPoshasaurChecked} groupname="dinosolSelect" />
                    <DinoRadio dinoid="poshasaur2" dinolabel={"Poshasaurus Rex"}  ischecked={false} updatefunction={setPoshasaurChecked} groupname="dinosolSelect" />
                    <DinoRadio dinoid="poshasaur3" dinolabel={"Poshasaurus Rex"}  ischecked={false} updatefunction={setPoshasaurChecked} groupname="dinosolSelect" />
                    <DinoRadio dinoid="poshasaur4" dinolabel={"Poshasaurus Rex"}  ischecked={false} updatefunction={setPoshasaurChecked} groupname="dinosolSelect" />
                    <DinoRadio dinoid="poshasaur5" dinolabel={"Poshasaurus Rex"}  ischecked={false} updatefunction={setPoshasaurChecked} groupname="dinosolSelect" />
                    <DinoRadio dinoid="poshasaur6" dinolabel={"Poshasaurus Rex"}  ischecked={false} updatefunction={setPoshasaurChecked} groupname="dinosolSelect" />

                    */