import { IOwnersAddForm } from "@core/interfaces"

const OwnersAddForm: React.FC<IOwnersAddForm> = ({ addNewField, deployNewSafe, formValues, handleChange }) => {
    return (
        <div className="card-container form-gnosis">
            {formValues.map((element, index) => (
                <input key={index} type="text" name={element.name} value={element.value || ""} placeholder='0x...address' onChange={e => handleChange(index, e)} />
            ))}
            <button onClick={addNewField}>+ Add more Owners</button>
            <button onClick={deployNewSafe} className="primary setup">Setup owners</button>
        </div>
    )
}

export default OwnersAddForm