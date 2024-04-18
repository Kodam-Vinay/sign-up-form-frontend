import { Navigate } from "react-router-dom";
import { userInfoType } from "../constants/constants";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo || userInfo === null) {
    return <Navigate to="/sign-up" />;
  }
  const details: userInfoType = JSON.parse(userInfo);
  return details?.userDetails?.jwtToken !== undefined ? (
    <>{children}</>
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default ProtectedRoute;
