"use client";
import React, { useState } from "react";
import { MailIcon } from "../../svg/MailIcon";
import { loginUser } from "../../../../lib/admin/api/auth/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LockIcon } from "../../svg/LockIcon";
import { EyeOffIcon } from "../../svg/EyeOffIcon";
import { EyeOnIcon } from "../../svg/EyeOnIcon";
import PrimaryButton from "../../Atoms/buttons/PrimaryButton";
import { useToastContext } from "../../../utils/providers/ToastProvider";

const LoginPageFormComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();
  const { showToast } = useToastContext();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await loginUser(email, password);
      if (response?.token) {
        Cookies.set("authToken", response.token, { expires: 1, path: "/" });
        showToast("Login Sucessful!", "success");
        router.replace("/admin/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showToast(error.message, "danger");
    }
  };

  return (
    <>
      <div className="h-[80%] flex items-center justify-center">
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
            <div className="relative mb-8">
              <div className="absolute inset-y-0 flex items-center pl-2 pointer-events-none">
                <LockIcon size={28} />
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
                {showPassword ? <EyeOnIcon /> : <EyeOffIcon />}
              </div>
            </div>

            <PrimaryButton type="submit">Login</PrimaryButton>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPageFormComponent;
