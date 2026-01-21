import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTHROLES } from "../store/authSlice";

function OwnerAuthLayout({ children, authentication = true }) {
  // console.log(authentication);
  let { status, role } = useSelector((state) => state.auth);
  let navigate = useNavigate();

  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!(authentication && status)) {
      navigate("/");
    } else if (authentication && role != AUTHROLES.OWNER) {
      navigate("/login");
    }
    setLoading(false);
  }, [status]);

  return loading ? <h1>Loading.....</h1> : <>{children}</>;
}

export default OwnerAuthLayout;
