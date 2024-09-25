import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSiteContext } from "../contexts/SiteProvider";
import { showAlertAutoClose } from "../services/notifyService";
import { setSessionStorage } from "../services/sessionService";
interface PrivateRouteProps {
  children: ReactNode; // children is ReactNode since it can be any valid JSX or element
  allowedRoles?: string[]; // assuming allowedRoles is an array of strings, can be optional if needed
}

const PrivateRoute: React.FC<PrivateRouteProps> = React.memo(
  ({ children, allowedRoles }) => {
    const { user } = useSiteContext(); // assuming user comes from a context
    const location = useLocation();

    if (!user) {
      const currentPath = location.pathname;
      setSessionStorage("CROP_CUSTOMER_LOGIN", currentPath);

      // show alert for unauthorized access
      showAlertAutoClose("Please Login", "error");

      // redirect to login page if user is not logged in
      return <Navigate to="/" />;
    }

    // In this example, roles checking is not yet implemented, but you'd add it here
    // if you need to check for roles before rendering the component
    setSessionStorage("CROP_CUSTOMER_LOGIN", "");

    return <>{children}</>;
  }
);

export default PrivateRoute;
