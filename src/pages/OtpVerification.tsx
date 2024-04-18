import { useContext, useRef, useState } from "react";
import "../css/OtpVerification.css";
import { API_URL, userInfoType } from "../constants/constants";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Grid } from "react-loader-spinner";

const OtpVerfication: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { makeLoading, isLoading } = authContext;
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const inputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) {
    return <Navigate to="/sign-up" />;
  }
  const details: userInfoType = JSON.parse(userInfo);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;

    if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
  };
  const joinOtp = otp.join("");

  const handleVerifyOtp = async () => {
    try {
      const userId = details.userDetails?._id;
      if (!userId || joinOtp?.trim().length < 4) {
        return;
      }
      makeLoading(true);
      const apiUrl = API_URL + "/verify-otp";
      const userDetails = {
        user: details?.userDetails?._id,
        otp: joinOtp,
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
        setIsError(false);
        localStorage.removeItem("userInfo");
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/");
      } else {
        makeLoading(false);
        setIsError(true);
        setError(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="page-container">
        <h1>Enter OTP</h1>
        <div>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="tel"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              ref={inputRefs[index]}
              className="otp-input"
            />
          ))}
        </div>
        <button
          className="sign-form-button sign_up_login_button verify_otp_button"
          onClick={handleVerifyOtp}
        >
          Verify Otp
        </button>
        {isError && <p className="error-message">{error}</p>}
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

export default OtpVerfication;
