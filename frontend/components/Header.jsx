import { motion } from "motion/react";
import { Bell, UserRound } from "lucide-react";
import { useRef, useState } from "react";

export default function Header({ onSearch }) {
  const timer = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      onSearch(value);
    }, 500);
  };
  return (
    <header className="w-full flex items-end justify-end bg-[#111827] border border-slate-800 rounded-2xl p-4">

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <motion.button
          whileHover={{ scale: 1.09 }}
          className="relative text-gray-300 hover:text-white"
        >
          <Bell size={22} />

          <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
        </motion.button>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 rounded-full p-2">
            <UserRound size={22} className="text-white" />
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm">
              Oshin
            </h3>

            <p className="text-gray-400 text-xs">
              User
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
