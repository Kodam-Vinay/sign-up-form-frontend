import { createContext } from "react";

interface AuthTypeContext {
  checkLoginClicked?: boolean;
  makeLoginClicked: (checkLoginClicked: boolean) => void;
  isLoading?: boolean;
  makeLoading: (isLoading: boolean) => void;
}

// Create the context with initial value null
const AuthContext = createContext<AuthTypeContext | null>(null);
export default AuthContext;
