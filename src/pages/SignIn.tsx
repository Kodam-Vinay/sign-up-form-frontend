import AuthForm from "../components/AuthForm";
import "../css/AuthScreen.css";
import { useContext, useState } from "react";
import signInImage from "../assets/Businesswoman-pana 1.png";
import AuthContext from "../context/AuthContext";
import { Grid } from "react-loader-spinner";
import { API_URL } from "../constants/constants";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { makeLoginClicked, makeLoading, isLoading } = authContext;

  const handleForm = async () => {
    try {
      if (!password || !email) {
        return;
      }
      makeLoginClicked(true);
      makeLoading(true);
      const apiUrl = API_URL + "/sign-in";
      const userDetails = {
        password,
        email,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response?.ok) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        makeLoading(false);
        if (data?.userDetails?.verified) {
          makeLoginClicked(false);
          setIsError(false);
          navigate("/");
        } else {
          setIsError(false);
          navigate("/verify-otp");
        }
      } else {
        setIsError(true);
        setError(data?.message);
        makeLoading(false);
        makeLoginClicked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="auth-screen-container">
        <img src={signInImage} alt="sign_up_form" className="auth-image" />
        <AuthForm
          handleForm={handleForm}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          setIsError={setIsError}
          isError={isError}
          error={error}
          setError={setError}
        />
      </div>
      {isLoading && (
        <div className="loader-spinner-container">
          <Grid
            visible={true}
            height="80"
            width="80"
            color="#3a244a"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass="grid-wrapper"
          />
        </div>
      )}
    </>
  );
};

export default SignIn;
