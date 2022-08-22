import { IOwnersList } from '@core/interfaces'

const OwnersList: React.FC<IOwnersList> = ({ deployNewSafe }) => {
    return (
        <div className="card-container form-gnosis">
            <input type="text" name="owner1" /><br />
            <input type="text" name="owner2" /><br />
            <input type="text" name="owner3" /><br />
            <button onClick={deployNewSafe} className="primary setup">Setup owners in gnosis</button>
        </div>
    )
}

export default OwnersList