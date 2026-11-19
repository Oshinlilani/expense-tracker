import { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function BalanceTrend({ transactions }) {
  const chartData = useMemo(() => {
    const monthlyData = {};

    // Group transactions by month
    transactions.forEach((item) => {
      if (!item.date) return;

      const month = item.date.slice(0, 7);

      if (!/^\d{4}-\d{2}$/.test(month)) return;

      if (!monthlyData[month]) {
        monthlyData[month] = {
          month,
          income: 0,
          expenses: 0,
        };
      }

      if (item.type === "income") {
        monthlyData[month].income += Number(item.amount);
      } else if (item.type === "expense") {
        monthlyData[month].expenses += Number(item.amount);
      }
    });

    // Sort months
    const sortedMonths = Object.values(monthlyData).sort((a, b) =>
      a.month.localeCompare(b.month),
    );

    // Calculate cumulative balance
    let runningBalance = 0;

    const result = sortedMonths.map((item) => {
      runningBalance += item.income - item.expenses;

      const date = new Date(`${item.month}-01T00:00:00`);

      return {
        ...item,
        balance: runningBalance,
        monthLabel: date.toLocaleDateString("en-IN", {
          month: "short",
          year: "numeric",
        }),
      };
    });

    return result;
  }, [transactions]);

  const formatAmount = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-[#050b1c] p-4 sm:p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-white">Balance Trend</h2>

        <p className="mt-1 text-xs text-slate-400">
          Cumulative balance over time
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="flex h-75 items-center justify-center">
          <p className="text-sm text-slate-400">
            Add dated transactions to view your balance trend.
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#263047" strokeDasharray="3 3" vertical />

            <XAxis
              dataKey="monthLabel"
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                value === 0 ? "₹0k" : `₹${value / 1000}k`
              }
            />

            <Tooltip
              formatter={(value) => formatAmount(value)}
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#fff",
              }}
              labelStyle={{ color: "#cbd5e1" }}
            />

            <Legend
              verticalAlign="bottom"
              iconType="plainline"
              wrapperStyle={{
                paddingTop: "12px",
                fontSize: "12px",
              }}
            />

            {/* Purple Balance Area */}
            <Area
              type="monotone"
              dataKey="balance"
              name="Balance"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="url(#balanceGradient)"
              dot={false}
              activeDot={{ r: 4 }}
            />

            {/* Dashed Green Income Area */}
            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 4"
              fill="url(#incomeGradient)"
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
