import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { auth } from "/firebaseConfig";

const App = () => {
  const PrivateRoute = ({ children }) => {
    const user = auth.currentUser;
    return user ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" 
          element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
