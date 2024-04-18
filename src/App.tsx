import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import OtpVerification from "./pages/OtpVerification";

import Error from "./pages/Error";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useState } from "react";
import AuthContext from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteAuth from "./components/ProtectedRouteAuth";
import OtpProtectedRoute from "./components/OtpProtectedRoute";
import OtpAuthRoute from "./components/OtpAuthRote";

const App = () => {
  const [checkLoginClicked, setCheckLoginClicked] = useState(false);
  const [isLoading, makeLoading] = useState(false);
  const makeLoginClicked = (value: boolean) => {
    setCheckLoginClicked(value);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <OtpProtectedRoute>
            <Home />
          </OtpProtectedRoute>
        </ProtectedRoute>
      ),
    },
    {
      path: "/sign-up",
      element: (
        <ProtectedRouteAuth>
          <SignUp />
        </ProtectedRouteAuth>
      ),
    },
    {
      path: "/sign-in",
      element: (
        <ProtectedRouteAuth>
          <SignIn />
        </ProtectedRouteAuth>
      ),
    },
    {
      path: "/verify-otp",
      element: (
        <OtpAuthRoute>
          <OtpVerification />
        </OtpAuthRoute>
      ),
    },
    {
      path: "/error",
      element: <Error />,
    },
    {
      path: "*",
      element: (
        <ProtectedRoute>
          <OtpProtectedRoute>
            <Home />
          </OtpProtectedRoute>
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <AuthContext.Provider
      value={{ checkLoginClicked, makeLoginClicked, isLoading, makeLoading }}
    >
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </AuthContext.Provider>
  );
};

export default App;
