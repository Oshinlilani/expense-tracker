
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

export default function Dashboard({ transactions }) {

  const totalIncome = transactions.reduce((total, item) => {
    return item.type === "income" ? total + Number(item.amount) : total;
  }, 0);

  const totalExpense = transactions.reduce((total, item) => {
    return item.type === "expense" ? total + Number(item.amount) : total;
  }, 0);

  const balance = totalIncome - totalExpense;

  const cards = [
    {
      title: "Total Balance",
      amount: balance,
      icon: Wallet,
      color: "text-purple-400",
    },
    {
      title: "Total Income",
      amount: totalIncome,
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      title: "Total Expenses",
      amount: totalExpense,
      icon: TrendingDown,
      color: "text-red-400",
    },
  ];

  return (
    <div  className="w-full flex flex-col gap-6 text-white">

      {/* Welcome */}
      <div className="text-left">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <p className="text-gray-400 mt-1">
          Here's your financial overview.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-slate-900 border border-gray-700 rounded-xl p-5"
            >
              <div className="flex justify-between items-center">
                <p className="text-gray-400">{card.title}</p>
                <Icon size={22} className={card.color} />
              </div>

              <h2 className="text-2xl font-bold mt-4">
                ₹{card.amount.toLocaleString("en-IN")}
              </h2>
            </div>
          );
        })}
      </div>

    </div>
  );
}
