import { useEffect, useState } from "react";
import type { NextPage } from "next";

import { useWallet } from '@hooks';
import { WalletDetails } from "@organisms";

const Home: NextPage = () => {
  const [receiverAddress, setReceiverAddress] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setReceiverAddress(target.value);
  }

  const {
    balance,
    checkIfWalletIsConnected,
    currentAccount,
    isConnected,
    loginWallet,
    startPayment,
    switchAccount
  } = useWallet(receiverAddress);

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
        onChange={handleChange}
        receiverAddress={receiverAddress}
        startPayment={startPayment}
      />
    </div>
  );
};

export default Home;
