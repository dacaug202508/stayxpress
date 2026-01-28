import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AUTHROLES } from "../store/authSlice";

function OwnerAuthLayout({ children, authentication = true }) {
  const { status, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Not logged in → go to login
    if (!status) {
      navigate("/login", {
        replace: true,
        state: { from: location.pathname },
      });
      return;
    }

    // 🔹 Logged in but NOT OWNER → go home
    if (status && role !== AUTHROLES.OWNER) {
      navigate("/", { replace: true });
      return;
    }

   
    setLoading(false);

  }, [status, role, navigate, location.pathname]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
}

export default OwnerAuthLayout;
