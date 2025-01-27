import { useState, type FormEvent } from "react";
import { useAlert } from "@hilma/forms";
import { type AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { withAuth } from "@hilma/auth-client";

import { passwordRegex } from "../../common/constants/regex/password.regex";
import { useI18n } from "../../i18n/i18n-main";
import { useCreateUser } from "../../common/hooks/mutations/auth.mutations";
import PasswordField from "../../components/common/password-field/PasswordField";

import "./register.scss";

// eslint-disable-next-line react-refresh/only-export-components -- component name
const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");

  const navigate = useNavigate();
  const showAlert = useAlert();
  const loginText = useI18n((i18n) => i18n.logInText);
  const registerText = useI18n((i18n) => i18n.registerText);
  const queryClient = useQueryClient();

  const mutation = useCreateUser({
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as {
        error: string;
        message: string;
        statusCode: number;
      };
      if (errorData?.statusCode === 409) {
        showAlert(registerText.nameIsAlreadyExist, "error");
      } else {
        showAlert(registerText.somethingWentWrong, "error");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      void navigate("/home");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!passwordRegex.test(password))
      showAlert(registerText.passwordValidationError, "error");
    else if (verifyPassword !== password)
      showAlert(registerText.verifyPasswordMatchError, "error");
    else if (username.length < 6)
      showAlert(registerText.usernameLengthError, "error");
    else mutation.mutate({ username, password });
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="username" className="input-label">
            {loginText.username}
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
            type="text"
            className="input-field"
          />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="input-label">
            {loginText.password}
          </label>
          <PasswordField handleChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="input-label">
            {registerText.verifyPassword}
          </label>
          <PasswordField
            handleChange={(e) => setVerifyPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-button" onClick={handleSubmit}>
          {registerText.register}
        </button>
      </form>
    </div>
  );
};

const wrappedRegister = withAuth(Register, { access: "public-only" });

export default wrappedRegister;
