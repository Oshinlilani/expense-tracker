
import TransactionItem from "./TransactionItem";
import { motion, AnimatePresence } from "motion/react";
import { ReceiptText } from "lucide-react";

export default function TransactionList({ transactions, onDelete, onEdit }) {
  return (
    <div className="flex flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              layout
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <TransactionItem
                transaction={transaction}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </motion.div>
          ))
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-700 bg-slate-900/50 py-10"
          >
            <ReceiptText size={35} className="text-slate-500" />
            <p className="font-medium text-slate-300">
              No transactions found
            </p>
            <p className="text-sm text-slate-500">
              Try another search or add a new transaction.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
