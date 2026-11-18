import { useState } from "react";
import { 
  Search, 
  Plus, 
  Pencil, 
  Trash2, 
  ArrowUpDown 
} from "lucide-react";

export default function Transactions({ 
  transactions = [], 
  onAdd, 
  onEdit, 
  onDelete 
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Filter and search logic (handles both item.title and item.description)
  const filteredTransactions = transactions.filter((item) => {
    const label = item.title || item.description || "";
    const matchesSearch = label
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    if (filterType === "all") return matchesSearch;
    return matchesSearch && item.type === filterType;
  });

  // Helper function for category dot colors
  const getCategoryDotColor = (category) => {
    switch (category?.toLowerCase()) {
      case "health": return "bg-teal-400";
      case "education": return "bg-cyan-400";
      case "food & dining": return "bg-amber-400";
      case "entertainment": return "bg-pink-400";
      case "investment": return "bg-purple-400";
      case "shopping": return "bg-orange-400";
      case "transport": return "bg-blue-400";
      case "freelance": return "bg-indigo-400";
      case "utilities": return "bg-teal-400";
      case "housing": return "bg-rose-400";
      case "salary": return "bg-purple-400";
      default: return "bg-slate-400";
    }
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

        <button 
          onClick={onAdd}
          className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-purple-600/20 transition cursor-pointer self-start md:self-auto"
        >
          <Plus size={16} /> Add Transaction
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
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
                  Date <ArrowUpDown size={13} />
                </th>
                <th className="py-3.5 px-6">Description</th>
                <th className="py-3.5 px-6 cursor-pointer hover:text-white transition">
                  <div className="flex items-center gap-1.5">
                    Category <ArrowUpDown size={13} />
                  </div>
                </th>
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6 cursor-pointer hover:text-white transition text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    Amount <ArrowUpDown size={13} />
                  </div>
                </th>
                <th className="py-3.5 px-6 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800/60 text-sm">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((item, index) => {
                  const isIncome = item.type === "income";

                  return (
                    <tr 
                      key={item.id || index} 
                      className="hover:bg-[#182035]/50 transition-colors group"
                    >
                      {/* Date */}
                      <td className="py-4 px-6 text-gray-300 whitespace-nowrap">
                        {item.date || "Mar 28, 2025"}
                      </td>

                      {/* Description */}
                      <td className="py-4 px-6 font-medium text-white">
                        {item.title || item.description}
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${getCategoryDotColor(item.category || item.title)}`}></span>
                          <span className="text-gray-300">{item.category || "General"}</span>
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
                            onClick={() => onEdit && onEdit(item)}
                            title="Edit"
                            className="p-1.5 bg-gray-800/80 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition cursor-pointer"
                          >
                            <Pencil size={14} />
                          </button>
                          <button 
                            onClick={() => onDelete && onDelete(item.id)}
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
    </div>
  );
}