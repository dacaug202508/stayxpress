import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RoleBasedLayout({ allowedRoles }) {
  const { role } = useSelector((state) => state.auth);

  if (!allowedRoles.includes(role)) {
    if (role === "ROLE_OWNER") return <Navigate to="/owner" replace />;
    if (role === "ROLE_ADMIN") return <Navigate to="/admin" replace />;
    return <Navigate to="/user" replace />;
  }

  return <Outlet />;
}
