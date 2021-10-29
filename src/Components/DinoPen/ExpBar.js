import React from 'react';

function ExpBar(props) {

    function calculateCompletion() {
        const completion = {
            width: (((props.currexp - props.prevexp) / (props.nextexp - props.prevexp))*100)+'%'
        }

        return completion;
        
    }

    return(
        <div className="exp-bar-container">
            <p>
                {props.level}
            </p>
            <div className="exp-bar-bar">
                <div className="exp-bar-completion-bar" style={calculateCompletion()} ></div>
            </div>
            <p>
                {(props.level + 1)}
            </p>
        </div>
    );
}

export default ExpBar;