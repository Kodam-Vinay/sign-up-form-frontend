import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container error-page-container">
      <h1>
        <span className="purple-color">Something </span>
        <span className="red-color">Error Happend !</span>
      </h1>
      <button onClick={() => navigate("/")} type="button">
        Go Back
      </button>
    </div>
  );
};

export default Error;
