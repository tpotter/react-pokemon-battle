import React from 'react';

function Leaderboard(props) {
    return (
        <div id="dino-pen-container">
            <div>
                <input className="back-button" type="button" value="Back" onClick={props.viewupdate.bind(null,0)} />
            </div>

            Leaderboard!
        </div>
    );
}

export default Leaderboard;