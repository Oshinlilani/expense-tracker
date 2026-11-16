import {
  LayoutDashboard,
  ArrowLeftRight,
  Receipt,
  ChartPie,
  Target,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="flex flex-col bg-[#8b5cf6] rounded-xl w-full h-full min-h-screen p-3">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-gray-700 p-3">
        <span className="border-2 font-bold px-2 py-1 rounded">₹</span>

        <h2 className="font-bold text-white">Expense Tracker</h2>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-3 mt-5">
        {/* Overview - Active */}
        <div className="flex items-center gap-3 bg-purple-600 text-white rounded-lg p-3 cursor-pointer">
          <LayoutDashboard size={20} />
          <span>Overview</span>
        </div>

        {/* Transactions */}
        <div className="flex items-center gap-3 text-gray-200 hover:bg-purple-600 hover:text-white rounded-lg p-3 cursor-pointer transition">
          <ArrowLeftRight size={20} />
          <span>Transactions</span>
        </div>

        {/* Bills */}
        <div className="flex items-center gap-3 text-gray-200 hover:bg-purple-600 hover:text-white rounded-lg p-3 cursor-pointer transition">
          <Receipt size={20} />
          <span>Bills</span>
        </div>

        {/* Insights */}
        {/* <div className="flex items-center gap-3 text-gray-200 hover:bg-purple-600 hover:text-white rounded-lg p-3 cursor-pointer transition">
          <ChartPie size={20} />
          <span>Insights</span>
        </div> */}

        {/* Goals */}
        {/* <div className="flex items-center gap-3 text-gray-200 hover:bg-purple-600 hover:text-white rounded-lg p-3 cursor-pointer transition">
          <Target size={20} />
          <span>Goals</span>
        </div> */}
      </nav>
    </div>
  );
}
