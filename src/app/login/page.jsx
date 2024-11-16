"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://elitetaxation-backend.vercel.app/api/users/adminlogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_email: userEmail,
            user_password: userPassword,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);

        router.push("/dashboard");
        console.log("push check")
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h3 className="mb-6 text-2xl font-semibold text-center text-gray-800 dark:text-white">
          Sign In to Your Account
        </h3>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white transition bg-primary rounded-lg hover:bg-primary-dark focus:ring-4 focus:ring-primary focus:outline-none"
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;