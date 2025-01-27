import type { AuthConfig } from "@hilma/auth-server-core";

import { ACCESS_TOKEN_COOKIE_NAME } from "./constants/access-token-cookie.const";

export default (): AuthConfig => {
  const secretOrKey = process.env.JWT_SECRET;
  if (!secretOrKey) throw new Error("Failed to find JWT_SECRET in env");

  return {
    auth: {
      accessTokenCookie: ACCESS_TOKEN_COOKIE_NAME,
      secretOrKey,
    },
  };
};
