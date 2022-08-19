export interface IWalletDetails {
    balance: string;
    currentAccount: string;
    isConnected: boolean;
    loginWallet: ()=> void;
}