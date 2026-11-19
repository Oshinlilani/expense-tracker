import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Wallet,
  CalendarDays,
  Tag,
  Hash,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function TransactionDetails({
  transaction,
  onClose,
}) {
  if (!transaction) return null;

  const isIncome = transaction.type === "income";

  const details = [
    {
      label: "Transaction ID",
      value: transaction.id,
      icon: Hash,
    },
    {
      label: "Date",
      value: transaction.date || "Not provided",
      icon: CalendarDays,
    },
    {
      label: "Category",
      value: transaction.category || "Uncategorized",
      icon: Tag,
    },
    {
      label: "Transaction Type",
      value: isIncome ? "Income" : "Expense",
      icon: isIncome ? TrendingUp : TrendingDown,
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          onClick={(e) => e.stopPropagation()}
          className="h-full w-full max-w-md overflow-y-auto border-l border-slate-700 bg-[#0f1020] p-6 shadow-2xl"
        >
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Transaction Details
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                View complete transaction information
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg bg-slate-800 p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Amount Card */}
          <div className="mb-8 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-purple-500/20 p-3">
                <Wallet className="text-purple-400" size={24} />
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  {isIncome ? "Income Amount" : "Expense Amount"}
                </p>
                <p className="font-medium text-white">
                  {transaction.title}
                </p>
              </div>
            </div>

            <h3
              className={`text-3xl font-bold ${
                isIncome ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {isIncome ? "+" : "-"}₹
              {Number(transaction.amount).toLocaleString("en-IN")}
            </h3>
          </div>

          {/* Details */}
          <div className="space-y-5">
            <h3 className="font-semibold text-white">
              General Information
            </h3>

            {details.map((detail) => {
              const Icon = detail.icon;

              return (
                <div
                  key={detail.label}
                  className="flex items-center gap-4 border-b border-slate-800 pb-4"
                >
                  <div className="rounded-lg bg-slate-800 p-2.5">
                    <Icon size={18} className="text-purple-400" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      {detail.label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-200">
                      {detail.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={onClose}
            className="mt-8 w-full rounded-xl bg-purple-600 py-3 font-medium text-white transition hover:bg-purple-500"
          >
            Close Details
          </button>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}