import "../css/AuthScreen.css";
import SignUpImage from "../assets/Businesswoman-pana 2.png";
import AuthForm from "../components/AuthForm";
import { useContext, useState } from "react";
import { API_URL } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Grid } from "react-loader-spinner";

const SignUp = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { makeLoginClicked, makeLoading, isLoading } = authContext;
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handleForm = async () => {
    try {
      if (!firstName || !lastName || !password || !email) {
        return;
      }
      makeLoginClicked(true);
      makeLoading(true);
      const apiUrl = API_URL + "/sign-up";
      const userDetails = {
        first_name: firstName,
        last_name: lastName,
        password,
        confirm_password: confirmPassword,
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
        makeLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(data));
        if (data?.userDetails?.verified) {
          makeLoginClicked(false);
        }
        navigate("/verify-otp");
        setIsError(false);
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
      <div
        className={`auth-screen-container ${
          isLoading ? "make-background-opacity-half" : ""
        }`}
      >
        <img src={SignUpImage} alt="sign_up_form" className="auth-image" />
        <AuthForm
          handleForm={handleForm}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
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

export default SignUp;
