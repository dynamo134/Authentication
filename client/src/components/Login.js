"use client";  

import { baseURL } from "@/utils/constant"; 
import Link from "next/link";  // Importing Link from Next.js for client-side navigation
import { useRouter } from "next/navigation";  // Importing useRouter hook from Next.js for navigation
import React, { useState, useEffect } from "react";  
import { toast } from "react-toastify";  // Importing toast notifications from react-toastify library
import axios from "axios";  // Importing axios for making HTTP requests
import { isLogin, setAuthentication } from "@/utils/auth";  // Importing authentication functions from utils/auth.js

const Login = () => {
  const [email, setEmail] = useState("");  // State for email input
  const [password, setPassword] = useState("");  // State for password input
  const [pageReady, setPageReady] = useState(false);  // State to manage page readiness

  const router = useRouter();  // Initializing useRouter hook for navigation

  useEffect(() => {
    const authenticate = async () => {
      if (await isLogin()) {  // Checking if user is already logged in
        router.push("/");  // Redirecting to homepage if logged in
      } else {
        setPageReady(true);  // Setting pageReady to true if user is not logged in
      }
    };

    authenticate();  // Calling authenticate function on component mount
  }, []);  // Empty dependency array ensures useEffect runs only once on mount

  const handleSubmit = (e) => {
    e.preventDefault();  // Preventing default form submission behavior

    const payload = {
      email,
      password,
    };

    axios
      .post(`${baseURL}/login`, payload)  // Making POST request to login endpoint with payload
      .then((res) => {
        console.log(res.data);  // Logging response data to console

        setAuthentication(res.data.token);  // Setting authentication token in local storage
        toast.success("Login Successful");  // Showing success toast notification
        router.push("/");  // Redirecting to homepage after successful login
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);  // Showing error toast notification if login fails
      });
  };

  return (
    <div className={`${pageReady ? "block" : "hidden"} grid grid-cols-[1fr,30%]`}>
      {/* Left side: Login form */}
      <div className="h-screen grid place-items-center bg-gray-100">
        <div className="shadow-lg p-8 rounded-lg border-t-4 border-accent bg-white max-w-lg w-full">
          <h1 className="text-accent font-bold text-4xl mb-6">
            Login
          </h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input__style p-4 border border-gray-300 rounded-md"
              type="email"
              placeholder="Email"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input__style p-4 border border-gray-300 rounded-md"
              type="password"
              placeholder="Password"
              required
            />

            <button className="uppercase bg-accent hover:bg-accentDark px-6 py-3 text-white rounded-md mt-4">
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Right side: Signup section */}
      <div className="bg-accent h-screen grid place-items-center">
        <div className="text-center w-full text-white space-y-8">
          <h2 className="font-bold text-4xl">Hello Friend!</h2>
          <div className="text-[#eeeeee] w-fit mx-auto">
            <p>Enter your personal details</p>
            <p>and start your journey with us</p>

            <Link href="/signup">  {/* Link to signup page */}
              <button className="uppercase px-4 py-2 w-[100%] rounded-full border-2 mt-8">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
