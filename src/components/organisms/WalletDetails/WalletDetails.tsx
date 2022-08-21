import Image from "next/image";

import { IWalletDetails } from '@core/interfaces';
import { messages } from "@utils";
import { WalletForm } from "@organisms";
import etherLogo from "../../../assets/images/ether.png";
import userImage from "../../../assets/images/llama2.jpg";

const WalletDetails: React.FC<IWalletDetails> = ({
	currentAccount,
	isConnected,
	loginWallet,
	balance,
	onChange,
	receiverAddress,
	startPayment,
}) => {
	return (
		<>
			{!currentAccount ? "" : <span className="pro">Pro</span>}
			<Image src={userImage} alt="avatar" width={80} height={80} />
			{!currentAccount ? (
				<div>
					<div className="message">
						<p>{messages.fail}</p>
					</div>
					<Image
						src={etherLogo}
						alt="ether"
						width={100}
						height={100}
					/>
					<p>Welcome to your ether account balance checker</p>
				</div>
			) : (
				<div className="account-details">
					<h6>Verified <span className="tick">&#10004;</span></h6>
					<span className="eths">{balance}</span>
					<div>
						<span>Your address account:</span><br />
						<small>{currentAccount}</small>
					</div>
				</div>
			)}

			{!currentAccount && !isConnected ? (
				<div className="buttons">
					<button className="primary" onClick={loginWallet}>
						Connect with MetaMask
					</button>
				</div>
			) : (
				<WalletForm onChange={onChange} receiverAddress={receiverAddress} startPayment={startPayment} />
			)}
		</>
	)
}

export default WalletDetails