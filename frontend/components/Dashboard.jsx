import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "motion/react";
import AnimatedAmount from "./AnimatedAmount";

export default function Dashboard({ transactions }) {
  const totalIncome = transactions.reduce((total, item) => {
    return item.type === "income" ? total + Number(item.amount) : total;
  }, 0);

  const totalExpense = transactions.reduce((total, item) => {
    return item.type === "expense" ? total + Number(item.amount) : total;
  }, 0);

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

  // Animation for cards
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="w-full flex flex-col gap-6 text-white">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-left"
      >
        <h1 className="text-2xl font-bold">Welcome back!</h1>

        <p className="text-gray-400 mt-1">Here's your financial overview.</p>
      </motion.div>

      {/* Summary Cards */}
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
                y: -6,
                scale: 1.02,
              }}
              transition={{ duration: 0.2 }}
              className="bg-slate-900 border border-gray-700 rounded-xl p-5 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <p className="text-gray-400">{card.title}</p>

                <Icon size={22} className={card.color} />
              </div>

              <h2 className="text-2xl font-bold mt-4">
                <AnimatedAmount amount={card.amount} />
              </h2>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
