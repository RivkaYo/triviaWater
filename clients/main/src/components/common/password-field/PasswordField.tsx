import { useState, type ChangeEvent, type FC } from "react";

import "./password-filed.scss";

interface PasswordFieldProps {
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField: FC<PasswordFieldProps> = ({ handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="password-input-container">
      <input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        className="input-field"
        onChange={handleChange}
      />
      <button className="toggle-password" onClick={handleClick}>
        <img
          src={showPassword ? "/icons/hide.svg" : "/icons/show.svg"}
          alt={showPassword ? "hide password icon" : "show password icon"}
          className="toggle-password-icon"
        />
      </button>
    </div>
  );
};

export default PasswordField;
