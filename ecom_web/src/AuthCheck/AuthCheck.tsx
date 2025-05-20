import type { JSX } from "react";
import { Navigate, useLocation,  } from "react-router-dom";



function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const location = useLocation();
  if (!token) {
    return <Navigate to="/Auth/login" state={{ from: location }} replace />;
  }
  return children;
}
export default ProtectedRoute;