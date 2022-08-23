import type { NextPage } from "next";

import { OwnersList } from "@organisms";
import { PublicLayout } from '@layouts';
import { useSafe } from "@hooks";

const Multisig: NextPage = () => {

    const { deployNewSafe, safe } = useSafe();

    return (
        <PublicLayout>
            <h1>Multisig</h1>
            <OwnersList deployNewSafe={deployNewSafe} />
        </PublicLayout>
    )
}

export default Multisig