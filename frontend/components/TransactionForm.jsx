
import { useState, useEffect } from "react";

export default function TransactionForm({
  handleTransaction,
  editTransaction,
  handleUpdate,
}) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
  });

  // Fill form when edit
  useEffect(() => {
    if (editTransaction) {
      setFormData({
        title: editTransaction.title,
        amount: editTransaction.amount,
        type: editTransaction.type,
      });
    }
  }, [editTransaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const transactionData = {
      ...formData,
      amount: Number(formData.amount),
    };

    if (editTransaction) {
      handleUpdate({
        ...transactionData,
        id: editTransaction.id,
      });
    } else {
      handleTransaction({
        id: Date.now(),
        ...transactionData,
      });
    }

    setFormData({
      title: "",
      amount: "",
      type: "income",
    });
  };

  return (
    <div className="transaction-form">
      <h2>
        {editTransaction ? "Edit Transaction" : "Add Transaction"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            value={formData.title}
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            value={formData.amount}
            type="number"
            name="amount"
            placeholder="Amount"
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <button type="submit">
          {editTransaction ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}
