import React, { useEffect, useState } from 'react';
import "../../animate.css";
import "../../bootstrap.css";
import "../../App.scss";
import TextBox from "./TextBox";
import Attacks from "./Attacks";
import EnemyBox from "./EnemyBox";
import PlayerBox from "./PlayerBox";
import PlayAgain from "./PlayAgain";

function BattleInterface(props) {
    const [gameOver, setGameOver] = useState(false);
    const [playerHP, setPlayerHP] = useState(0);
    const [playerFaint, setPlayerFaint] = useState(null);
    const [enemyHP, setEnemyHP] = useState(0);
    const [enemyFaint, setEnemyFaint] = useState(null);
    const [textMessageOne, setTextMessageOne] = useState("");
    const [textMessageTwo, setTextMessageTwo] = useState("");

    useEffect(() => {
        setPlayerHP(props.player.dinosolHP);
        setEnemyHP(props.opponent.dinosolHP);
        startingSequence();
    },[]);

    function startingSequence() {
        setTimeout(() => {
            setTextMessageOne(`A wild ${props.opponent.dinosolName} appeared!`);
            setEnemyFaint(false);
            setTimeout(() => {

                setTextMessageOne(`Go ${props.player.dinosolName}!`);
                setPlayerFaint(false);
                setTimeout(() => {
                    setTextMessageOne("");
                }, 3000);       
            }, 3000);
        }, 1000);
    };

    function enemyTurn(enemyAttackName, enemyAttackDamage) {
        enemyAttackDamage = enemyAttackDamage + Math.floor(Math.random() * 11);
        // first, check if enemy fainted. End Game if they did.
        if (enemyHP === 0) {   
            setTextMessageOne(`${props.opponent.dinosolName} fainted.`);
            setTextMessageTwo(`${props.player.dinosolName} wins!`);
            setEnemyFaint(true);

            setTimeout(() => {
                setGameOver(true);
            }, 3000);
        } else {
            // if enemy is still alive, proceed with enemy turn
            setTextMessageOne(`${props.opponent.dinosolName} used ${enemyAttackName} for ${enemyAttackDamage} damage!`);
            if(playerHP - enemyAttackDamage <= 0) {
                setPlayerHP(0);
            } else {
                setPlayerHP(playerHP - enemyAttackDamage);
            }

            setTimeout(() => {
                if (props.player.playerHP === 0) {
                    setTextMessageOne(`${props.player.dinosolName} fainted.`);
                    setTextMessageTwo(`${props.opponent.dinosolName} wins!`);
                    setPlayerFaint(true);

                    setTimeout(() => {
                        setGameOver(true);
                    }, 3000);
                } else {
                    setTextMessageOne("");
                }
            }, 2000);
        }
    };

    function handleAttackClick(name, damage) {
        damage = damage + Math.floor(Math.random() * 11);
        setTextMessageOne(`${props.player.dinosolName} used ${name} for ${damage} damage!`);
        let postAttackHP = enemyHP - damage;
        if(postAttackHP <= 0) {
            console.log("Enemy: Set to 0");
            setEnemyHP(0);
        } else {
            setEnemyHP(postAttackHP);
        }

        // wait X seconds before enemy attacks
        setTimeout(() => {
            // calc next enemy attack name and damage
            let enemyAttack = Math.floor(Math.random() * 4);
            let enemyAttackDamage = props.opponent.dinosolAttacks[enemyAttack].attackDamage;
            let enemyAttackName = props.opponent.dinosolAttacks[enemyAttack].attackName;

            // once the state is changed, start enemy turn
            enemyTurn(enemyAttackName, enemyAttackDamage);
        }, 3000);
    };
   
    return ( 
        <div className = "container h-100" >
            <div className = "row row h-100 justify-content-center align-items-center" >
                <div className = "col-sm-12" > { /* BATTLE SCREEN CONTAINER */ } 
                    <div id = "battle-container" className = "px-2 mx-auto" >
                        <EnemyBox enemyName = { props.opponent.dinosolName }
                            enemyLevel = { props.opponent.dinosolLevel }
                            enemyHP = { enemyHP }
                            enemyMaxHP = { props.opponent.dinosolHP }
                            enemyFaint = { enemyFaint }
                            enemyRank = { props.opponent.enemyRank }
                            dinoimage = { props.opponent.dinosolImage }
                        />
                        <PlayerBox playerName = { props.player.dinosolName }
                            playerLevel = { props.player.dinosolLevel }
                            playerHP = { playerHP }
                            playerMaxHP = { props.player.dinosolHP }
                            playerFaint = { playerFaint }
                            playerRank = { props.player.playerRank }
                            dinoimage = { props.player.dinosolImage }
                        />

                        { /* TEXT BOX SECTION */}
                        <div id = "text-box" >
                            <div id = "text-box-content" > 
                                {
                                    textMessageOne !== "" &&
                                    gameOver === false && ( 
                                        <TextBox messageOne = { textMessageOne }
                                            messageTwo = { textMessageTwo }
                                        />
                                    )
                                }
                                {
                                    textMessageOne === "" &&
                                    gameOver === false &&
                                    Object.keys(props.player.dinosolAttacks).map((key, index) => {
                                        return ( 
                                            <Attacks 
                                                key = { key }
                                                index = { index }
                                                details = { props.player.dinosolAttacks[key] }
                                                handleAttackClick = { handleAttackClick }
                                            />
                                        );
                                    })
                                }
                                {
                                    gameOver === true && ( 
                                        <PlayAgain handlePlayAgain = { props.viewupdate.bind(null,0) } />
                                    )
                                }
                            </div> 
                        </div> 
                        { /* END TEXT BOX SECTION */ } 
                    </div> 
                    { /* END BATTLE SCREEN CONTAINER */ }
                </div>
            </div> 
        </div>
    );
    
}

export default BattleInterface;