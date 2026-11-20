const createTransactionKey = (transaction) => {
  const normalizeDate = (date) => {
    if (!date) return "";

    const value = String(date).trim();

    // Keep ISO dates unchanged
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
      return value.toLowerCase();
    }

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return [
    String(transaction.title || "")
      .trim()
      .toLowerCase(),
    Number(transaction.amount),
    String(transaction.type || "")
      .trim()
      .toLowerCase(),
    normalizeDate(transaction.date),
    String(transaction.category || "")
      .trim()
      .toLowerCase(),
  ].join("|");
};

import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ArrowUpDown,
  Upload,
  Download,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import TransactionDetails from "./TransactionDetails";
import { useRef } from "react";

export default function Transactions({
  transactions = [],
  onAdd,
  onEdit,
  onDelete,
  onImport,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "asc",
  });

  const fileInputRef = useRef(null);
  const [importMessage, setImportMessage] = useState("");

  // Filter and search logic (handles both item.title and item.description)
  const filteredTransactions = transactions.filter((item) => {
    const label = item.title || item.description || "";
    const matchesSearch = label
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (filterType === "all") return matchesSearch;
    return matchesSearch && item.type === filterType;
  });

  const handleImport = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const rows = XLSX.utils.sheet_to_json(sheet, {
        defval: "",
        raw: false,
      });

      if (rows.length === 0) {
        setImportMessage("The Excel file is empty.");
        return;
      }

      // Store existing transaction keys
      const existingKeys = new Set(transactions.map(createTransactionKey));

      // Store keys imported from the current Excel file
      const importedKeys = new Set();

      const importedTransactions = [];

      let duplicates = 0;
      let skipped = 0;

      rows.forEach((row) => {
        const title = String(row.title || "").trim();
        const amount = Number(row.amount);
        const type = String(row.type || "")
          .trim()
          .toLowerCase();
        const date = String(row.date || "").trim();
        const category = String(row.category || "").trim();

        // Validate transaction
        if (
          !title ||
          !Number.isFinite(amount) ||
          amount <= 0 ||
          !["income", "expense"].includes(type) ||
          !date ||
          !category
        ) {
          skipped++;
          return;
        }

        const newTransaction = {
          title,
          amount,
          type,
          date,
          category,
        };

        const transactionKey = createTransactionKey(newTransaction);

        // Check duplicates
        if (
          existingKeys.has(transactionKey) ||
          importedKeys.has(transactionKey)
        ) {
          duplicates++;
          return;
        }

        importedKeys.add(transactionKey);
        importedTransactions.push(newTransaction);
      });

      // Import only unique transactions
      if (importedTransactions.length > 0) {
        onImport(importedTransactions);
      }

      setImportMessage(
        `${importedTransactions.length} imported, ${duplicates} duplicates skipped, ${skipped} invalid rows skipped.`,
      );
    } catch (error) {
      console.error("Excel import error:", error);
      setImportMessage(error.message || "Unable to read this Excel file.");
    } finally {
      e.target.value = "";
    }
  };

  const handleExport = () => {
    if (transactions.length === 0) {
      setImportMessage("No transactions available to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      transactions.map(({ title, amount, type, date, category }) => ({
        title,
        amount,
        type,
        date,
        category,
      })),
    );

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    XLSX.writeFile(workbook, "ExpenseFlow_Transactions.xlsx");
  };

  // Helper function for category dot colors
  const getCategoryDotColor = (category) => {
    switch (category?.toLowerCase()) {
      case "health":
        return "bg-teal-400";
      case "education":
        return "bg-cyan-400";
      case "food & dining":
        return "bg-amber-400";
      case "entertainment":
        return "bg-pink-400";
      case "investment":
        return "bg-purple-400";
      case "shopping":
        return "bg-orange-400";
      case "transport":
        return "bg-blue-400";
      case "freelance":
        return "bg-indigo-400";
      case "utilities":
        return "bg-teal-400";
      case "housing":
        return "bg-rose-400";
      case "salary":
        return "bg-purple-400";
      default:
        return "bg-slate-400";
    }
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      let comparison = 0;

      if (sortConfig.key === "amount") {
        comparison = Number(a.amount) - Number(b.amount);
      } else if (sortConfig.key === "date") {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (sortConfig.key === "category") {
        comparison = (a.category || "").localeCompare(b.category || "");
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [filteredTransactions, sortConfig]);

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown size={14} />;
    }

    return sortConfig.direction === "asc" ? (
      <ArrowUp size={14} />
    ) : (
      <ArrowDown size={14} />
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 text-white">
      {/* Top Header Row: Title & Add Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {transactions.length} transactions
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleImport}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-2 rounded-lg border border-purple-500/40 px-4 py-2 text-sm text-purple-300 hover:bg-purple-500/10"
          >
            <Upload size={16} />
            Import
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
          >
            <Download size={16} />
            Export
          </button>

          <button
            onClick={onAdd}
            className="flex items-center gap-2 bg-[#7c6ff6] hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            <Plus size={16} />
            Add Transaction
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        {importMessage && (
          <p className="text-sm text-purple-300">{importMessage}</p>
        )}
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121829] border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        {/* Type Filter Dropdown */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-[#121829] border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-purple-500 transition cursor-pointer w-full sm:w-auto"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Transactions Table Container */}
      <div className="w-full bg-[#121829]/90 border border-gray-800/80 rounded-xl overflow-hidden shadow-xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-xs font-semibold text-gray-400 bg-[#0f1423]/60">
                <th className="py-3.5 px-6 flex items-center gap-1.5 cursor-pointer hover:text-white transition">
                  <button
                    onClick={() => handleSort("date")}
                    className="flex items-center gap-1"
                  >
                    Date {getSortIcon("date")}
                  </button>
                </th>
                <th className="py-3.5 px-6">Description</th>
                <th className="py-3.5 px-6 cursor-pointer hover:text-white transition">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleSort("category")}
                      className="flex items-center gap-1"
                    >
                      Category {getSortIcon("category")}
                    </button>
                  </div>
                </th>
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6 cursor-pointer hover:text-white transition text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => handleSort("amount")}
                      className="flex items-center gap-1"
                    >
                      Amount {getSortIcon("amount")}
                    </button>
                  </div>
                </th>
                <th className="py-3.5 px-6 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800/60 text-sm">
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((item, index) => {
                  const isIncome = item.type === "income";

                  return (
                    <tr
                      key={item.id || index}
                      onClick={() => setSelectedTransaction(item)}
                      className="hover:bg-[#182035]/50 transition-colors group cursor-pointer"
                    >
                      {/* Date */}
                      <td className="py-4 px-6 text-gray-300 whitespace-nowrap">
                        {item.date || ""}
                      </td>

                      {/* Description */}
                      <td className="py-4 px-6 font-medium text-white">
                        {item.title || item.description}
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${getCategoryDotColor(item.category || item.title)}`}
                          ></span>
                          <span className="text-gray-300">
                            {item.category || "General"}
                          </span>
                        </div>
                      </td>

                      {/* Type Badge */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            isIncome
                              ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/50"
                              : "bg-rose-950/40 text-rose-400 border-rose-800/50"
                          }`}
                        >
                          {isIncome ? "Income" : "Expense"}
                        </span>
                      </td>

                      {/* Amount */}
                      <td
                        className={`py-4 px-6 font-semibold text-right whitespace-nowrap ${
                          isIncome ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {isIncome ? `+₹${item.amount}` : `-₹${item.amount}`}
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-6 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2 opacity-80 group-hover:opacity-100 transition">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit && onEdit(item);
                            }}
                            title="Edit"
                            className="p-1.5 bg-gray-800/80 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition cursor-pointer"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete && onDelete(item.id);
                            }}
                            title="Delete"
                            className="p-1.5 bg-gray-800/80 hover:bg-rose-900/60 rounded-lg text-gray-300 hover:text-rose-400 transition cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TransactionDetails
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </div>
  );
}
