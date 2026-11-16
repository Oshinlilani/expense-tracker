
import { Search, Bell, UserRound } from "lucide-react";
import { useRef, useState } from "react";

export default function Header({ onSearch }) {
  

  const timer = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchValue(value)
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      onSearch(value);
    }, 500);
  }
  return (
    <header className="w-full flex items-center justify-between bg-slate-900 border border-gray-700 rounded-xl p-4">

      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-slate-800 rounded-lg px-3 py-2 w-80">
        <Search size={20} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search transactions..."
          onChange={handleSearch}
          className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <button className="relative text-gray-300 hover:text-white">
          <Bell size={22} />

          <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
        </button>

        {/* User Profile */}
        {/* <div className="flex items-center gap-3">
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
        </div> */}

      </div>
    </header>
  );
}
