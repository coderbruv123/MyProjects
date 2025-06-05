import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  exp: number;
  [key: string]: any; 
}

function isTokenExpired(token: string): boolean {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; 
    return decoded.exp < currentTime;
  } catch (e) {
    return true; 
  }
}

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("user") || sessionStorage.getItem("token");
  const location = useLocation();

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("user");
    return <Navigate to="/Auth/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
