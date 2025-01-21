import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "/firebaseConfig";
import { useNavigate } from "react-router-dom";
import FBicon from "/facebook.png"
import GoogleIcon from "/google.png"


const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

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

  return (
    <main className="bg-gradient-to-br from-primary via-teal-50 to-secondary flex items-center justify-center min-h-screen font-parkisans">
      <div className="bg-white grid space-y-8 shadow rounded border px-8 py-10 w-full max-w-md mx-4">
        <h2 className="text-2xl font-semibold text-darkBlue text-center mb-4 lg:text-3xl">
          Login
        </h2>
        <button
          onClick={() => handleLogin(facebookProvider)}
          className="flex items-center justify-center gap-2 w-full p-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-lightBlue hover:text-darkBlue transition sm:gap-4 lg:text-lg"
        >
          <img src={FBicon} alt="Facebook icon" className="w-6 lg:w-8" />
          Continue with Facebook
        </button>
        <button
          onClick={() => handleLogin(googleProvider)}
          className="flex items-center justify-center gap-2 w-full p-4 bg-white text-darkBlue border rounded-md shadow-md hover:bg-gray-100 transition sm:gap-4 lg:text-lg"
        >
          <img src={GoogleIcon} alt="Google icon" className="w-6 lg:w-8" />
          Continue with Google
        </button>
      </div>
    </main>
  );
};

export default Login;
