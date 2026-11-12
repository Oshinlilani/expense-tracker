

export default function TransactionItem({ transaction }) {
    return (
        <div className="transaction-item">
            <h3>{transaction.title}</h3>
            <p className={transaction.type === "income" ? "income" : "expense"}>
  {transaction.type === "income" ? "+" : "-"}₹{transaction.amount}
</p>
            <p>Type: {transaction.type}</p>
        </div>
    );
}