import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AUTHROLES } from "../store/authSlice";

function OwnerAuthLayout({ children, authentication = true }) {
  const { status, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  let route = useLocation();

  useEffect(() => {
    // console.log(status + " " + role);
    // console.log(role + AUTHROLES.OWNER);
    console.log(route.pathname)
    if (route.pathname != "/owner") navigate("/owner");

    if (authentication == status && role === AUTHROLES.OWNER) {
      navigate("/owner", { replace: true });
    }

    if (authentication != status) {
      navigate("/login");
    } else if (authentication == status && role != AUTHROLES.OWNER) {
      navigate("/");
    }
    setLoading(false);
  }, [status, role, authentication, navigate]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
}

export default OwnerAuthLayout;
