import { useEffect, useState } from "react";
import type { NextPage } from "next";

import { useWallet } from '@hooks';
import { WalletDetails } from "@organisms";

const Home: NextPage = () => {
  const {
    balance,
    checkIfWalletIsConnected,
    currentAccount,
    isConnected,
    loginWallet,
    switchAccount
  } = useWallet();

  useEffect(() => {
    checkIfWalletIsConnected();
  });

  useEffect(() => {
    switchAccount();
  });

  return (
    <div className="card-container">
      <WalletDetails
        balance={balance}
        currentAccount={currentAccount}
        isConnected={isConnected}
        loginWallet={loginWallet}
      />
    </div>
  );
};

export default Home;
