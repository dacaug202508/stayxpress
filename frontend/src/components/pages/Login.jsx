import React from "react";
import Button from "../reusable/Button";
import Homeimage from "../common/Homeimage";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AUTHROLES, login } from "../../store/authSlice";
import { loginUser } from "../../services/authservices";
import { myToast, myWarningToast } from "../../utils/toast";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      console.log(res.data);
      const token = res.data?.token;
      const username = res.data?.user;

      const decoded = jwtDecode(token);
      console.log(decoded.userId);

      const roles = decoded.roles || [];
      const userId = decoded.userId;
      const role = roles[0];

      dispatch(login({ token, username, role, userId }));

      switch (role) {
        case "ROLE_USER":
          navigate("/owner");
          break;
        case "ROLE_ADMIN":
          navigate("/admin");
          break;
        case "ROLE_CUSTOMER":
          navigate("/");
          break;
        default:
          navigate("/");
      }

      myToast("Login successful");
    } catch (error) {
      myWarningToast(error?.response?.data || "Invalid credentials");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-hidden bg-gray-50">
      {/* LEFT – FORM */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* HEADER */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 mt-2 text-sm">
              Please enter your details to access your account.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            {/* PASSWORD */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-sky-600 text-xs font-medium hover:text-sky-700 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
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

            <Button
              text={isSubmitting ? "Signing in..." : "Sign in"}
              css={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg shadow-sky-200 transition-all transform hover:-translate-y-0.5 ${isSubmitting ? "bg-sky-300 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600 hover:shadow-sky-300"
                }`}
              disabled={isSubmitting}
            />
          </form>

          {/* FOOTER */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-sky-600 font-bold hover:text-sky-700 hover:underline transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT – IMAGE */}
      <div className="hidden md:block relative bg-sky-50">
        <div className="absolute inset-0 bg-sky-900/10 z-10"></div>
        <div className="h-full w-full">
          <Homeimage image_src="images/login.jpg" css="h-full w-full object-cover" />
        </div>
        {/* Optional Overlay Text */}
        <div className="absolute bottom-10 left-10 right-10 z-20 text-white hidden lg:block">
          <h2 className="text-4xl font-bold mb-2 text-shadow">Find Your Perfect Stay</h2>
          <p className="text-lg opacity-90 text-shadow-sm">Join thousands of users booking the best hotels at the best prices.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
