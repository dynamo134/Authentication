"use client"; // Not a standard JavaScript syntax, assuming it's a comment or placeholder
import { isLogin, logOut } from "@/utils/auth";  // Importing authentication functions from utils/auth.js
import { useRouter } from "next/navigation";  // Importing useRouter hook from Next.js for navigation
import { useEffect, useState } from "react";  // Importing React hooks
import { toast } from "react-toastify";  // Importing toast notifications from react-toastify library

export default function Home() {
  const router = useRouter();  // Initializing useRouter hook for navigation
  const [user, setUser] = useState({ name: "", email: "" });  // State for user data (name and email)
  const [pageReady, setPageReady] = useState(false);  // State to manage page readiness

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();  // Checking if user is logged in

      if (loggedIn.auth) {  // If user is authenticated
        setUser(loggedIn.data);  // Setting user data from authentication result
        setPageReady(true);  // Setting pageReady to true
      } else {
        router.push("/login");  // Redirecting to login page if user is not logged in
      }
    };

    authenticate();  // Calling authenticate function on component mount
  }, []);  // Empty dependency array ensures useEffect runs only once on mount

  const handleLogOut = () => {
    logOut();  // Logging out user (clearing authentication)
    toast.success("Logout Successfully");  // Showing success toast notification for logout
    router.push("/login");  // Redirecting to login page after logout
  };

  return (
    <main
      className={`${
        pageReady ? "block" : "hidden"  // Conditionally rendering main based on page readiness
      } w-full h-screen grid place-items-center`}
    >
      <div className="p-4 bg-accentDark text-white w-[400px] h-[250px] text-center space-y-4">
        <p>Hi {user?.name}, Welcome!</p>  
        <p>{user?.email}</p>  
        <button
          className="bg-accent px-4 py-2 text-white"
          onClick={handleLogOut}  // Handling click event for logout button
        >
          Logout
        </button>
      </div>
    </main>
  );
}
