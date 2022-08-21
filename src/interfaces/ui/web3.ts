import { ethers } from 'ethers';

export interface IWalletDetails {
    balance: string;
    currentAccount: string;
    isConnected: boolean;
    loginWallet: ()=> void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    receiverAddress: string;
    startPayment: () => void;
}

export interface IWalletForm {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    receiverAddress: string;
    startPayment: () => void;
}

export interface ITransactionList {
    data: ethers.providers.TransactionResponse[];
}