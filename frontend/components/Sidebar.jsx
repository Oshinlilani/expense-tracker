import {
  LayoutDashboard,
  ArrowLeftRight,
  Receipt,
  ChartPie,
  Target,
  ChevronLeft,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="flex flex-col bg-[#030a1c] border-r border-slate-800 w-full h-screen p-2">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-slate-800 p-3">
        <span className="bg-blue-500 rounded-lg p-2">
          <LayoutDashboard size={20} className="text-white" />
        </span>
        <h2 className="font-bold text-white text-lg">Expense Tracker</h2>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-3 mt-6">
        {/* Overview - Active */}
        <div className="flex items-center gap-3 bg-blue-600 shadow-lg shadow-blue-900/20 text-white rounded-lg p-3 cursor-pointer">
          <LayoutDashboard size={20} />
          <span>Overview</span>
        </div>

        {/* Transactions */}
        <div className="flex items-center gap-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg p-3 cursor-pointer transition">
          <ArrowLeftRight size={20} />
          <span>Transactions</span>
        </div>

        {/* Bills */}
        <div className="flex items-center gap-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg p-3 cursor-pointer transition">
          <Receipt size={20} />
          <span>Bills</span>
        </div>

        {/* Insights */}
        <div className="flex items-center gap-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg p-3 cursor-pointer transition">
          <ChartPie size={20} />
          <span>Insights</span>
        </div>

        {/* Goals */}
        <div className="flex items-center gap-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg p-3 cursor-pointer transition">
          <Target size={20} />
          <span>Goals</span>
        </div>
      </nav>
      <div className="mt-auto border-t border-slate-800 p-3">
        <button className="flex items-center gap-3 text-slate-400 hover:text-white transition">
          <ChevronLeft size={18} />
          <span className="text-sm">Collapse</span>
        </button>
      </div>
    </div>
  );
}
