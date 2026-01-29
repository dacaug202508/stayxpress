import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AUTHROLES } from "../store/authSlice";

function OwnerAuthLayout({ children }) {
  const { status, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = location.pathname;

    if (!status) {
      navigate("/login", {
        replace: true,
        state: { from: path },
      });
      return;
    }

    if (path.startsWith("/owner") && role !== AUTHROLES.OWNER) {
      navigate("/", { replace: true });
      return;
    }

    setLoading(false);
  }, [status, role, location.pathname, navigate]);

  if (loading) return <h1>Loading...</h1>;

  return <>{children}</>;
}

export default OwnerAuthLayout;
