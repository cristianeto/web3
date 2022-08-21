import { useState } from "react";
import { ethers } from 'ethers';
import { messages } from '@utils';

const DEFAULT_ETHS_TO_SEND = "0.001";
const INFURA_URL = `${process.env.NEXT_PUBLIC_INFURA_URL_RINKEBY}`;

const useWallet = (
  receiverAddress: string,
  setReceiverAddress: (value: string) => void
) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [balance, setBalance] = useState("");
    const [txList, setTxList] = useState<ethers.providers.TransactionResponse[]>([]);

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
    try {
      const accounts = await getAccounts();
      if (!accounts.length) return messages.fail;
      setCurrentAccount(accounts[0]);
      const formatedBalance = await getBalance();
      setBalance(formatedBalance);
    } catch (error) {
      alert(error)
    }
  };

  const loginWallet = async () => {
    if (!window.ethereum) return console.log(messages.fail);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      getTxHistory(currentAccount);
      setIsConnected(true);
    } catch (error) {
      alert(error)
    }
  };

  const startPayment = async () => {
    if (!window.ethereum) return console.log(messages.fail)
    try {
      await window.ethereum.send('eth_requestAccounts');
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(receiverAddress);
      await signer.sendTransaction({
        to: receiverAddress,
        value: ethers.utils.parseEther(DEFAULT_ETHS_TO_SEND),
      });
      alert("OK. 0.001 ETHs were sent to " + receiverAddress)
      setReceiverAddress("");
    } catch (error) {
      alert(error);
    }
  };

  const getTxHistory = async (myAddress: string) =>{
    if (!window.ethereum) return console.log(messages.fail);
    try {
      let etherscanProvider = new ethers.providers.EtherscanProvider(4);
      const history = await etherscanProvider.getHistory(myAddress);
      setTxList(history);
    } catch (error) {
      console.log(error)
    }
  }

  async function switchAccount() {
    window.ethereum.on("accountsChanged", async function () {
      const accounts = await getAccounts();
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getTxHistory(currentAccount);
      } else {
        window.location.reload();
      }
    });
  }

    return {
        balance,
        currentAccount,
        checkIfWalletIsConnected,
        getTxHistory,
        isConnected,
        loginWallet,
        startPayment,
        switchAccount,
        txList,
    };
}

export default useWallet;