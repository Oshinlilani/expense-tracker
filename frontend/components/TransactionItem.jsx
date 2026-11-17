
import {
  PenLine,
  Trash,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function TransactionItem({ transaction, onDelete, onEdit }) {
  const isIncome = transaction.type === "income";

  return (
    <div className="group flex items-center justify-between px-2 py-3 transition-colors hover:bg-slate-800/40 rounded-lg">
      {/* Transaction details */}
      <div className="flex items-center gap-3">
        <div
          className={`rounded-lg p-2 ${
            isIncome
              ? "bg-emerald-500/10 text-emerald-500"
              : "bg-red-500/10 text-red-500"
          }`}
        >
          {isIncome ? (
            <TrendingUp size={17} />
          ) : (
            <TrendingDown size={17} />
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-white">
            {transaction.title}
          </h3>

          <p className="text-xs text-slate-400 capitalize">
            {transaction.type}
          </p>
        </div>
      </div>

      {/* Amount and actions */}
      <div className="flex items-center gap-3">
        <p
          className={`text-sm font-semibold ${
            isIncome ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {isIncome ? "+" : "-"}₹
          {Number(transaction.amount).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
          })}
        </p>

        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(transaction)}
            className="rounded-md p-1.5 text-slate-400 hover:text-purple-400"
            title="Edit"
          >
            <PenLine size={15} />
          </button>

          <button
            onClick={() => onDelete(transaction.id)}
            className="rounded-md p-1.5 text-slate-400 hover:text-red-400"
            title="Delete"
          >
            <Trash size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
