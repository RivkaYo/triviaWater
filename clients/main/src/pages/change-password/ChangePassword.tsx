import type { AxiosError } from "axios";
import { useAlert } from "@hilma/forms";
import { useQueryClient } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";

import { useChangePassword } from "../../common/hooks/mutations/auth.mutations";
import { passwordRegex } from "../../common/constants/regex/password.regex";
import PasswordField from "../../components/common/password-field/PasswordField";
import { useI18n } from "../../i18n/i18n-main";
import "../register/register.scss";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [verifyNewPassword, setVerifyNewPassword] = useState<string>("");

  const i18n = useI18n((i18n) => i18n.changePassword);
  const showAlert = useAlert();

  const queryClient = useQueryClient();

  const changePasswordMutation = useChangePassword({
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as {
        error: string;
        message: string;
        statusCode: number;
      };
      if (errorData.statusCode === 409) {
        showAlert(i18n.conflictError, "error");
      } else showAlert(i18n.serverError, "error");
    },
    onSuccess: async () => {
      showAlert(i18n.successMessage, "success");
      await queryClient.resetQueries();
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== verifyNewPassword) {
      showAlert(i18n.unmatchingPasswordsError, "error");
    } else if (!passwordRegex.test(newPassword)) {
      showAlert(i18n.passwordValidationError, "error");
    } else if (!passwordRegex.test(oldPassword)) {
      showAlert(i18n.passwordValidationError, "error");
    } else changePasswordMutation.mutate({ oldPassword, newPassword });
  };
  return (
    <div className="change-password-container">
      <form className="change-password-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="old-password" className="input-label">
            {i18n.oldPassword}
          </label>
          <PasswordField handleChange={(e) => setOldPassword(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="input-label">
            {i18n.newPassword}
          </label>
          <PasswordField handleChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="input-label">
            {i18n.verifyNewPassword}
          </label>
          <PasswordField
            handleChange={(e) => setVerifyNewPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-button" onClick={handleSubmit}>
          {i18n.changePassword}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
