import { useEffect, useState } from "react";
import type { NextPage } from "next";

import { TransactionList, WalletDetails } from "@organisms";
import { PublicLayout } from '@layouts';
import { useSafe, useWallet } from '@hooks';

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
    if (currentAccount !== "")
      getTxHistory(currentAccount);
  }, [currentAccount, getTxHistory])

  return (
    <PublicLayout>
      <div>
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
        {currentAccount !== "" && <TransactionList data={txList} />}
      </div>
    </PublicLayout>
  );
};

export default Home;
