import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";

import TransactionForm from "../components/TransactionForm.jsx";
import TransactionList from "../components/TransactionList.jsx";
import Transactions from "../components/Transactions.jsx";
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
import Login from "../components/Login.jsx";

function App() {
  const [activeTab, setActiveTab] = useState("overview");

  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("expenseTrackerUser") || "null");
  });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const initialTransactions = [
    {
      id: 1,
      title: "Salary",
      amount: 30000,
      type: "income",
      date: "Mar 1, 2025",
      category: "Salary",
    },
    {
      id: 2,
      title: "Rent",
      amount: 8000,
      type: "expense",
      date: "Mar 2, 2025",
      category: "Housing",
    },
    {
      id: 3,
      title: "Shopping",
      amount: 2500,
      type: "expense",
      date: "Mar 15, 2025",
      category: "Shopping",
    },
    {
      id: 4,
      title: "Freelancing",
      amount: 5000,
      type: "income",
      date: "Mar 8, 2025",
      category: "Freelance",
    },
  ];

  const initialBills = [
    {
      id: 1,
      title: "Water Bill",
      amount: 450,
    },
    {
      id: 2,
      title: "Electricity Bill",
      amount: 1200,
    },
    {
      id: 3,
      title: "Internet Bill",
      amount: 799,
    },
  ];

  const [bills] = useState(initialBills);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  const [transaction, setTransaction] = useState(() => {
    const user = JSON.parse(
      localStorage.getItem("expenseTrackerUser") || "null",
    );

    if (!user) return [];

    const storageKey = `transactions_${user.email.toLowerCase()}`;

    const savedTransactions = localStorage.getItem(storageKey);

    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [editTransaction, setEditTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAuthSuccess = (user) => {
    localStorage.setItem("expenseTrackerUser", JSON.stringify(user));

    const storageKey = `transactions_${user.email.toLowerCase()}`;

    const savedTransactions = localStorage.getItem(storageKey);

    setTransaction(savedTransactions ? JSON.parse(savedTransactions) : []);

    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("expenseTrackerUser");
    setCurrentUser(null);
    setTransaction([]);
  };

  // Add transaction
  const handleTransaction = useCallback((newTransaction) => {
    setTransaction((prev) => [...prev, newTransaction]);
    setShowTransactionForm(false);
  }, []);

  // Search transactions (for Overview Recent Transactions)
  const filteredTransactions = useMemo(() => {
    return transaction.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [transaction, searchTerm]);

  // Save transactions to localStorage
  useEffect(() => {
    if (!currentUser?.email) return;

    const storageKey = `transactions_${currentUser.email.toLowerCase()}`;

    localStorage.setItem(storageKey, JSON.stringify(transaction));
  }, [transaction, currentUser]);

  // Delete transaction
  const handleDelete = useCallback((id) => {
    setTransaction((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Open edit popup
  const handleEdit = useCallback((item) => {
    setEditTransaction(item);
  }, []);

  // Update transaction
  const handleUpdate = useCallback((updatedTransaction) => {
    setTransaction((prev) =>
      prev.map((item) =>
        item.id === updatedTransaction.id ? updatedTransaction : item,
      ),
    );

    setEditTransaction(null);
  }, []);

  const handleImportTransactions = useCallback((newTransactions) => {
    setTransaction((prev) => [
      ...prev,
      ...newTransactions.map((item, index) => ({
        ...item,
        id: Date.now() + index,
      })),
    ]);
  }, []);

  if (!currentUser) {
    return <Login onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen w-full flex gap-6 bg-[#0f1020] pb-3 pr-3">
      {/* Sidebar */}
      <aside
        className={`shrink-0 sticky top-0 h-[calc(100vh-2rem)] transition-all duration-200 ${
          isSidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col transition-all duration-300 gap-6 pt-6">
        {/* <Header /> */}

        {/* ================= OVERVIEW TAB ================= */}
        {activeTab === "overview" && (
          <>
            {/* Dashboard Cards */}
            <Dashboard
              transactions={transaction}
              setShowTransactionForm={setShowTransactionForm}
              handleLogout={handleLogout}
              currentUser={currentUser}
            />

            <div className="w-full  grid grid-cols-1 xl:grid-cols-3 gap-4">
              <div className="xl:col-span-1">
                <BalanceTrend transactions={transaction} />
              </div>

              <div className="xl:col-span-2">
                {/* Analytics Charts */}
                <Analytics transactions={transaction} />
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              {/* <div className="xl:col-span-1">
                <UpcomingBills bills={bills} />
              </div> */}
            </div>

            {/* Add Transaction Button */}
            {/* <div className="flex justify-end">
              <button
                onClick={() => setShowTransactionForm(true)}
                className="flex items-center gap-2 bg-[#7c6ff6] hover:bg-purple-500 text-white font-medium px-5 py-3 rounded-xl shadow-lg shadow-purple-900/20 transition-all duration-200 cursor-pointer"
              >
                <span className="text-xl">+</span>
                Add Transaction
              </button>
            </div> */}

            {/* Recent Transactions Panel */}
            <section className="rounded-2xl border border-slate-800 bg-[#050b1c] p-5">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-white">
                    Recent Transactions
                  </h2>

                  <button
                    onClick={() => setActiveTab("transactions")}
                    className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-medium mt-1 transition cursor-pointer"
                  >
                    View all <span>→</span>
                  </button>
                </div>

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

              <TransactionList
                transactions={filteredTransactions}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </section>

            {/* Summary */}
            {/* <Summary expenses={transaction} /> */}
          </>
        )}

        {/* ================= TRANSACTIONS TAB ================= */}
        {activeTab === "transactions" && (
          <Transactions
            transactions={transaction}
            onAdd={() => setShowTransactionForm(true)}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onImport={handleImportTransactions}
          />
        )}

        {/* ================= OTHER TABS PLACEHOLDERS ================= */}
        {activeTab === "bills" && (
          <div className="p-8 text-gray-400 bg-[#050b1c] rounded-2xl border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-2">Bills Manager</h2>
            <p>Bills view content coming soon...</p>
          </div>
        )}
        {activeTab === "insights" && (
          <div className="p-8 text-gray-400 bg-[#050b1c] rounded-2xl border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-2">
              Insights & Analytics
            </h2>
            <p>Insights view content coming soon...</p>
          </div>
        )}
        {activeTab === "goals" && (
          <div className="p-8 text-gray-400 bg-[#050b1c] rounded-2xl border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-2">
              Financial Goals
            </h2>
            <p>Goals view content coming soon...</p>
          </div>
        )}

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
