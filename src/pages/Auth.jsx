// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
// import { auth, googleProvider, facebookProvider } from "/firebaseConfig";
// import FBIcon from '/facebook.png'
// import GIcon from "/google.png";

// const Auth = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true); // Initialize with true to show spinner on load
//   const [authLoading, setAuthLoading] = useState(false); // Separate loading state for login/logout actions

//   // Monitor authentication state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//       } else {
//         setUser(null);
//       }
//       setLoading(false); // Stop spinner once auth state is resolved
//     });
//     return () => unsubscribe();
//   }, []);

//   // Handle Google Login
//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;
//       setUser(user);
//     } catch (error) {
//       console.error("Google login error: ", error.message);
//       alert("Login failed. Please try again.");
//     }
//   };

//   // Handle Facebook Login
//   const handleFacebookLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, facebookProvider);
//       const user = result.user;
//       setUser(user);
//     } catch (error) {
//       console.error("Facebook login error: ", error.message);
//       alert("Login failed. Please try again.");
//     }
//   };

//   // Handle Logout
//   const handleLogout = async () => {
//     if (window.confirm("Are you sure you want to log out?")) {
//       try {
//         await signOut(auth);
//         setUser(null);
//         navigate("/");
//       } catch (error) {
//         console.error("Logout error: ", error.message);
//         alert("Logout failed. Please try again.");
//       } finally {
//         setAuthLoading(false);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="spinner border-4 border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <main className="font-parkisans bg-gradient-to-br from-primary via-teal-50 to-secondary flex items-center justify-center min-h-screen">
//         {!user ? (
//           <div className="bg-white grid space-y-8 shadow rounded border p-8 w-full max-w-md mx-4 md:space-y-10">
//             <h2 className="text-2xl font-semibold text-darkBlue text-center mb-4 md:text-2xl lg:text-3xl">
//               Login
//             </h2>
//             <button
//               onClick={handleFacebookLogin}
//               className="flex items-center justify-center gap-4 w-full p-4 bg-blue-500 text-white rounded-md shadow-md border hover:bg-lightBlue hover:text-darkBlue transition text-sm xs:text-base md:text-lg"
//             >
//               <img src={FBIcon} alt="Facebook icon" className="w-6 md:w-8" />
//               {loading ? "Processing..." : "Continue with Facebook"}
//             </button>
//             <button
//               onClick={handleGoogleLogin}
//               className="flex items-center justify-center gap-4 w-full p-4 bg-white text-darkBlue border rounded-md shadow-md hover:bg-gray-100 transition text-sm xs:text-base md:text-lg"
//             >
//               <img src={GIcon} alt="Google icon" className="w-6 md:w-8" />
//               {loading ? "Processing..." : "Continue with Google"}
//             </button>
//           </div>
//         ) : (
//           <div id="user-info" className="text-center">
//             <h1 className="text-3xl font-semibold mt-8">Welcome</h1>
//             <div className="flex flex-col items-center mt-10">
//               <img
//                 id="user-photo"
//                 src={user.photoURL || "/default-avatar.png"}
//                 alt="User Photo"
//                 className="w-36 h-36 rounded-full bg-gray-100"
//               />
//               <h2 id="user-name" className="text-xl font-semibold mt-4">
//                 {user.displayName || "Guest"}
//               </h2>
//               <p id="user-email" className="text-gray-600 mt-2">
//                 {user.email}
//               </p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 mx-auto my-6 text-white px-6 py-2 rounded shadow transition-all"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </main>
//     </>
//   );
// };

// export default Auth;
