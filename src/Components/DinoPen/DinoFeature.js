import React from 'react';
import ExpBar from './ExpBar';

function DinoFeature(props) {

    return (
        <div className="dino-feature-container">
            <p className="close-icon" onClick={props.close.bind(null, null)}>Close</p>
            <h3>{props.dino.name}</h3>
            <div className="img-history-flex">
                <img className="dino-feature-image" src={props.dino.image} />
                <div className="history-container">
                    <h4>Battle History</h4>

                </div>
            </div>
            <ExpBar level={props.dino.level} currexp={props.dino.experience} nextexp={props.dino.nextLevelExperience} />
            
        </div>
    );
}

export default DinoFeature;

//<p>{props.dino.level}</p>
//<p>{props.dino.dinoId}</p>
