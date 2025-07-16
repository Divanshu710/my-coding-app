import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaUser } from "react-icons/fa";
import { logout } from "../services/auth";


export default function Header() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const displayName = currentUser?.email?.split("@")[0];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 text-white border-b border-gray-700">
      <Link to="/dashboard" className="text-xl font-bold">
        DSA-Platform
      </Link>

      <div className="text-sm flex items-center gap-4">
        {currentUser ? (
          <>
            <Link to="/profile" className="flex items-center gap-2 hover:text-purple-400 transition">
  <FaUser className="text-purple-400" />
  <span className="font-semibold text-white">{displayName}</span>
</Link>

            <button
              onClick={handleLogout}
              
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition text-xs"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth" className="text-purple-400 hover:underline">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
