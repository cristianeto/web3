import { ethers } from 'ethers';

export interface IWalletDetails {
    balance: string;
    currentAccount: string;
    isConnected: boolean;
    loginWallet: () => void;
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

export interface IOwnersAddForm {
    addNewField: () => void;
    deployNewSafe: () => void;
    formValues: IFormOwners[];
    handleChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IPublicLayout {
    children: React.ReactNode;
}

export interface IFormOwners {
    name: string;
    value: string;
}

export interface IOwnersList {
    data: string[];
    isLoading: boolean;
}