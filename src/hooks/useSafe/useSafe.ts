import { ethers } from 'ethers';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib'
import Safe, { SafeFactory, SafeAccountConfig } from '@gnosis.pm/safe-core-sdk'
import { useState } from 'react';

const useSafe = () => {
    const [safe, setSafe] = useState<Safe | null>(null);
    const [ethAdapter, setEthAdapter] = useState<EthersAdapter | null>(null);
    const [owners, setOwners] = useState<string[]>([]);

    const getEthAdapter = (): void => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const safeOwner = provider.getSigner()
        const ethAdapter = new EthersAdapter({
            ethers,
            signer: safeOwner
        });
        setEthAdapter(ethAdapter)
    }

    const deployNewSafe = async () => {
        try {
            getEthAdapter();
            if (ethAdapter !== null) {
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
                // const newSafeAddress = safeSdk.getAddress();
                console.log(safeSdk);
                setSafe(safeSdk)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return { deployNewSafe, safe };
}

export default useSafe;