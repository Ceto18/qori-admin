"use client";

import { useEffect } from "react";

import { useProfileStore } from "@/modules/profile/store/useProfileStore";

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
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="h-6 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        <div className="mt-6 space-y-4">
          <div className="h-12 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
          <div className="h-12 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
          <div className="h-12 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
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

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
              {profile.profile.name} {profile.profile.last_name}
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {profile.email}
            </p>
          </div>

          <span className="self-start rounded-full bg-brand-50 px-3 py-1 text-xs font-medium capitalize text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
            {profile.role}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Nombres
            </p>

            <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
              {profile.profile.name}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Apellidos
            </p>

            <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
              {profile.profile.last_name}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Tipo de documento
            </p>

            <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
              {profile.profile.type_document}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Documento
            </p>

            <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
              {profile.profile.document}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Teléfono
            </p>

            <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
              {profile.profile.country_code} {profile.profile.phone}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Dirección
            </p>

            <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
              {profile.profile.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}