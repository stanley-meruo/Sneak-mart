import React, { useState } from "react";
import { auth } from "/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    setLoading(true);
    setLogoutMessage("Logging out");

    // Simulate a delay for logging out
    setTimeout(async () => {
      await auth.signOut();
      setLoading(false);
      navigate("/");
    }, 3000); // Adjust the timeout as needed (2 seconds in this case)
  };

  return (
    <main className="bg-gradient-to-br from-primary via-teal-50 to-secondary flex items-center justify-center min-h-screen relative">
      {/* Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 grid z-50">
          <div className="text-center text-white m-auto">
            <FiLoader className="w-24 h-24 animate-spin mb-4"/>
            <p className="text-lg">{logoutMessage}</p>
          </div>
        </div>
      )}

      {/* Dashboard Content */}
      <div className="text-center z-10">
        <h1 className="text-3xl font-semibold">Welcome</h1>
        <div className="flex flex-col items-center mt-10">
          <img
            src={user?.photoURL || "/placeholder.png"}
            alt="User Avatar"
            className="w-36 h-36 rounded-full bg-gray-100"
          />
          <h2 className="text-xl font-semibold mt-4">{user?.displayName}</h2>
          <p className="text-gray-600 mt-2">{user?.email}</p>
        </div>
        <div className="grid">
          <button
            onClick={handleLogout}
            className="bg-red-500 mx-auto my-6 text-white px-6 py-2 rounded shadow transition-all"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-t-4 border-white rounded-full animate-spin"></div> // Spinner loader
            ) : (
              "Logout"
            )}
          </button>
          <div className="mx-auto flex justify-between items-center gap-6">
            <a href="/">
              <button className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-white hover:text-darkBlue transition-all">
                Go To Home
              </button>
            </a>
            <a href="/cart">
              <button className="bg-primary text-white px-6 py-2 rounded shadow hover:bg-white hover:text-darkBlue transition-all">
                View Cart
              </button>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
