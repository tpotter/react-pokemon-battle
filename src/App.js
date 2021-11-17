import React, { useEffect, useState } from "react";
import { PublicKey, Connection, AccountInfo, GetProgramAccountsConfig, GetProgramAccountsFilter, MemcmpFilter } from '@solana/web3.js';
//const solana = require('@solana/web3.js');
//const buffer = require('buffer');
import { programs } from '@metaplex/js';
//const metaplex = require('@metaplex/js')
import "./animate.css";
import "./bootstrap.css";
import "./App.scss";
import Home from "./Components/Home/Home";
import DinoPen from "./Components/DinoPen/DinoPen";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import DinoSelection from "./Components/DinoSelection/DinoSelection";
import PlayerConfig from "./Resources/player-config.json";
import OpponentGeneration from "./Components/OpponentGeneration/OpponentGeneration";
import BattleInterface from "./Components/BattleInterface/BattleInterface";
import JoinBattle from "./Components/JoinBattle/JoinBattle";
import PhantomConnection from "./Components/Home/PhantomConnection";

import { decodeMetadata } from "./schema";

const METADATA_PUBKEY = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
const GAME_METADATA_PUBKEY = new PublicKey("4iqJsF4JLz8iLuvMxYvHchtG3wqiZdsNEp1EGPphKVXw");
const BATTLE_PUBKEY = new PublicKey("7c3qcZxkby5jNCUx2ghQraLtrpM1aSR3V3vSWcgmorZS");

function App() {
    const [currentView, setCurrentView] = useState(0);
    const [playerDinosol, setPlayerDinosol] = useState(null);
    const [playerDinosolMap, setPlayerDinosolMap] = useState([]);
    const [opponentDinosol, setOpponentDinosol] = useState(null);
    let [battleAccount, setBattleAccount] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let dinoMap = {};
        window.solana.connect().then(result => {
            getNFTs().then(accounts => {
                //console.log(accounts);
                for (let account of accounts) {
                    //console.log(account);
                    getGameMetadata(account.token).then(gamemeta => {
                        //console.log(gamemeta);
                        dinoMap = PlayerConfig.playerDinosols.reduce(function (map, dino) {
                            map[dino.dinosolId] = dino;
                            return map;
                        }, {});
                        //console.log(dinoMap);

                        dinoMap = {};

                        fetch(account.metadata.data.data.uri).then(metadataData => {
                            metadataData.json().then(data => {
                                //console.log(data);

                                dinoMap[account.token] = {
                                    dinosolBattleRecord: [],
                                    nextLevelExp: 0,
                                    prevExpThreshold: 0,
                                    dinosolExperience: gamemeta.experience,
                                    dinosolHP: gamemeta.currStats.health,
                                    dinosolId: account.token,
                                    dinosolImage: data.image,
                                    dinosolLevel: gamemeta.level,
                                    dinosolName: account.metadata.data.data.name,
                                    dinosolAttacks: [
                                        {
                                            attackDamage: gamemeta.currStats.attack,
                                            attackEffect: gamemeta.move0.status_effect,
                                            attackName: moveIdToName(gamemeta.move0.move_id),
                                            criticalChance: 0,
                                            effectChance: gamemeta.move0.status_effect_chance,
                                        },
                                        {
                                            attackDamage: gamemeta.currStats.attack,
                                            attackEffect: gamemeta.move1.status_effect,
                                            attackName: moveIdToName(gamemeta.move1.move_id),
                                            criticalChance: 0,
                                            effectChance: gamemeta.move1.status_effect_chance,
                                        },
                                        {
                                            attackDamage: gamemeta.currStats.attack,
                                            attackEffect: gamemeta.move2.status_effect,
                                            attackName: moveIdToName(gamemeta.move2.move_id),
                                            criticalChance: 0,
                                            effectChance: gamemeta.move2.status_effect_chance,
                                        },
                                        {
                                            attackDamage: gamemeta.currStats.attack,
                                            attackEffect: gamemeta.move3.status_effect,
                                            attackName: moveIdToName(gamemeta.move3.move_id),
                                            criticalChance: 0,
                                            effectChance: gamemeta.move3.status_effect_chance,
                                        },
                                    ],
                                };
                                console.log(dinoMap);

                                setPlayerDinosolMap(dinoMap);
                                setLoading(false);
                            });
                        });
                    });
                }
            });
        });
    }, []);

    return (
        <div id="app-container">
            {
                renderCurrentView(currentView, setCurrentView, playerDinosol, playerDinosolMap, setPlayerDinosol, opponentDinosol, setOpponentDinosol, battleAccount, setBattleAccount)
            }
        </div>
    );
}

