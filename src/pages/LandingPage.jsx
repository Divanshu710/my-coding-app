import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-12 max-w-2xl text-center border border-purple-500/30 hover:border-purple-500/60 transition duration-500">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Welcome to DSA-Platform 🚀
        </h1>
        <h2 className="text-xl text-gray-300 mb-6 italic">
          Your personal playground to master data structures & algorithms
        </h2>
        <div className="w-20 h-1 bg-purple-600 mx-auto mb-8 rounded"></div>

        <p className="text-gray-400 mb-10 text-lg leading-relaxed">
          Solve handpicked problems, practice coding like on LeetCode, 
          and accelerate your interview prep journey — all in one place.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            to="/auth"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition"
          >
            Get Started
          </Link>
          
        </div>
      </div>
    </div>
  );
}
