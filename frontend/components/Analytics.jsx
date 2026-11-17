
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function Analytics({ transactions }) {
  const totalIncome = transactions.reduce(
    (total, item) =>
      item.type === "income" ? total + Number(item.amount) : total,
    0
  );

  const totalExpense = transactions.reduce(
    (total, item) =>
      item.type === "expense" ? total + Number(item.amount) : total,
    0
  );

  const pieData = [
    { name: "Income", value: totalIncome },
    { name: "Expenses", value: totalExpense },
  ];

  const COLORS = ["#a78bfa", "#f43f5e"];

  const barData = transactions.map((item) => ({
    name: item.title,
    amount: Number(item.amount),
    type: item.type,
  }));

  const formatAmount = (value) =>
    `₹${Number(value).toLocaleString("en-IN")}`;

  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* Income vs Expenses */}
      <div className="rounded-2xl border border-slate-800 bg-[#050b1c] p-5">
        <h2 className="text-base font-semibold text-white mb-5">
          Income vs Expenses
        </h2>

        {totalIncome === 0 && totalExpense === 0 ? (
          <p className="text-center text-slate-400 py-16">
            No data available yet
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={5}
              >
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => formatAmount(value)}
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />

              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ color: "#cbd5e1" }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Transaction Amounts */}
      <div className="rounded-2xl border border-slate-800 bg-[#050b1c] p-5">
        <h2 className="text-base font-semibold text-white mb-5">
          Transaction Overview
        </h2>

        {barData.length === 0 ? (
          <p className="text-center text-slate-400 py-16">
            No transactions available
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} margin={{ top: 10, right: 10, left: 10 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                stroke="#94a3b8"
                tick={{ fontSize: 11 }}
              />

              <YAxis
                stroke="#94a3b8"
                tickFormatter={(value) => `₹${value}`}
                tick={{ fontSize: 11 }}
              />

              <Tooltip
                formatter={(value) => formatAmount(value)}
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />

              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {barData.map((item, index) => (
                  <Cell
                    key={`${item.name}-${index}`}
                    fill={
                      item.type === "income" ? "#a78bfa" : "#f43f5e"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
