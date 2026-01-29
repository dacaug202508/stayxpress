import React from "react";
import Button from "../reusable/Button";
import Homeimage from "../common/Homeimage";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AUTHROLES, login } from "../../store/authSlice";
import { getClaimsFromJwt, loginUser } from "../../services/authservices";
import { myToast, myWarningToast } from "../../utils/toast";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched", // validation UX
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
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-hidden">
      {/* LEFT – FORM */}
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* HEADER */}
          <div className="mb-2">
            <h1 className="text-xl font-bold">Welcome Back</h1>
            <p className="text-gray-400 text-sm">
              Please enter your details to access your booking.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-xl px-6 py-4 space-y-3"
          >
            {/* USERNAME */}
            <div>
              <label className="block mb-1 font-medium">Username</label>
              <input
                type="text"
                placeholder="john123"
                className={`w-full border rounded-md px-3 py-2 ${
                  errors.username ? "border-red-500" : ""
                }`}
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    // value: /^[a-zA-Z0-9]+$/,
                    message: "Only letters and numbers allowed",
                  },
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters required",
                  },
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-medium">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-sky-400 text-xs hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <input
                type="password"
                placeholder="********"
                className={`w-full border rounded-md px-3 py-2 ${
                  errors.password ? "border-red-500" : ""
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    // value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              text={isSubmitting ? "Signing in..." : "Sign in"}
              css="w-full bg-sky-400 text-white py-2 rounded-lg hover:bg-sky-500 transition disabled:opacity-60"
              disabled={isSubmitting}
            />
          </form>

          {/* FOOTER */}
          <p className="mt-2 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-sky-500 font-semibold hover:underline"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT – IMAGE */}
      <div className="hidden md:flex items-center justify-center">
        <div className="h-[75vh] w-full overflow-hidden">
          <Homeimage image_src="images/login.jpg" />
        </div>
      </div>
    </div>
  );
}

export default Login;