function renderCurrentView(currView,
    viewUpdater,
    playerDinosol,
    playerDinosolMap,
    playerDinosolUpdater,
    opponentDinosol,
    opponentDinosolUpdater,
    battleAccount,
    battleAccountUpdater) {
    let viewJsx = null;

    switch (currView) {
        case 0: //Home page
            viewJsx = (
                <Home viewupdate={viewUpdater} />
            );
            break;
        case 1: //Battle Setup
            viewJsx = (
                <DinoSelection dinomap={playerDinosolMap}
                    currentdino={playerDinosol}
                    currentupdater={playerDinosolUpdater}
                    viewupdate={viewUpdater}
                    battleaccount={battleAccount}
                    battleupdater={battleAccountUpdater}
                />
            );
            break;
        case 2: //Battle
            viewJsx = (
                <BattleInterface opponent={opponentDinosol}
                    player={playerDinosol}
                    viewupdate={viewUpdater}
                    dinomap={playerDinosolMap}
                    battleaccount={battleAccount}
                />
            );
            break;
        case 3: //Leaderboards
            viewJsx = (
                <Leaderboard viewupdate={viewUpdater} />
            );
            break;
        case 4: //View Dinosols
            viewJsx = (
                <DinoPen viewupdate={viewUpdater} dinomap={playerDinosolMap} />
            );
            break;
        case 5: //Select Opponent
            viewJsx = (
                <OpponentGeneration playerdino={playerDinosol}
                    opponentdino={opponentDinosol}
                    opponentupdater={opponentDinosolUpdater}
                    viewupdate={viewUpdater}
                    dinomap={playerDinosolMap}
                    battleaccount={battleAccount}
                    battleupdater={battleAccountUpdater}
                />
            );
            break;
        case 6: //Buy Dinosols
            break;
        case 7: //Join Existing Battle
            viewJsx = (
                <JoinBattle viewupdate={viewUpdater}
                    battleaccount={battleAccount}
                    battleupdater={battleAccountUpdater}
                />
            );
            break;
        default:
            break;
    }

    return viewJsx;
}

async function getNFTs() {
    let connection = new Connection("https://api.devnet.solana.com");
    // connection.getProgramAccounts(new solana.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), {
    //     filters: [{dataSize: 165}, { memcmp: { offset: 32, bytes: "3HxqsUguP6E7CNqjvpEAnJ8v86qbyJgWvN2idAKygLdD" } }]
    const accounts = await connection.getParsedTokenAccountsByOwner(new PublicKey(window.solana.publicKey.toString()), { programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") }
    )

    let tokens = [];
    accounts.value.forEach(account => {
        if (account.account.data.parsed.info.tokenAmount.uiAmount == 1 && account.account.data.parsed.info.tokenAmount.decimals == 0) {
            //console.log(account.account.data.parsed.info.mint);
            tokens.push(account.account.data.parsed.info.mint);
        }
    });

    let metadatas = [];
    for (const token of tokens) {
        //console.log(token);
        let [metadataAccount, bump] = await PublicKey.findProgramAddress([
            Buffer.from("metadata"),
            METADATA_PUBKEY.toBuffer(),
            new PublicKey(token).toBuffer(),
        ], METADATA_PUBKEY);

        try {
            //console.log(metadataAccount);
            let metadata = await programs.metadata.Metadata.load(connection, metadataAccount)
            //console.log(metadata.data.updateAuthority);
            //console.log(metadata.data.data.name);
            if (metadata.data.updateAuthority == '3HxqsUguP6E7CNqjvpEAnJ8v86qbyJgWvN2idAKygLdD' && metadata.data.data.name.includes('Test Dinosol')) {
                //console.log(metadata);
                metadatas.push({ "token": token, "metadata": metadata });
            }
        } catch (e) {
            console.log(e);
        }
    }

    return metadatas;
}

async function getGameMetadata(token) {
    let connection = new Connection("https://api.devnet.solana.com");

    let [metadataAccount, bump] = await PublicKey.findProgramAddress([
        Buffer.from("gamemeta"),
        GAME_METADATA_PUBKEY.toBuffer(),
        new PublicKey(token).toBuffer(),
    ], GAME_METADATA_PUBKEY);

    //console.log(metadataAccount.toString());

    const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);
    const metadata = decodeMetadata(metadataAccountInfo.data);
    console.log(metadata);
    return metadata;
}

function moveIdToName(move_id) {
    let name = "";
    switch (move_id) {
        case 0:
            name = "";
            break;
        case 1:
            name = "Slash";
            break;
        case 2:
            name = "Bite";
            break;
        case 3:
            name = "PackHunt";
            break;
        case 4:
            name = "Bite";
            break;
        case 5:
            name = "Crush";
            break;
        case 6:
            name = "GroupTear";
            break;
        case 7:
            name = "Claw";
            break;
        case 8:
            name = "Drop";
            break;
        case 9:
            name = "Swarm";
            break;
        case 10:
            name = "Stab";
            break;
        case 11:
            name = "Charge";
            break;
        case 12:
            name = "Herd Defense";
            break;
        case 13:
            name = "Laser";
            break;
    }

    return name;
}


export default App;