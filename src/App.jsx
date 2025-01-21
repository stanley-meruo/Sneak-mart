import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { auth } from "/firebaseConfig";
import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import Logo from "/logo.png";

const App = () => {
  // const PrivateRoute = ({ children }) => {
  //   const user = auth.currentUser;
  //   return user ? children : <Navigate to="/" />;
  // };

  function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setIsAuthenticated(!!user);
      });
      return () => unsubscribe();
    }, []);

    if (isAuthenticated === null) {
      return (
        <div className="absolute inset-0 bg-black bg-opacity-50 grid z-50">
          <div className="m-auto flex items-center gap-6">
            <div className="flex items-center gap-2 text-lg font-bold">
            <img src={Logo} alt="" className="w-8"/>
            SNEAK-MART
            </div>
            <FiLoader className="w-12 h-12 animate-spin mx-auto" />
          </div>
        </div>
      );
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
