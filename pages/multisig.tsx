import type { NextPage } from "next";

import { OwnersAddForm, OwnersList } from "@organisms";
import { PublicLayout } from '@layouts';
import { useSafe } from "@hooks";
import { useState } from "react";
import { IFormOwners } from "@core/interfaces";

const Multisig: NextPage = () => {
    const [formValues, setFormValues] = useState<IFormOwners[]>([{ name: "address", value: "" }])
    const { deployNewSafe, owners, isLoading } = useSafe(formValues);

    const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newFormValues = [...formValues];
        newFormValues[i].value = e.target.value;
        setFormValues(newFormValues);
    }

    const addNewField = () => {
        const array = [...formValues, { name: "address", value: "" }]
        setFormValues(array);
    }
    return (
        <PublicLayout>
            <OwnersAddForm
                addNewField={addNewField}
                deployNewSafe={deployNewSafe}
                formValues={formValues}
                handleChange={handleChange}
            />
            <OwnersList data={owners} isLoading={isLoading} />
        </PublicLayout>
    )
}

export default Multisig