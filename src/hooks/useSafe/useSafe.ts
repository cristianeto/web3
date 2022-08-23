import { useState } from 'react';

import EthersAdapter from '@gnosis.pm/safe-ethers-lib'
import Safe, { SafeFactory, SafeAccountConfig } from '@gnosis.pm/safe-core-sdk'
import { ethers } from 'ethers';
import { IFormOwners } from '@core/interfaces';

const useSafe = (formValues: IFormOwners[]) => {
    const [safe, setSafe] = useState<Safe | null>(null);
    const [ethAdapter, setEthAdapter] = useState<EthersAdapter | null>(null);
    const [owners, setOwners] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
            getEthAdapter();
            if (ethAdapter !== null) {
                const safeFactory = await SafeFactory.create({ ethAdapter })
                const ownersForm = formValues.map(v => v.value);
                const owners = ownersForm;
                const threshold = owners.length;
                const safeAccountConfig: SafeAccountConfig = {
                    owners,
                    threshold,
                    // ...
                }
                const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig });
                setSafe(safeSdk);
                const ownersSafeSdk = await safeSdk.getOwners();
                setOwners(ownersSafeSdk);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }
    return { deployNewSafe, owners, isLoading };
}

export default useSafe;