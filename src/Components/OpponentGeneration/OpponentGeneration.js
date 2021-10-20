import React, { useState, useEffect } from 'react';
import DinoCard from './DinoCard';

function OpponentGeneration(props) {

    const [loading, setLoading] = useState(true);
    const [preAnim, setPreAnim] = useState(true);

    useEffect(()=>{
        setTimeout(() => {
            const opponent = {
                "dinosolId": "9006",
                "dinosolName": "Opponentsaurus Rex",
                "dinosolImage": "https://dinosols.app/images/Dino_dubya.png",
                "dinosolLevel": 41,
                "dinosolExperience": 5000,
                "nextLevelExp": 6000, 
                "dinosolAttacks": [
                    {
                        "attackName": "Bite",
                        "attackDamage": 15,
                        "attackEffect": null,
                        "effectChance": 0,
                        "criticalChance": 0.15
                    },
                    {
                        "attackName": "Bite",
                        "attackDamage": 15,
                        "attackEffect": null,
                        "effectChance": 0,
                        "criticalChance": 0.15
                    },
                    {
                        "attackName": "Bite",
                        "attackDamage": 15,
                        "attackEffect": null,
                        "effectChance": 0,
                        "criticalChance": 0.15
                    },
                    {
                        "attackName": "Bite",
                        "attackDamage": 15,
                        "attackEffect": null,
                        "effectChance": 0,
                        "criticalChance": 0.15
                    }
                ],
                "dinosolBattleRecord": []
            };
            props.opponentupdater(opponent);
            setLoading(false);
            setTimeout(() => {
                setPreAnim(false);

                setTimeout(() => {
                    props.viewupdate(2);
                }, 5000);
            }, 30);
        },5000);
    },[]);

    function renderView() {
        let viewJsx = null;
        
        if(loading) {
            viewJsx = <h1>Generating a Challenger...</h1>;
        } else {
            viewJsx = (
                <>
                    <div id="player-card" className="dino-card-div" style={determineOffset(true)}>
                        <DinoCard dino={props.playerdino} />
                    </div>
                    <h1 id="vs-text">VS</h1>
                    <div id="opponent-card" className="dino-card-div" style={determineOffset(false)}>
                        <DinoCard dino={props.opponentdino} />
                    </div>
                </>
            );
        }

        return viewJsx;
    }

    function determineOffset(isPlayer) {
        let offset = 0;
        if(preAnim) {
            offset = 1000 * (isPlayer ? -1 : 1);
        }
        
        return {
            transform: `translateX(${offset}px)`
        }
    }

    return (
        <div id="opponent-generation-container" className="section-container">
            {
                renderView()
            }
        </div>
    );
}

export default OpponentGeneration;