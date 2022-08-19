import { useState } from "react";
import { ethers } from 'ethers';
import { messages } from '@utils';

const INFURA_URL = `${process.env.NEXT_PUBLIC_INFURA_URL_RINKEBY}`;

const useWallet = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [balance, setBalance] = useState("");

    const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);

    const getAccounts = async () => {
        return await window.ethereum.request({
        method: "eth_accounts",
    });
  };

    const getBalance = async () => {
        const address = currentAccount;
        const balance = await provider.getBalance(address);
        const formatedBalance = `${ethers.utils.formatEther(balance)} ETH`;
        return formatedBalance;
    }
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return;
    const accounts = await getAccounts();

    if (!accounts.length) return messages.fail;
    setCurrentAccount(accounts[0]);
    const formatedBalance = await getBalance();
    setBalance(formatedBalance);
  };

  const loginWallet = async () => {
    if (!window.ethereum) return console.log(messages.fail);

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(accounts[0]);
    setIsConnected(true);
  };

  async function switchAccount() {
    window.ethereum.on("accountsChanged", async function () {
      const accounts = await getAccounts();
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        window.location.reload();
      }
    });
  }

    return {
        balance,
        currentAccount,
        checkIfWalletIsConnected,
        isConnected,
        loginWallet,
        switchAccount
    };
}

export default useWallet;