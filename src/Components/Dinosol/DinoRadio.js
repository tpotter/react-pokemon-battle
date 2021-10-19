import React from 'react';

function DinoRadio(props) {

    function handleRadioSelect(e) {
        props.updatefunction(e.target.value);
    }
    
    return (
        <div className="dino-radio-container">
            <input type="radio" id={props.dinoid} className="dino-radio-input" name={props.groupname} value={props.dinoval} onChange={handleRadioSelect} />
            <label htmlFor={props.dinoid}><img src={props.dinoimage} /> {props.dinolabel}</label>
        </div>
    );
}

export default DinoRadio;

//checked={props.ischecked }