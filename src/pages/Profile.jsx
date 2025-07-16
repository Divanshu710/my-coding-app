import React, { useEffect, useState } from "react";
import { getUserData } from "../services/userService";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
export default function Profile() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const total = 1500000;

  useEffect(() => {
    if (!currentUser?.uid) return;

    getUserData(currentUser.uid)
      .then(data => setUser(data))
      .catch(err => setError(err.message));
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-400 flex items-center justify-center">
        <div className="text-3xl font-medium">
          Please <a href="/auth" className="text-purple-400 underline">login</a> to view your dashboard.
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="min-h-screen bg-gray-900 text-red-400 flex items-center justify-center p-6">
        <div className="text-3xl text-center p-8 bg-gray-800 rounded-xl font-semibold">
          {error}
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen bg-gray-900 text-gray-400 flex items-center justify-center">
        <div className="text-3xl font-medium">Loading user data...</div>
      </div>
    );

  const solvedTotal = (user.solvedCount?.[0] || 0) + (user.solvedCount?.[1] || 0) + (user.solvedCount?.[2] || 0);
  const topPercent = user.rank && total ? ((user.rank / total) * 100).toFixed(2) : "N/A";

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-900 text-gray-200 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-8">
          {/* Profile */}
          <div className="p-6 bg-gray-800 rounded-2xl border border-gray-700 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={user.avatar || "https://leetcode.com/static/images/avatar_default.png"}
                alt="avatar"
                className="w-20 h-20 rounded-full border-2 border-gray-600"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">{user.username}</h1>
                <p className="text-gray-400 text-lg">@{user.handle || "user"}</p>
              </div>
            </div>
            <div className="space-y-4 text-lg">
              <p className="flex gap-3 items-center">🏆 Rank {user.rank || "N/A"}</p>
              <p className="flex gap-3 items-center">📍 {user.location || "Not specified"}</p>
              <p className="flex gap-3 items-center">🎓 {user.education || "Not specified"}</p>
              <p className="flex gap-3 items-center">💻 {user.skills?.join(", ") || "Not specified"}</p>
            </div>
          </div>

          {/* Progress */}
          <Card title="Progress">
            <div className="text-lg space-y-4">
              <div>
                <p className="text-gray-400">Solved</p>
                <p className="text-3xl font-bold">{solvedTotal} / {user.totalProblems || "100"}</p>
              </div>
              <div>
                <p className="text-gray-400">Attempting</p>
                <p className="text-3xl font-bold">{user.attempting || "0"}</p>
              </div>
            </div>
          </Card>

          {/* Badges */}
          <Card title="Badges">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-yellow-900/30 flex items-center justify-center">
                <span className="text-yellow-400 text-3xl">🏅</span>
              </div>
              <div>
                <p className="text-lg font-medium">{user.recentBadge || "50 Days Badge"}</p>
                <p className="text-gray-400 text-sm">Most recent</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Contest Rating */}
            <Card title="Contest Rating">
              <p className="text-4xl font-bold mb-2">{user.rank || "1,480"}</p>
              <p className="text-gray-400 text-lg">Global: {total}</p>
              <p className="text-gray-400 text-lg">Top: {topPercent}%</p>
            </Card>

            {/* Solved Stats */}
            <Card title="Solved Stats">
              <div className="grid grid-cols-3 gap-4 text-center">
                <Stat label="Easy" value={user.solvedCount?.[0] || 0} color="text-green-400" />
                <Stat label="Medium" value={user.solvedCount?.[1] || 0} color="text-yellow-400" />
                <Stat label="Hard" value={user.solvedCount?.[2] || 0} color="text-red-400" />
              </div>
            </Card>

            {/* Activity */}
            <Card title="Activity">
              <p className="text-lg">Contests Attended: <span className="font-bold text-xl">{user.contestsAttended || "3"}</span></p>
              <p className="text-lg">Last Active: <span className="text-xl">{user.lastActive || "Aug 2024"}</span></p>
            </Card>
          </div>

          {/* Recent Problems */}
          <Card title="Recent Solved Problems">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.solvedQuestions?.length > 0 ? (
                user.solvedQuestions.slice(0, 9).map((q, idx) => (
                  <div key={idx} className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors text-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">#{idx + 1}</span>
                      <span className="font-medium">{q}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 py-8 text-center text-gray-500">
                  No problems solved yet
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
}

function Card({ title, children }) {
  return (
    <div className="p-6 bg-gray-800 rounded-2xl border border-gray-700">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="text-center">
      <p className="text-gray-400 text-lg">{label}</p>
      <p className={`text-4xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
