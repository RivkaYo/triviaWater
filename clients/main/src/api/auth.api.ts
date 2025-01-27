import { type RequestUserType } from "@hilma/auth-client";
import axios from "axios";

import { type NewUser } from "../common/types/user.interface";
import type { ChangePassword } from "../common/types/change-password.interface";

export const fetchToken = async () => {
  const { data } = await axios.get<{ token: string } | null>("/api/auth/token");
  if (!data) return null;
  return data.token;
};

export const fetchAuthData = async () => {
  const { data } = await axios.get<RequestUserType>("/api/auth/authenticate");
  return data;
};

export const createUser = async ({ username, password }: NewUser) => {
  const { data } = await axios.post("/api/auth/register", {
    username,
    password,
  });
  return data;
};

export const logInUser = async ({ username, password }: NewUser) => {
  const { data } = await axios.post<RequestUserType>("/api/auth/login", {
    username,
    password,
  });
  return data;
};

export const changePassword = async ({
  oldPassword,
  newPassword,
}: ChangePassword) => {
  const { data } = await axios.post("/api/auth/change-password", {
    oldPassword,
    newPassword,
  });
  return data;
};
