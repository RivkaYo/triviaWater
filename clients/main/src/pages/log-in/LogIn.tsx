import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import clsx from "clsx";
import { type FC, type FormEvent } from "react";
import { type AxiosError } from "axios";
import { useAlert } from "@hilma/forms";
import { useQueryClient } from "@tanstack/react-query";
import { withAuth } from "@hilma/auth-client";

import PasswordField from "../../components/common/password-field/PasswordField";
import { useI18n } from "../../i18n/i18n-main";
import { passwordRegex } from "../../common/constants/regex/password.regex";
import { useLogInUser } from "../../common/hooks/mutations/auth.mutations";

import "./log-in.scss";

// eslint-disable-next-line react-refresh/only-export-components -- component name
const LogIn: FC = () => {
  const showAlert = useAlert();
  const loginText = useI18n((i18n) => i18n.logInText);
  const navigate = useNavigate();
  const i18n = useI18n((i18n) => i18n.logInText);

  const queryClient = useQueryClient();

  const loginUserMutation = useLogInUser({
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as {
        error: string;
        message: string;
        statusCode: number;
      };

      if (errorData?.statusCode === 401) {
        showAlert(loginText.loginFailed, "error");
      } else if (errorData?.statusCode === 500) {
        showAlert(loginText.serverError, "error");
      }
    },
    onSuccess: async () => {
      showAlert(loginText.loginSuccessful, "success");
      await queryClient.resetQueries();
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      void navigate("/home");
    },
  });

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    if (!passwordRegex.test(password))
      showAlert(loginText.badPassword, "error");
    else {
      loginUserMutation.mutate({ username, password });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="username" className="input-label">
            {i18n.username}
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="input-field"
          />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="input-label">
            {i18n.password}
          </label>
          <PasswordField />
        </div>

        <button type="submit" className="submit-button">
          {i18n.entry}
        </button>
      </form>

      <p className="register-question">
        {i18n.questionToRegister}
        <Button
          variant="text"
          className={clsx("register-link", "navigate-button")}
          onClick={() => void navigate("/register")}
        >
          {i18n.registerHere}
        </Button>
      </p>
    </div>
  );
};

const wrappedLogIn = withAuth(LogIn, { access: "public-only" });

export default wrappedLogIn;
