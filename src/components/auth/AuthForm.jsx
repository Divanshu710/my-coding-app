import { useState } from "react";
import { login, signup } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState(""); // <-- NEW
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // clear old error
    try {
      let res;
      if (isLogin) {
        res = await login(email, password);
      } else {
        res = await signup(email, password);
      }
      console.log("Auth success:", res);
      navigate("/dashboard");
    } catch (error) {
      console.log("Auth error:", error.message);
      setErrorMsg("Invalid credentials. Please try again."); // <-- SET
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-96">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          DSA-PLATFORM
        </h1>
        <h2 className="text-xl mb-4 text-center text-gray-300">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg(""); // clear error on toggle
            }}
            className="text-purple-400 hover:underline text-sm mt-2"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </form>
        {errorMsg && (
          <div className="mt-4 text-center text-red-500 font-semibold">
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
}
