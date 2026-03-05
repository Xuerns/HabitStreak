import { useState } from "react";
import { Link } from "react-router-dom";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: { name?: string; gmail: string; password: string }) => void;
  isLoading: boolean;
}

export default function AuthForm({ type, onSubmit, isLoading }: AuthFormProps) {
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");

  const isRegister = type === "register";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      onSubmit({ name, gmail, password });
    } else {
      onSubmit({ gmail, password });
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center absolute left-3 top-2">
        <span className={isRegister ? "text-black" : "text-white"}>Habit</span>
        <span className="text-amber-600">Streak</span>
      </h1>
      <form
        className="bg-white flex flex-col shadow-gray-500 shadow-sm rounded p-5 w-90 gap-5"
        onSubmit={handleSubmit}
      >
        <div>
          <h4 className="text-center text-2xl font-semibold">
            {isRegister ? "Create Account" : "Welcome back"}
          </h4>
          <p className="text-xs text-center text-gray-400">
            {isRegister
              ? "Start building your habits today"
              : "Let's make every second in your day better"}
          </p>
        </div>
        <div className="flex flex-col gap-3.5">
          {isRegister && (
            <div className="flex flex-col">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-sm bg-slate-100 border-slate-200 border rounded focus:outline-none focus:border-amber-600 focus:border-2 py-2 px-2"
                placeholder="Enter your name...."
              />
            </div>
          )}
          <div className="flex flex-col">
            <label>Gmail</label>
            <input
              type="email"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              className="text-sm bg-slate-100 border-slate-200 border rounded focus:outline-none focus:border-amber-600 focus:border-2 py-2 px-2"
              placeholder="Enter your gmail...."
            />
          </div>
          <div className="flex flex-col">
            {!isRegister && (
              <Link
                to="/auth/forgot"
                className="text-[10px] text-end hover:text-blue-600"
              >
                Forgot Password?
              </Link>
            )}
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-sm bg-slate-100 border-slate-200 border rounded focus:outline-none focus:border-amber-600 focus:border-2 py-2 px-2"
              placeholder="Enter your password...."
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-amber-600 text-white font-bold rounded p-2 hover:bg-amber-700 disabled:opacity-50"
        >
          {isLoading ? "Loading..." : isRegister ? "Register" : "Login"}
        </button>
        <h6 className="justify-center text-xs flex gap-1">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <Link
            to={isRegister ? "/auth/login" : "/auth/register"}
            className="underline hover:text-blue-600"
          >
            {isRegister ? "Login" : "Register"}
          </Link>
        </h6>
      </form>
    </div>
  );
}
