
import { Receipt, CircleAlert, ArrowRight } from "lucide-react";

export default function UpcomingBills({ bills }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatAmount = (amount) =>
    `₹${Number(amount).toLocaleString("en-IN")}`;

  const getBillStatus = (dueDate) => {
    const due = new Date(`${dueDate}T00:00:00`);
    const difference = Math.ceil(
      (due - today) / (1000 * 60 * 60 * 24)
    );

    if (difference < 0) {
      return {
        label: `${Math.abs(difference)} days overdue`,
        color: "text-red-400",
        icon: "overdue",
      };
    }

    if (difference === 0) {
      return {
        label: "Due today",
        color: "text-yellow-400",
        icon: "today",
      };
    }

    return {
      label: `Due in ${difference} days`,
      color: "text-slate-400",
      icon: "upcoming",
    };
  };

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-[#050b1c] p-5">
      {/* Heading */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Receipt size={17} className="text-slate-400" />

          <h2 className="font-semibold text-white">
            Upcoming Bills
          </h2>

          <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">
            {bills.length}
          </span>
        </div>

        <button className="flex items-center gap-1 rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:bg-slate-800">
          View all <ArrowRight size={13} />
        </button>
      </div>

      {/* Bills */}
      <div className="flex flex-col gap-3">
        {bills.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">
            No upcoming bills
          </p>
        ) : (
          bills.map((bill) => {
            const status = getBillStatus(bill.dueDate);

            return (
              <div
                key={bill.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-slate-900/70 p-3 transition hover:bg-slate-800/80"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="rounded-lg bg-red-500/10 p-2">
                    <CircleAlert
                      size={15}
                      className="text-red-400"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium text-white">
                      {bill.title}
                    </h3>

                    <p className={`text-xs ${status.color}`}>
                      {status.label}
                    </p>
                  </div>
                </div>

                <p className="shrink-0 text-sm font-semibold text-white">
                  {formatAmount(bill.amount)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
