import {
  LayoutDashboard,
  ArrowLeftRight,
  Receipt,
  ChartPie,
  Target,
  ChevronLeft,
} from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
    { id: "bills", label: "Bills", icon: Receipt },
    { id: "insights", label: "Insights", icon: ChartPie },
    { id: "goals", label: "Goals", icon: Target },
  ];

  return (
    <div className="flex flex-col w-full h-screen p-2 bg-[#0b0e20]/80 bg-linear-to-b from-[#7c6ff6]/20 via-[#3b3486]/15 to-[#0b0e20]/90 backdrop-blur-xl border-r border-[#7c6ff6]/25">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-indigo-900/70 p-3">
        <span className="bg-[#7c6ff6] rounded-lg p-2 shadow-md shadow-[#7c6ff6]/30">
          <LayoutDashboard size={20} className="text-white" />
        </span>
        <h2 className="font-bold text-white text-lg">Expense Tracker</h2>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-3 mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 rounded-lg p-3 cursor-pointer transition ${
                isActive
                  ? "bg-[#7c6ff6] shadow-lg shadow-[#7c6ff6]/25 text-white font-medium"
                  : "text-slate-400 hover:bg-[#7c6ff6]/10 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-indigo-950/60 p-3">
        <button className="flex items-center gap-3 text-slate-400 hover:text-white transition">
          <ChevronLeft size={18} />
          <span className="text-sm">Collapse</span>
        </button>
      </div>
    </div>
  );
}