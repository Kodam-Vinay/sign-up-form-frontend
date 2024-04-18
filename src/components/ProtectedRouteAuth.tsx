import { Navigate } from "react-router-dom";
import { userInfoType } from "../constants/constants";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRouteAuth: React.FC<ProtectedRouteProps> = ({ children }) => {
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) {
    return <Navigate to="/sign-up" />;
  }
  const details: userInfoType = JSON.parse(userInfo);

  return details?.userDetails?.jwtToken === undefined ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRouteAuth;
