import { useMutation } from "@tanstack/react-query";

import { changePassword, createUser, logInUser } from "../../../api/auth.api";
import type { MutationsProps } from "../../types/mutation-props.interface";

export const useCreateUser = ({ onError, onSuccess }: MutationsProps) => {
  return useMutation({
    mutationFn: createUser,
    onSuccess,
    onError,
  });
};

export const useLogInUser = ({ onError, onSuccess }: MutationsProps) => {
  return useMutation({
    mutationFn: logInUser,
    onSuccess,
    onError,
  });
};

export const useChangePassword = ({ onError, onSuccess }: MutationsProps) => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess,
    onError,
  });
};
