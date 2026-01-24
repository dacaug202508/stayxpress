import React from "react";
import { useForm } from "react-hook-form";
import Homeimage from "../common/Homeimage";
import Button from "../reusable/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authservices";
import { myToast, myWarningToast } from "../../utils/toast";

function Registration() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  let navigate = useNavigate();
  async function onSubmit(data) {
    try {
      const res = await registerUser(data);
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
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-hidden">
      {/* LEFT – IMAGE */}
      <div className="hidden md:flex items-center justify-center">
        <div className="h-[75vh] w-full overflow-hidden">
          <Homeimage image_src="images/signup.jpg" />
        </div>
      </div>

      {/* RIGHT – FORM */}
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* HEADER */}
          <div className="mb-2">
            <h1 className="text-xl font-bold">Create Your Account</h1>
            <p className="text-gray-400 text-sm">
              Unlock exclusive deals on world’s best hotels.
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
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "Only letters and numbers allowed",
                  },
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                placeholder="john@mail.com"
                className={`w-full border rounded-md px-3 py-2 ${
                  errors.email ? "border-red-500" : ""
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                placeholder="********"
                className={`w-full border rounded-md px-3 py-2 ${
                  errors.password ? "border-red-500" : ""
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                    message:
                      "Must include uppercase, number & special character",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <Button
              text={isSubmitting ? "Signing up..." : "Sign up"}
              css="w-full bg-sky-400 text-white py-2 rounded-lg hover:bg-sky-500 transition disabled:opacity-60"
              disabled={isSubmitting}
            />
          </form>

          {/* FOOTER */}
          <p className="mt-2 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-sky-500 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
