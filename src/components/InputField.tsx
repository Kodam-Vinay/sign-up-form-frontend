interface Props {
  type?: React.HTMLInputTypeAttribute;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  placeholder: string;
  disabled?: boolean;
  list?: string;
  id?: string;
  name?: string;
}

const InputField: React.FC<Props> = ({
  type,
  onChange,
  value,
  placeholder,
  disabled,
  list,
  id,
  name,
}) => {
  return (
    <input
      type={type}
      onChange={onChange}
      value={value}
      className="input-field-element"
      placeholder={placeholder}
      disabled={disabled}
      list={list}
      id={id}
      name={name}
    />
  );
};

export default InputField;
