import React from 'react';

function DinoCard(props) {

    return(
        <div className="dino-card-container">
            <img src={props.dino.dinosolImage} alt="dino-card" />
            <h3>{props.dino.dinosolName}</h3>
        </div>
    );
}

export default DinoCard;