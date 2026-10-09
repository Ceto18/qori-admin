"use client";

import { useEffect } from "react";

import { useProfileStore } from "@/modules/profile/store/useProfileStore";

import UserMetaCard from "@/modules/profile/components/UserMetaCard";
import UserAddressCard from "@/modules/profile/components/UserAddressCard";
import Security from "@/modules/profile/components/Security";

export default function ProfilePage() {
  const {
    profile,
    loadingProfile,
    profileError,
    fetchProfile,
  } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loadingProfile) {
    return (
      <div className="space-y-6">
        {/* HEADER SKELETON */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

          <div className="mt-4 h-8 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

          <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* PROFILE CARD SKELETON */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />

            <div className="flex-1">
              <div className="h-5 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

              <div className="mt-3 h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>
                <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                <div className="mt-2 h-5 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
        {profileError}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No se pudo cargar la información del perfil.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/10 blur-3xl" />

        <div className="relative">
          <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
            Mi cuenta
          </span>

          <h1 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white/90 md:text-3xl">
            Perfil
          </h1>

          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Consulta y administra la información asociada a tu cuenta.
          </p>
        </div>
      </div>

      {/* DATOS PERSONALES */}
      <UserMetaCard />

      {/* DIRECCIÓN */}
      <UserAddressCard />

      {/* SEGURIDAD */}
      <Security />
    </div>
  );
}