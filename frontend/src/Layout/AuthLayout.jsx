import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication = true }) {
  let { status } = useSelector((state) => state.auth);
  let navigate = useNavigate();

  useEffect(() => {
    if (authentication && status) {
      navigate("/");
    }
  }, [status]);

  return <>{children}</>;
}

export default AuthLayout;
