import { useEffect, useState, useMemo } from "react";
import type { NextPage } from "next";

import { useSafe, useWallet } from '@hooks';
import { OwnersList, TransactionList, WalletDetails } from "@organisms";

const Home: NextPage = () => {
  const [receiverAddress, setReceiverAddress] = useState<string>("");


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setReceiverAddress(target.value);
  }
  const { deployNewSafe } = useSafe();
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
    <div className="container">
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
      <OwnersList deployNewSafe={deployNewSafe} />
    </div>
  );
};

export default Home;
