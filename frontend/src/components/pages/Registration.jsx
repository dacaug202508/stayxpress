import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Homeimage from "../common/Homeimage";
import Button from "../reusable/Button";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authservices";
import { myToast, myWarningToast } from "../../utils/toast";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Registration() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onTouched" });

  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");

  async function onSubmit(data) {
    // Remove confirmPassword before sending to API if the backend doesn't expect it
    const { confirmPassword, ...apiData } = data;

    try {
      const res = await registerUser(apiData);
      console.log(res.data);
      if (res?.data?.user) {
        myToast("Registration successful");
        reset();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      myWarningToast(error?.response?.data?.err || "Registration failed");
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-hidden bg-gray-50">
      {/* LEFT – IMAGE */}
      <div className="hidden md:block relative bg-sky-50">
        <div className="absolute inset-0 bg-sky-900/10 z-10"></div>
        <div className="h-full w-full">
          <Homeimage image_src="images/signup.jpg" css="h-full w-full object-cover" />
        </div>
        <div className="absolute bottom-10 left-10 right-10 z-20 text-white hidden lg:block">
          <h2 className="text-4xl font-bold mb-2 text-shadow">Join Our Community</h2>
          <p className="text-lg opacity-90 text-shadow-sm">Create an account to unlock exclusive deals and manage your bookings easily.</p>
        </div>
      </div>

      {/* RIGHT – FORM */}
      <div className="flex items-center justify-center px-6 py-12 scroll-my-4 overflow-y-auto">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100 my-auto">
          {/* HEADER */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-500 mt-2 text-sm">
              Sign up to get started with your journey.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* USERNAME */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaUser />
                </div>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all ${errors.username
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-sky-500 focus:ring-sky-100"
                    }`}
                  {...register("username", {
                    required: "Username is required",
                    pattern: {
                      value: /^[a-zA-Z0-9]{5,}$/,
                      message: "Only letters and numbers allowed",
                    },
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters required",
                    },
                  })}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs font-medium pl-1 animate-pulse">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all ${errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-sky-500 focus:ring-sky-100"
                    }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs font-medium pl-1 animate-pulse">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all ${errors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-sky-500 focus:ring-sky-100"
                    }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/,
                      message: "Password must contain at least one uppercase letter, one number, and one special character",
                    }
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs font-medium pl-1 animate-pulse">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaLock />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className={`w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all ${errors.confirmPassword
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-sky-500 focus:ring-sky-100"
                    }`}
                  {...register("confirmPassword", {
                    required: "Please confirm password",
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Passwords do not match";
                      }
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs font-medium pl-1 animate-pulse">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <Button
              text={isSubmitting ? "Creating Account..." : "Sign Up"}
              css={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg shadow-sky-200 transition-all transform hover:-translate-y-0.5 mt-2 ${isSubmitting ? "bg-sky-300 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600 hover:shadow-sky-300"
                }`}
              disabled={isSubmitting}
            />
          </form>

          {/* FOOTER */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-sky-600 font-bold hover:text-sky-700 hover:underline transition-colors"
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
