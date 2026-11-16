import { useEffect, useState } from "react";
import "./App.css";
import TransactionForm from "../components/TransactionForm.jsx";
import TransactionList from "../components/TransactionList.jsx";
import Summary from "../components/Summary.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Dashboard from "../components/Dashboard.jsx";

function App() {
  const initialTransactions = [
    { id: 1, title: "Salary", amount: 30000, type: "income" },
    { id: 2, title: "Rent", amount: 8000, type: "expense" },
    { id: 3, title: "Shopping", amount: 2500, type: "expense" },
    { id: 4, title: "Freelancing", amount: 5000, type: "income" },
  ];

  const [transaction, setTransaction] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : initialTransactions;
  });

  const [editTransaction, setEditTransaction] = useState(null);

  const handleTransaction = (newTransaction) => {
    setTransaction((prev) => [...prev, newTransaction]);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transaction.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transaction));
  }, [transaction]);

  const handleDelete = (id) => {
    setTransaction((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditTransaction(item);
  };

  const handleUpdate = (updatedTransaction) => {
    setTransaction((prev) =>
      prev.map((item) =>
        item.id === updatedTransaction.id ? updatedTransaction : item,
      ),
    );
    setEditTransaction(null);
  };

  return (
    <>
      <div className="min-h-screen w-full flex gap-6 bg-[#0f1020] p-6">
        <aside className="w-60 shrink-0">
          <Sidebar />
        </aside>

        <main className="flex-1 min-w-0 flex flex-col gap-6">
          <Header onSearch={setSearchTerm} />

          <Dashboard transactions={transaction} />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <TransactionForm
              handleTransaction={handleTransaction}
              editTransaction={editTransaction}
              handleUpdate={handleUpdate}
            />
            <TransactionList
              transactions={filteredTransactions}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>

          <Summary expenses={transaction} />
        </main>
      </div>
    </>
  );
}

export default App;
