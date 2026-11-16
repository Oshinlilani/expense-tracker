import TransactionItem from "./TransactionItem";


export default function TransactionList({ transactions, onDelete, onEdit }) {
    return (
        <div className="transaction-list">
            {transactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} onDelete={onDelete} onEdit={onEdit}/>
            ))}
        </div>
    )
}   
           
  