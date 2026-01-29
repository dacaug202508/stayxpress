import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthRequiredLayout() {
  const { status } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!status) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
