import { ethers } from 'ethers';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib'
import Safe, { SafeFactory, SafeAccountConfig } from '@gnosis.pm/safe-core-sdk'

const useSafe = () => {

    const getEthAdapter = (): EthersAdapter => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const safeOwner = provider.getSigner()
        const ethAdapter = new EthersAdapter({
            ethers,
            signer: safeOwner
        });
        return ethAdapter;
    }

    const deployNewSafe = async () => {
        try {
            const ethAdapter = getEthAdapter();
            const safeFactory = await SafeFactory.create({ ethAdapter })

            const owners = [
                '0xdf2C7c4A0BC96A68593C3016A36811Ae89C1cBeC',
                '0x739Ee98C6b820ce088eB900608B836C243664629',
                '0x25bc1364cb714F0860E194D17Dbf3a1b50493Cc7',
            ]
            const threshold = 3
            const safeAccountConfig: SafeAccountConfig = {
                owners,
                threshold,
                // ...
            }
            const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig });
            const newSafeAddress = safeSdk.getAddress()

            console.log(newSafeAddress);
        } catch (error) {
            console.log(error)
        }
    }
    return { deployNewSafe };
}

export default useSafe;