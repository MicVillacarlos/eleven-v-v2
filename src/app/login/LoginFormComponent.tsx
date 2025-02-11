"use client";
import React, { useState } from "react";
import { MailIcon } from "../components/svg/mailIcon";
import { loginUser } from "../../lib/admin/api/auth/auth";
import { useRouter } from "next/navigation";

const LoginPageFormComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // useEffect(() => {
  //   localStorage.removeItem("authToken");
  // }, [router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await loginUser(email, password);

      if (response?.token) {
        localStorage.setItem("authToken", response.token);
        router.replace("/admin/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="w-[500px] mx-auto p-6 border border-gray-200 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MailIcon />
          </div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-[#205072] block w-full pl-10 p-2.5"
            placeholder="Email"
            required
          />
        </div>

        {/* Password Field */}
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MailIcon />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-[#205072] block w-full pl-10 p-2.5"
            placeholder="Password"
            required
          />
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <MailIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <MailIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </div>
        </div>
        
        <button
          type="submit"
          className="text-white bg-[#205072] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPageFormComponent;
