"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore, UserRole } from "@/store/useAuthStore";

type Props = {
  children: React.ReactNode;
  roles: UserRole[];
};

export default function RoleGuard({ children, roles }: Props) {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const hasHydrated = useAuthStore.persist.hasHydrated();

    if (!hasHydrated) return;

    if (!user) {
      router.replace("/signin");
      return;
    }

    if (!roles.includes(user.role)) {
      router.replace("/unauthorized");
      return;
    }

    setChecking(false);
  }, [user, roles, router]);

  if (checking) {
    return null;
  }

  return <>{children}</>;
}