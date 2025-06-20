// File: src/components/common/ProtectedRoute.tsx

import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import Loader from "../common/Loader";


const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {

      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading || !isAuthenticated) {
    return <Loader  />;
  }

  // Once authenticated, render the nested routes
  return <Outlet />;
};

export default ProtectedRoute;
