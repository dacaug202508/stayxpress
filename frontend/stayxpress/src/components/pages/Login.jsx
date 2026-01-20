import React, { useEffect, useState } from "react";
import Button from "../reusable/Button";
import Homeimage from "../common/Homeimage";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AUTHROLES, login, logout } from "../../store/authSlice";

function Login() {
  const initialDetails = {
    username: "",
    password: "",
  };

  const [loginFormDetails, setLoginFormDetails] = useState(initialDetails);

  function handleChange(name, value) {
    setLoginFormDetails({
      ...loginFormDetails,
      [name]: value,
    });
  }

  let dispatch = useDispatch();

  let navigate = useNavigate();

let state = useSelector(state => state.auth)

  useEffect(()=>{
    console.log(state)
  },[state])

  function handleSignin(e) {
    e.preventDefault();
    let userData = loginFormDetails;
    dispatch(login({ role: AUTHROLES.OWNER, userData }));
   
    navigate("/");
  }

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
            onSubmit={handleSignin}
            className="bg-white rounded-xl px-6 py-4 space-y-2"
          >
            <div>
              <label className="block mb-1 font-medium">Username</label>
              <input
                type="text"
                name="username"
                placeholder="name@mail.com"
                className="w-full border rounded-md px-3 py-2"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>

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
                name="password"
                placeholder="********"
                className="w-full border rounded-md px-3 py-2"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>

            <Button
              text="Sign in"
              css="w-full bg-sky-400 text-white py-2 rounded-lg hover:bg-sky-500 transition"
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
