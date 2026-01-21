import React, { useState } from "react";
import Homeimage from "../common/Homeimage";
import Button from "../reusable/Button";
import { Link } from "react-router-dom";

function Registration() {
  const initialDetails = {
    username: "",
    email: "",
    phone: "",
    password: "",
  };

  const [registrationFormDetails, setRegistrationFormDetails] =
    useState(initialDetails);

  function handleChange(name, value) {
    setRegistrationFormDetails({ ...registrationFormDetails, [name]: value });
  }

  function handleSignup(e) {
    e.preventDefault();
    console.log(registrationFormDetails);
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
            onSubmit={handleSignup}
            className="bg-white rounded-xl px-6 py-4 space-y-2"
          >
            <div>
              <label className="block mb-1 font-medium">Username</label>
              <input
                name="username"
                type="text"
                placeholder="eg. John"
                className="w-full border rounded-md px-3 py-2"
                onChange={(e) =>
                  handleChange(e.target.name, e.target.value)
                }
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                name="email"
                type="email"
                placeholder="eg. john@mail.com"
                className="w-full border rounded-md px-3 py-2"
                onChange={(e) =>
                  handleChange(e.target.name, e.target.value)
                }
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <input
                name="phone"
                type="tel"
                placeholder="eg. +91"
                className="w-full border rounded-md px-3 py-2"
                onChange={(e) =>
                  handleChange(e.target.name, e.target.value)
                }
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                name="password"
                type="password"
                placeholder="********"
                className="w-full border rounded-md px-3 py-2"
                onChange={(e) =>
                  handleChange(e.target.name, e.target.value)
                }
              />
            </div>

            <Button
              text="Sign up"
              css="w-full bg-sky-400 text-white py-2 rounded-lg hover:bg-sky-500 transition"
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
