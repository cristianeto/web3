import React from 'react'

import { IWalletForm } from '@core/interfaces'

const WalletForm: React.FC<IWalletForm> = ({
    onChange,
    receiverAddress,
    startPayment
}) => {
    return (
        <div className="content-form">
            <input onChange={onChange} value={receiverAddress} type="text" name="addressTo" placeholder="Enter an address to send ETHs" />
            <br />
            <div className="buttons">
                <button className="primary ghost" onClick={startPayment}>
                    Send 0.001 ETH
                </button>
            </div>
        </div>
    )
}

export default WalletForm