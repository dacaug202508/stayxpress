import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicOnlyLayout() {
  const { status, role } = useSelector((state) => state.auth);

  if (status) {
    if (role === "ROLE_OWNER") return <Navigate to="/owner" replace />;
    if (role === "ROLE_ADMIN") return <Navigate to="/admin" replace />;
    return <Navigate to="/user" replace />;
  }

  return <Outlet />;
}
