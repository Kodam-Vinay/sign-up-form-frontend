import InputField from "./InputField";
import closeEye from "../assets/eye_close.png";
import openEye from "../assets/eye_open.png";

interface Props {
  type: React.HTMLInputTypeAttribute;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  placeholder: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const PasswordInputField: React.FC<Props> = ({
  type,
  value,
  onChange,
  placeholder,
  onClick,
}) => {
  return (
    <div className="input-password-field-container">
      <InputField
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled={false}
      />
      <button className="transparent-button" onClick={onClick} type="button">
        <img
          src={type === "text" ? closeEye : openEye}
          alt="eye_type"
          className="show-hide-password-image"
        />
      </button>
    </div>
  );
};

export default PasswordInputField;
