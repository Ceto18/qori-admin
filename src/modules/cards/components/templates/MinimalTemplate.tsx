"use client";

import { Mail, MapPin, Phone, Globe } from "lucide-react";
import { CardFormValues } from "../../types";

interface Props {
  data: CardFormValues;
  profilePreview: string;
  bannerPreview: string;
}

export default function MinimalTemplate({
  data,
  profilePreview,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/[0.08] dark:bg-gray-900">
      <div className="flex flex-col items-center text-center">
        <div
          className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full text-3xl font-bold text-white"
          style={{ backgroundColor: data.primary_color || "#111827" }}
        >
          {profilePreview ? (
            <img
              src={profilePreview}
              alt={data.full_name || "Perfil"}
              className="h-full w-full object-cover"
            />
          ) : (
            data.full_name?.charAt(0)?.toUpperCase() || "?"
          )}
        </div>

        <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
          {data.full_name || "Nombre completo"}
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {data.position || "Cargo"}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          {data.company || "Empresa"}
        </p>
      </div>

      {data.bio && (
        <p className="mt-5 text-center text-sm leading-6 text-gray-500 dark:text-gray-400">
          {data.bio}
        </p>
      )}

      <div className="mt-6 space-y-3">
        <Info icon={<Mail size={16} />} value={data.email} />
        <Info icon={<Phone size={16} />} value={data.phone} />
        <Info icon={<Globe size={16} />} value={data.website} />
        <Info icon={<MapPin size={16} />} value={data.location} />
      </div>
    </div>
  );
}

function Info({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value?: string;
}) {
  if (!value) return null;

  return (
    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <span>{icon}</span>
      <span className="truncate">{value}</span>
    </div>
  );
}