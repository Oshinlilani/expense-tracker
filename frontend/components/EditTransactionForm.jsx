import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function EditTransactionForm({
  transaction,
  onUpdate,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
    date: "",
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        title: transaction.title,
        amount: transaction.amount,
        type: transaction.type,
        date: transaction.date || "",
      });
    }
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate({
      ...formData,
      id: transaction.id,
      amount: Number(formData.amount),
    });
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl border border-gray-700 bg-slate-900 p-6"
        initial={{ opacity: 0, scale: 0.5, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 100 }}
        // transition={{  ease: "easeInOut" }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Edit Transaction</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-2 block text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-700 bg-slate-800 p-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-gray-300">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              required
              className="w-full rounded-lg border border-gray-700 bg-slate-800 p-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-gray-300">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-700 bg-slate-800 p-3 text-white outline-none"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-gray-300">Transaction Date</label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-700 bg-slate-800 p-3 text-white outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="w-1/2 rounded-lg bg-purple-600 p-3 font-semibold text-white hover:bg-purple-500 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-1/2 rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-500 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
