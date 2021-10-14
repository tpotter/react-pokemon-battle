import React from 'react';

function ExpBar(props) {

    return(
        <div className="exp-bar-container">
            <p>
                {props.level}
            </p>
            <div className="exp-bar-bar">
                <div className="exp-bar-completion-bar"></div>
            </div>
            <p>
                {(props.level + 1)}
            </p>
        </div>
    );
}

export default ExpBar;