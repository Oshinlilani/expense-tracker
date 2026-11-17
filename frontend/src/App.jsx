import { useEffect, useState } from "react";
import "./App.css";

import TransactionForm from "../components/TransactionForm.jsx";
import TransactionList from "../components/TransactionList.jsx";
import Summary from "../components/Summary.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Dashboard from "../components/Dashboard.jsx";
import EditTransactionForm from "../components/EditTransactionForm.jsx";

import { AnimatePresence } from "motion/react";
import { Search } from "lucide-react";
import Analytics from "../components/Analytics.jsx";
import BalanceTrend from "../components/BalanceTrend.jsx";
import UpcomingBills from "../components/UpcomingBills.jsx";

function App() {
  const initialTransactions = [
    { id: 1, title: "Salary", amount: 30000, type: "income" },
    { id: 2, title: "Rent", amount: 8000, type: "expense" },
    { id: 3, title: "Shopping", amount: 2500, type: "expense" },
    { id: 4, title: "Freelancing", amount: 5000, type: "income" },
  ];

  const initialBills = [
    {
      id: 1,
      title: "Water Bill",
      amount: 450,
      dueDate: "2026-11-20",
    },
    {
      id: 2,
      title: "Electricity Bill",
      amount: 1200,
      dueDate: "2026-11-25",
    },
    {
      id: 3,
      title: "Internet Bill",
      amount: 799,
      dueDate: "2026-11-30",
    },
  ];

  const [bills] = useState(initialBills);

  const [showTransactionForm, setShowTransactionForm] = useState(false);

  const [transaction, setTransaction] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : initialTransactions;
  });

  const [editTransaction, setEditTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Add transaction
  const handleTransaction = (newTransaction) => {
    setTransaction((prev) => [...prev, newTransaction]);
    setShowTransactionForm(false);
  };

  // Search transactions
  const filteredTransactions = transaction.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Save transactions to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transaction));
  }, [transaction]);

  // Delete transaction
  const handleDelete = (id) => {
    setTransaction((prev) => prev.filter((item) => item.id !== id));
  };

  // Open edit popup
  const handleEdit = (item) => {
    setEditTransaction(item);
  };

  // Update transaction
  const handleUpdate = (updatedTransaction) => {
    setTransaction((prev) =>
      prev.map((item) =>
        item.id === updatedTransaction.id ? updatedTransaction : item,
      ),
    );

    setEditTransaction(null);
  };

  return (
    <div className="min-h-screen w-full flex gap-6 bg-[#0f1020] p-6">
      {/* Sidebar */}
      <aside className="w-60 shrink-0">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col gap-6">
        <Header />

        {/* Dashboard Cards */}
        <Dashboard transactions={transaction} />

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
          <div className="xl:col-span-3">
            <BalanceTrend transactions={transaction} />
          </div>

          <div className="xl:col-span-2">
            <UpcomingBills bills={bills} />
          </div>
        </div>
        {/* Analytics Charts */}
        <Analytics transactions={transaction} />

        {/* Add Transaction Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowTransactionForm(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-medium px-5 py-3 rounded-xl shadow-lg shadow-purple-900/20 transition-all duration-200"
          >
            <span className="text-xl">+</span>
            Add Transaction
          </button>
        </div>

        {/* Recent Transactions Panel */}
        <section className="rounded-2xl border border-slate-800 bg-[#050b1c] p-5">
          {/* Panel Header */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-base font-semibold text-white">
              Recent Transactions
            </h2>

            {/* Search */}
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 w-full sm:w-64 focus-within:border-purple-500 transition-colors">
              <Search size={18} className="text-slate-400" />

              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-sm text-white placeholder-slate-500 w-full"
              />
            </div>
          </div>

          {/* Transaction List */}
          <TransactionList
            transactions={filteredTransactions}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </section>

        {/* Summary */}
        <Summary expenses={transaction} />

        {/* Add Transaction Popup */}
        <AnimatePresence>
          {showTransactionForm && (
            <TransactionForm
              onAdd={handleTransaction}
              onCancel={() => setShowTransactionForm(false)}
            />
          )}
        </AnimatePresence>

        {/* Edit Transaction Popup */}
        <AnimatePresence>
          {editTransaction && (
            <EditTransactionForm
              key={editTransaction.id}
              transaction={editTransaction}
              onUpdate={handleUpdate}
              onCancel={() => setEditTransaction(null)}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
