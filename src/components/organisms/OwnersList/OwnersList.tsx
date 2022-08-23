import { IOwnersList } from "@core/interfaces"

const OwnersList: React.FC<IOwnersList> = ({ data: owners, isLoading }) => {
    return (
        <div className="card-container form-gnosis owners-list">
            <h3>Owners</h3>
            <ul>
                {isLoading && "Loading..."}
                {owners.map((owner) =>
                    <li key={owner}>{owner}</li>
                )}
            </ul>
        </div>
    )
}

export default OwnersList