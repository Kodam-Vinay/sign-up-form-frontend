import { useLocation, useNavigate } from "react-router-dom";
import "../css/AuthForm.css";
import InputField from "./InputField";
import PasswordInputField from "./PasswordInputField";
import { useEffect, useState } from "react";

type Props = {
  firstName?: string;
  setFirstName?: React.Dispatch<React.SetStateAction<string>>;
  lastName?: string;
  setLastName?: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword?: string;
  setConfirmPassword?: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleForm: React.FormEventHandler<HTMLFormElement>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const selectOptions = [
  {
    id: "email",
    name: "Email",
  },
  {
    id: "phone",
    name: "Phone",
  },
];

const locationNames = [
  {
    id: "signup",
    url: "/sign-up",
  },
  {
    id: "signin",
    url: "/sign-in",
  },
];

const AuthForm = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleForm,
  setIsError,
  isError,
  error,
}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [locationPath, setLocationPath] = useState(locationNames[0].url);

  useEffect(() => {
    setLocationPath(location.pathname);
  }, [location?.pathname]);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <form
      className="form-container border-color"
      onSubmit={(e) => {
        e.preventDefault();
        handleForm(e);
      }}
    >
      <div className="heading-and-sign-in-text-container">
        {locationPath === locationNames[0].url ? (
          <h1 className="heading">
            <span className="purple-color">Let us know</span>
            <span className="red-color">!</span>
          </h1>
        ) : (
          <h1 className="heading">
            <span className="purple-color">Fill what we know</span>
            <span className="red-color">!</span>
          </h1>
        )}
        {locationPath === locationNames[0].url && (
          <button
            type="button"
            className="sign-in-text-button transparent-button"
            onClick={() => navigate("/sign-in")}
          >
            <span className="purple-color">Sign</span>
            <span className="red-color">In</span>
          </button>
        )}
      </div>
      <div>
        {locationPath === locationNames[0].url && (
          <InputField
            type="text"
            onChange={(e) => {
              setFirstName && setFirstName(e.target.value);
              setIsError(false);
            }}
            value={firstName ? firstName : ""}
            placeholder="First Name"
          />
        )}

        {locationPath === locationNames[0].url && (
          <InputField
            type="text"
            onChange={(e) => {
              setLastName && setLastName(e.target.value);
              setIsError(false);
            }}
            value={lastName ? lastName : ""}
            placeholder="Last Name"
          />
        )}

        {locationPath === locationNames[1].url && (
          <InputField
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setIsError(false);
            }}
            value={email}
            placeholder="Email"
          />
        )}

        <PasswordInputField
          type={showPassword ? "text" : "password"}
          onChange={(e) => {
            setPassword(e.target.value);
            setIsError(false);
          }}
          placeholder={
            locationPath === locationNames[0].url ? "Set Password" : "Password"
          }
          value={password}
          onClick={() => setShowPassword(!showPassword)}
        />

        {locationPath === locationNames[0].url && (
          <PasswordInputField
            type={showConfirmPassword ? "text" : "password"}
            onChange={(e) => {
              setConfirmPassword && setConfirmPassword(e.target.value);
              setIsError(false);
            }}
            placeholder="Retype Password"
            value={confirmPassword ? confirmPassword : ""}
            onClick={() =>
              setShowConfirmPassword &&
              setShowConfirmPassword(!showConfirmPassword)
            }
          />
        )}

        {locationPath === locationNames[0].url && (
          <>
            <InputField
              list="options"
              id="select"
              name="select"
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption("");
                setSelectedOption(e.target.value);
                setIsError(false);
              }}
              placeholder="Contact Mode"
            />
            <datalist id="options">
              {selectOptions.map((each) => (
                <option key={each.id}>{each.name}</option>
              ))}
            </datalist>
          </>
        )}

        {locationPath === locationNames[0].url && (
          <>
            {selectedOption === selectOptions[0].name ? (
              <InputField
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsError(false);
                }}
                value={email}
                placeholder="Enter Email"
              />
            ) : (
              <InputField
                type="number"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsError(false);
                }}
                value={email}
                disabled={true}
                placeholder="Mobile not Implemented Yet"
              />
            )}
          </>
        )}

        <button className="sign-form-button sign_up_login_button" type="submit">
          {locationPath === locationNames[0].url ? "Sign Up" : "Sign In"}
        </button>

        {locationPath === locationNames[1].url && (
          <button
            type="button"
            className="sign-form-button login_sign_up_button"
            onClick={() => navigate("/sign-up")}
          >
            Sign Up
          </button>
        )}
      </div>
      {isError && <p className="error-message">{error}</p>}
    </form>
  );
};

export default AuthForm;
