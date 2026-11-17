import { motion } from "motion/react";

export default function Summary({ expenses }) {
  // const totalIncome = () => {
  //     return expenses.reduce((total, expense) => {
  //         if(expense.type === "income") {
  //             return total + expense.amount;
  //         }
  //         return total;
  //     }, 0);
  // }

  const totalIncome = expenses
    .filter((expense) => expense.type === "income")
    .reduce((total, expense) => total + Number(expense.amount), 0);

  const totalExpense = expenses
    .filter((expense) => expense.type === "expense")
    .reduce((total, expense) => total + Number(expense.amount), 0);
  // const totalExpense = () => {
  //     return expenses.reduce((total, expense) => {
  //         if (expense.type === "expense") {
  //             return total + expense.amount;
  //         }
  //         return total;
  //     }, 0)
  // }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-900 border border-gray-700 rounded-xl p-5 summary"
    >
      <h2 className="font-bold text-center border-b border-gray-600 pb-2">
        Summary
      </h2>
      <p>Total Income : ₹{totalIncome}</p>
      <p>Total Expenses : ₹{totalExpense}</p>
      <p>Available Balance : ₹{totalIncome - totalExpense}</p>
    </motion.div>
  );
}
