import React, { useEffect, useState } from 'react'
import { Connection, Keypair, PublicKey } from '@solana/web3.js';

const ONBOARD_TEXT = "Click here to install phantom!";
const CONNECT_TEXT = "Connect Wallet";
const CONNECTED_TEXT = "Connected";

const PhantomConnection = () => {
    const [phantomAddress, setPhantomAddress] = useState('')
    const [newAdd, setNewadd] = useState('')
    const [value, setValue] = useState([])
    const [connect, setconnect] = useState(false)
    const [buttontext, setButtonText] = useState(ONBOARD_TEXT)
    const [showdetail, setShowDetail] = useState(false)
    const [isphantom, setIsphantom] = useState(false)
    const isPhantomInstalled = window.solana && window.solana.isPhantom
    // if (!isPhantomInstalled) {
    //     window.open("https://phantom.app/", "_blank");
    // }
    const getProvider = () => {
        if ("solana" in window) {
            const provider = window.solana;
            console.log("provider", provider)
            if (provider.isPhantom) {
                return provider;
            }
        }
        window.open("https://phantom.app/", "_blank");
    };
    const connectToPhantom = async () => {
        const isPhantomInstalled = window.solana && window.solana.isPhantom
        // console.log("sddddddddddddddddddddddddd", isPhantomInstalled)
        if (isPhantomInstalled) {
            // setButtonText(CONNECT_TEXT)
            try {
                const resp = await window.solana.connect();
                // console.log("response", resp)
                resp.publicKey.toString()
                // console.log("public key", resp.publicKey.toString())
                setPhantomAddress(resp.publicKey.toString())

                const resp2 = await window.solana.request({ method: "connect" })
                setButtonText(CONNECTED_TEXT)
                setconnect(true)
                // console.log("response2", resp2)
                setNewadd(phantomAddress)
                setconnect(true)

                // window.solana.on("connect", (value) => console.log(value))
                // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 
            } catch (err) {
                console.log("error connecting phantom", err)
                // { code: 4001, message: 'User rejected the request.' }
            }
        }


    }
    const connectButton = () => {
        if (phantomAddress) {
            setShowDetail(true)
            setNewadd(phantomAddress)
            const address = new PublicKey(phantomAddress)
            // console.log("address converted", address)
            const connection = new Connection("https://api.testnet.solana.com", "confirmed");
            // console.log("connection", connection)
            connection.getBalance(address).then((bal) => {
                // console.log("balance", bal)
                setValue((bal / 1000000000).toString().split(".")[0])
            })
        }
        else {
            connectToPhantom()

        }

    }
    const disconnectToPhantom = async () => {
        console.log("here")
        await window.solana.disconnect();
        console.log("after disconnect")
        window.solana.on('disconnect', () => console.log("disconnected!"))
    }
    useEffect(() => {
        // getProvider()
        if (isPhantomInstalled) {
            setButtonText(CONNECT_TEXT)
        }
        const interval = setInterval(() => {
            connectToPhantom().then((res) => {
            });
        }, 3000);
        return () => clearInterval(interval);

    }, [])
    const installPhantom = () => {
        window.open("https://phantom.app/", "_blank");
    }
    return (<>
        <div>{
            buttontext === "Click here to install phantom!" ? <button onClick={installPhantom}>Click here to install phantom!</button> : <button onClick={connectToPhantom} >{buttontext}</button>
        }

            {/* <button onClick={disconnectToPhantom} >Disconnect</button> */}

        </div>
        {connect ? <div>
            To get selected address and its balance
            <button onClick={connectButton} >Click me</button>
        </div> : null}
        {showdetail ? <div>
            <div>
                {typeof (phantomAddress) === "string" ? <div>{phantomAddress}</div> : null}
            </div>
            <div>
                {typeof (value) === "string" ? <div>{value}</div> : null}
            </div>
        </div> : null}

    </>)
}

export default PhantomConnection
