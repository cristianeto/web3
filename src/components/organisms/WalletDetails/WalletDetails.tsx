import Image from "next/image";

import { IWalletDetails } from '@core/interfaces';
import { messages } from "@utils";
import etherLogo from "../../../assets/images/ether.png";
import userImage from "../../../assets/images/llama2.jpg";

const WalletDetails: React.FC<IWalletDetails> = ({
	currentAccount,
	isConnected,
	loginWallet,
	balance
}) => {
	return (
		<>
			{!currentAccount ? "" : <span className="pro">Pro</span>}
			<Image src={userImage} alt="avatar" width={80} height={80} />
			<h3>Check Ether</h3>
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
				<div>
					<h6>Verified <span className="tick">&#10004;</span></h6>
					<p>Ether account and balance checker <br /> find account details</p>
					<div className="buttons">
						<button className="primary ghost" onClick={() => { }}>
							Ether Account Details
						</button>
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
				<div className="account-details">
					<h6>Your ether</h6>
					<ul>
						<li>Account</li>
						<li>{currentAccount}</li>
						<li>Balance</li>
						<li>{balance}</li>
					</ul>
					<input name="addressTo" placeholder="Enter an address to send ETHs" />
					<br />
					<div className="buttons">
						<button className="primary ghost" onClick={() => { }}>
							Send 0.1 ETHs
						</button>
					</div>
				</div>
			)}
		</>
	)
}

export default WalletDetails