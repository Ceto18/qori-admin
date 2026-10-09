import type { UserRole } from "@/store/useAuthStore";

export function getHomePathByRole(
  role?: UserRole | null
): string {
  switch (role) {
    case "affiliate":
      return "/affiliates/code";

    case "admin":
      return "/";

    case "superadmin":
      return "/plans";

    case "user":
    default:
      return "/membership";
  }
}