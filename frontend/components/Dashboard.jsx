import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Bell,
  UserRound,
} from "lucide-react";
import { motion } from "motion/react";
import AnimatedAmount from "./AnimatedAmount";
import { useMemo } from "react";

export default function Dashboard({
  transactions,
  setShowTransactionForm,
  handleLogout,
  currentUser,
}) {
  const { totalIncome, totalExpense } = useMemo(() => {
    return {
      totalExpense: transactions.reduce((total, item) => {
        return item.type === "expense" ? total + Number(item.amount) : total;
      }, 0),

      totalIncome: transactions.reduce((total, item) => {
        return item.type === "income" ? total + Number(item.amount) : total;
      }, 0),
    };
  }, [transactions]);

  const balance = totalIncome - totalExpense;

  function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  }

  const cards = [
    {
      title: "Total Balance",
      amount: balance,
      icon: Wallet,
      color: "text-purple-400",
      badge: "+60.4% vs last month",
      badgeColor: "text-emerald-400",
    },
    {
      title: "Total Income",
      amount: totalIncome,
      icon: TrendingUp,
      color: "text-green-400",
      badge: "+16.8% vs last month",
      badgeColor: "text-emerald-400",
    },
    {
      title: "Total Expenses",
      amount: totalExpense,
      icon: TrendingDown,
      color: "text-red-400",
      badge: "-33.6% vs last month",
      badgeColor: "text-red-400",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="w-full flex flex-col gap-6 text-white p-6 md:p-2">
      <div className="flex justify-between">
        {/* Welcome & Greeting Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-left mt-2"
        >
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span>🌤️</span> {getGreeting()},{" "}
            <span className="text-purple-400">{currentUser.name}!</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Here's your financial summary.
          </p>
        </motion.div>

        <div className="flex items-center gap-6">
          {/* Notification */}
          {/* <motion.button
            whileHover={{ scale: 1.09 }}
            className="relative text-gray-300 hover:text-white"
          >
            <Bell size={22} />

            <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
          </motion.button> */}

          {/* User Profile */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-sm text-slate-300">
                Hi, {currentUser.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-purple-500/30 px-4 py-2 text-sm text-purple-300 hover:bg-purple-500/10"
              >
                Logout
              </button>

              {/* <div className="bg-purple-600 rounded-full p-2">
                <UserRound size={22} className="text-white" />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 w-full"
      >
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              variants={cardVariants}
              whileHover={{
                y: -4,
              }}
              transition={{ duration: 0.2 }}
              className="bg-[#121829]/90 border border-gray-800 rounded-xl p-5 cursor-default shadow-xl backdrop-blur-md"
            >
              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">{card.title}</p>
                <span className="p-2 bg-gray-800/60 rounded-lg">
                  <Icon size={18} className={card.color} />
                </span>
              </div>

              <h2 className="text-2xl font-bold mt-3 text-white">
                <AnimatedAmount amount={card.amount} />
              </h2>

              {/* <div className="mt-3 flex items-center gap-1.5 text-xs">
                <span className={`font-medium ${card.badgeColor}`}>{card.badge.split(" ")[0]}</span>
                <span className="text-gray-400">{card.badge.split(" ").slice(1).join(" ")}</span>
              </div> */}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
