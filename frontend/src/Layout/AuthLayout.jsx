import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AUTHROLES } from "../store/authSlice";

function AuthLayout({ children, authentication = true }) {
  const { status, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  let route = useLocation();

  useEffect(() => {
    setLoading(false);

    if (status && route.pathname != "/owner" && role == AUTHROLES.OWNER) {
      navigate("/owner");
    } else if (
      status &&
      route.pathname != "/admin" &&
      role == AUTHROLES.ADMIN
    ) {
      navigate("/admin");
    } else if (status && route.pathname != "/" && role == AUTHROLES.USER) {
      navigate("/");
    }

    // if (!authentication && !status) {
    //   navigate("/login", { replace: true });
    // }

    // if (!authentication && status) {
    //   navigate("/owner", { replace: true });
    // }
  }, [status, authentication, navigate]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
}

export default AuthLayout;
