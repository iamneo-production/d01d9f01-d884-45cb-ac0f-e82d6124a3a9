import { useLocation, Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../services/userService";
const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const local=getCurrentUser();
    return (
        local?.role?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : local?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;