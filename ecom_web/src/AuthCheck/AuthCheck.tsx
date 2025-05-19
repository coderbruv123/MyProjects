import type { JSX } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";


type AuthCheckProps = {
    children: JSX.Element;
};

const AuthCheck = ({ children }: AuthCheckProps) => {
    
    const isAuthenticate = false;
    const location = useLocation();
    const navigate = useNavigate();

    if (!isAuthenticate) {
        return (
            <Navigate to="/auth/login" state={{ from: location }} replace />
        );
    }
    return children;
};
export default AuthCheck;