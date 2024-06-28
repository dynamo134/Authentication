"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa6";
import { baseURL } from "../utils/constant";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { isLogin } from "@/utils/auth";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pageReady, setPageReady] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      if (await isLogin()) {
        router.push("/");
      } else {
        setPageReady(true);
      }
    };
    authenticate();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      password,
    };

    axios
      .post(`${baseURL}/signup`, payload)
      .then((res) => {
        toast.success(
          <div>
            Account Created Successfully <br /> Please Login in
          </div>
        );
        router.push("/login");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <>
      <div
        className={`${pageReady ? "block" : "hidden"} grid grid-cols-[30%,1fr]`}
      >
        <div className="bg-accent h-screen grid place-items-center">
          <div className="text-center w-full text-white space-y-8">
            <h2 className="font-bold text-4xl">Welcome Back!</h2>
            <div className="text-[#eeeeee] w-fit mx-auto">
              <p>To keep connected with us please</p>
              <p>please login with your personal info</p>

              <Link href="/login">
                <button className="uppercase px-4 py-2 w-[100%] rounded-full border-2 mt-8">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="h-screen grid place-items-center bg-gray-100">
      <div className='shadow-lg p-8 rounded-lg border-t-4 border-accent bg-white max-w-lg w-full'>
        <h1 className="text-accent font-bold text-4xl mb-6">Create Account</h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input__style p-4 border border-gray-300 rounded-md"
            type="text"
            placeholder="Name"
            required
          />
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
            placeholder="Strong Password"
            required
          />
          <div className="text-sm text-gray-600">
                        Strong Password:
                        <ul className="list-disc pl-5 mt-1 text-xs">
                            <li>Minimum length 8</li>
                            <li>Must have uppercase letters</li>
                            <li>Must have lowercase letters</li>
                            <li>Must have at least 1 digit</li>
                            <li>Must have at least 1 symbol</li>
                            <li>Should not have spaces</li>
                        </ul>
          </div>

          <button className="uppercase bg-accent hover:bg-accentDark px-6 py-3 text-white rounded-md mt-4">
            Sign Up
          </button>
        </form>
      </div>
    </div>
      </div>
    </>
  );
};

export default SignUp;
