import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import image from "next/image";

import { ethers } from "ethers";
import etherLogo from "../public/ether.png";
import userImage from "../public/llama2.jpg";
import { messages } from "../utils/messages";
import Image from "next/image";
// import { INFURA_URL } from '../utils/infura';

const Home: NextPage = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [balance, setBalance] = useState("");

    const INFURA_URL = `${process.env.NEXT_PUBLIC_INFURA_URL_RINKEBY}`;
    const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);

    const checkIfWalletIsConnected = async () => {
        if (!window.ethereum) return;
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        if (!accounts.length) return messages.fail;

        setCurrentAccount(accounts[0]);

        const address = currentAccount;
        const balance = await provider.getBalance(address);
        const formatedBalance = `${ethers.utils.formatEther(balance)} ETH`;
        setBalance(formatedBalance);
    };

    const LoginWallet = async () => {
        if (!window.ethereum) return console.log(messages.fail);

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        setCurrentAccount(accounts[0]);
        setIsConnected(true);
        // window.location.reload();
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    });

    useEffect(() => {
        async function switchAccount() {
            window.ethereum.on("accountsChanged", async function () {
                const accounts = await window.ethereum.request({
                    method: "eth_accounts",
                });
                if (accounts.length) {
                    setCurrentAccount(accounts[0]);
                } else {
                    window.location.reload();
                }
            });
        }
        switchAccount();
    }, []);

    return (
        <div className="card-container">
            <Head>
                <title>Auth Web3</title>
            </Head>
            {!currentAccount ? "" : <span className="pro">Pro</span>}
            <Image src={userImage} alt="avatar" width={80} height={80} />
            <h3>Check Ether</h3>

            {!currentAccount ? (
                <div>
                    <div className="message">
                        <p>{messages.fail}</p>
                    </div>
                    <Image
                        src={etherLogo}
                        alt="ether"
                        width={100}
                        height={100}
                    />
                    <p>Welcome to your ether accout balance checker</p>
                </div>
            ) : (
                <div>
                    <h6>
                        {" "}
                        Verified <span className="tick">&#10004;</span>
                    </h6>
                    <p>
                        Ether account and balance checker <br /> find account
                        details
                    </p>
                    <div className="buttons">
                        <button className="primary ghost" onClick={() => {}}>
                            Ether Account Details
                        </button>
                    </div>
                </div>
            )}

            {!currentAccount && !isConnected ? (
                <div className="buttons">
                    <button className="primary" onClick={LoginWallet}>
                        Connect with MetaMask
                    </button>
                </div>
            ) : (
                <div className="skills">
                    <h6>Your ether</h6>
                    <ul>
                        <li>Account</li>
                        <li>{currentAccount}</li>
                        <li>Balance</li>
                        <li>{balance}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Home;
