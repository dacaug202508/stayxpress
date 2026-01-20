import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OwnerAuthLayout({ children, authentication = true }) {
  console.log(authentication);
  let state = useSelector((state) => state.auth);
  let navigate = useNavigate();

  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (authentication && state.role != AUTHROLES.OWNER) {
      navigate("/");
    } else if (!authentication && state.role != AUTHROLES.OWNER) {
      navigate("/login");
    }
    setLoading(false);
  }, [state]);

  return loading ? <h1>Loading.....</h1> : <>{children}</>;
}

export default OwnerAuthLayout;
