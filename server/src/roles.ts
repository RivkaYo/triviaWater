import type { Role } from "@hilma/auth-nest";

export const CREATOR = {
  id: 1,
  roleKey: "suiHLul8dKe9ojsD",
  description: "Regular creator role",
  name: "CREATOR",
} as const satisfies Role;

export const ROLES = [CREATOR];
