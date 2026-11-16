import { PenLine, Trash } from "lucide-react";

export default function TransactionItem({ transaction, onDelete, onEdit }) {
  return (
    <div className="transaction-item">
      <h3>{transaction.title}</h3>
      <p className={transaction.type === "income" ? "income" : "expense"}>
        {transaction.type === "income" ? "+" : "-"}₹{transaction.amount}
      </p>
      <p>Type: {transaction.type}</p>

      <div className="">
        <button onClick={() => onEdit(transaction)}>
          <PenLine strokeWidth={0.75} size={18} />
        </button>
        <button onClick={() => onDelete(transaction.id)}>
          <Trash size={18} strokeWidth={0.75} />
        </button>
      </div>
    </div>
  );
}
