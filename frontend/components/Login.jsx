import { useState } from "react";
import { Wallet, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function Login({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { name, email, password } = formData;
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return false;
    }

    if (!isLogin && !name.trim()) {
      setError("Please enter your name.");
      return false;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password } = formData;

    if (!validateForm()) return;

    const users = JSON.parse(localStorage.getItem("expenseUsers") || "[]");

    if (isLogin) {
      const existingUser = users.find(
        (user) =>
          user.email.toLowerCase() === email.trim().toLowerCase() &&
          user.password === password,
      );

      if (!existingUser) {
        setError("Invalid email or password.");
        return;
      }

      onAuthSuccess(existingUser);
    } else {
      const userExists = users.some(
        (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
      );

      if (userExists) {
        setError("An account with this email already exists.");
        return;
      }

      const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      };

      localStorage.setItem("expenseUsers", JSON.stringify([...users, newUser]));

      onAuthSuccess(newUser);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1020] p-5">
      <div className="w-full max-w-md rounded-2xl border border-purple-500/20 bg-[#121829] p-8 shadow-2xl shadow-purple-950/30">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/15">
            <Wallet size={30} className="text-purple-400" />
          </div>

          <h1 className="text-2xl font-bold text-white">ExpenseFlow</h1>

          <p className="mt-2 text-sm text-slate-400">
            {isLogin
              ? "Welcome back! Login to your account."
              : "Create an account to manage your expenses."}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 rounded-xl bg-[#0f1020] p-1">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
            className={`rounded-lg py-2.5 text-sm font-medium transition ${
              isLogin
                ? "bg-purple-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
            className={`rounded-lg py-2.5 text-sm font-medium transition ${
              !isLogin
                ? "bg-purple-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Full Name
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-[#0f1020] px-4">
                <User size={18} className="text-slate-400" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full bg-transparent py-3 text-sm text-white outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-[#0f1020] px-4">
              <Mail size={18} className="text-slate-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-transparent py-3 text-sm text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-[#0f1020] px-4">
              <Lock size={18} className="text-slate-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-transparent py-3 text-sm text-white outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-500"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="ml-1 font-medium text-purple-400 hover:text-purple-300"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
