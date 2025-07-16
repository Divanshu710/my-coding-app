import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Playground from "./pages/Playground";
import ProblemsList from "./pages/ProblemsList";
import ProblemPage from "./pages/ProblemPage";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import AddProblem from "./pages/AddProblem";
import CreateTest from "./pages/CreateTest";
import TestPage from "./pages/TestPage";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/problems"
        element={
          <ProtectedRoute>
            <ProblemsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addproblem"
        element={
          <ProtectedRoute>
            <AddProblem />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-custom-test"
        element={
          <ProtectedRoute>
            <CreateTest />
          </ProtectedRoute>
        }
      />
      <Route path="/test/:testId" element={<TestPage />} />

      <Route
  path="/problem/:id"
  element={
    <ProtectedRoute>
      <ProblemPage />
    </ProtectedRoute>
  }
/>
      <Route
        path="/playground"
        element={
          <ProtectedRoute>
            <Playground />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
