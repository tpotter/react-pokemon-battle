import React, { useState, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';

function JoinBattle(props) {
    let battleAccount;

    function renderView() {
        let viewJsx = null;

        viewJsx = <h1>Test</h1>;

        return viewJsx;
    }

    function handleChange(event)
    {
        battleAccount = event.target.value;
    }

    function handleSubmit(event)
    {
        console.log(battleAccount);
        event.preventDefault();
        props.battleupdater(new PublicKey(battleAccount));
        props.viewupdate(1);
        //props.battleupdater(event.target.value)
    }

    return (
        <div id="join-battle-container" className="section-container">
            <h1>Join an existing Battle.</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Battle Address:
                    <input type="text" value={battleAccount} onChange={handleChange}/>
                </label>
                <input type="submit" value="Join" />
            </form>
        </div>
    );
}

export default JoinBattle;