import { useEffect, useState } from "react";
import type { NextPage } from "next";

import { useWallet } from '@hooks';
import { TransactionList, WalletDetails } from "@organisms";

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
    getTxHistory,
    isConnected,
    loginWallet,
    startPayment,
    switchAccount,
    txList,
  } = useWallet(receiverAddress, setReceiverAddress);

  useEffect(() => {
    checkIfWalletIsConnected();
  });

  useEffect(() => {
    switchAccount();
  });
  useEffect(() => {
    getTxHistory(currentAccount);
  }, [currentAccount, getTxHistory])

  return (
    <>
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
        {currentAccount !== "" && <TransactionList data={txList} />}
      </div>
    </>
  );
};

export default Home;
