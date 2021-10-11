import React from 'react';

function MiniDinoIcon(props) {
    return(
        <div className="mini-dino-icon">
            <img src={props.dinoimg} alt="Dinosol Profile" />
            <p>{props.dinoname}</p>
        </div>
    );
}

export default MiniDinoIcon;