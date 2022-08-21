import { ITransactionList } from '@core/interfaces'

const TransactionList: React.FC<ITransactionList> = ({ data: txList }) => {
    return (
        <table id="tx-list">
            <tr>
                <th>Transaction Hash History</th>
            </tr>
            {txList.map(tx => (
                <tr key={tx.hash}>
                    <td>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={`https://rinkeby.etherscan.io/tx/${tx.hash}`}
                        >
                            {tx.hash}
                        </a>
                    </td>
                </tr>
            ))}
        </table>
    )
}

export default TransactionList