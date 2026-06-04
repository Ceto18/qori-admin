"use client";

import { Mail, MapPin, Phone, Globe, MessageCircle } from "lucide-react";
import { CardFormValues } from "../../types";

interface Props {
  data: CardFormValues;
  profilePreview: string;
  bannerPreview: string;
}

export default function ClassicTemplate({
  data,
  profilePreview,
  bannerPreview,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/[0.08] dark:bg-gray-900">
      <div
        className="h-32 bg-cover bg-center"
        style={{
          backgroundColor: data.primary_color || "#2563eb",
          backgroundImage: bannerPreview ? `url(${bannerPreview})` : undefined,
        }}
      />

      <div className="px-5 pb-5">
        <div className="-mt-14 flex justify-center">
          <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-100 text-3xl font-bold text-gray-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-300">
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
        </div>

        <div className="mt-4 text-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {data.full_name || "Nombre completo"}
          </h3>

          <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            {data.position || "Cargo"}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            {data.company || "Empresa"}
          </p>
        </div>

        {data.bio && (
          <p className="mt-4 text-center text-sm leading-6 text-gray-500 dark:text-gray-400">
            {data.bio}
          </p>
        )}

        <div className="mt-5 space-y-2">
          <Info icon={<Mail size={16} />} value={data.email} />
          <Info icon={<Phone size={16} />} value={data.phone} />
          <Info icon={<MessageCircle size={16} />} value={data.whatsapp} />
          <Info icon={<Globe size={16} />} value={data.website} />
          <Info icon={<MapPin size={16} />} value={data.location} />
        </div>

        <button
          type="button"
          className="mt-5 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white"
          style={{ backgroundColor: data.primary_color || "#2563eb" }}
        >
          Guardar contacto
        </button>
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
    <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5 text-sm text-gray-600 dark:bg-white/[0.04] dark:text-gray-300">
      <span className="text-gray-400">{icon}</span>
      <span className="truncate">{value}</span>
    </div>
  );
}