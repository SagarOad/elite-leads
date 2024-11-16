"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://elitetaxation-backend.vercel.app/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_name: userName,
            user_email: userEmail,
            user_password: userPassword,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      setSuccess("Registration successful!");
      
      // Redirect to the login page after a short delay to show the success message
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <h3 className="mb-6 text-center text-2xl font-semibold text-gray-800 dark:text-white">
          Create Your Account
        </h3>
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Choose a username"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-500"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-500"
              required
            />
          </div>

          {/* Error/Success Messages */}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full rounded-lg px-4 py-2 text-white transition ${isLoading ? "bg-primary-dark" : "bg-primary"} hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="mr-2 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Register"
            )}
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
