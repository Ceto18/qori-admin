"use client";

import {
  Briefcase,
  Building2,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  UserRound,
} from "lucide-react";

import { CardFormValues } from "../../types";

interface Props {
  data: CardFormValues;
  profilePreview: string;
  bannerPreview: string;
}

export default function ModernTemplate({
  data,
  profilePreview,
  bannerPreview,
}: Props) {
  const primaryColor = data.primary_color || "#2563eb";
  const secondaryColor = data.secondary_color || "#111827";

  return (
    <div
      className="mx-auto w-full max-w-[390px] overflow-hidden rounded-[32px] p-[1.5px] shadow-xl"
      style={{
        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
      }}
    >
      <div className="overflow-hidden rounded-[30px] bg-white dark:bg-gray-950">
        {/* BANNER */}
        <div
          className="relative h-40 bg-cover bg-center"
          style={{
            backgroundColor: primaryColor,
            backgroundImage: bannerPreview
              ? `url(${bannerPreview})`
              : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/35" />

          <div className="absolute left-5 top-5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
            Tarjeta digital
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative px-5 pb-5">
          {/* PROFILE IMAGE */}
          <div className="-mt-14 flex justify-center">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-gray-100 text-3xl font-bold text-gray-500 shadow-lg dark:border-gray-950 dark:bg-gray-800 dark:text-gray-300">
              {profilePreview ? (
                <img
                  src={profilePreview}
                  alt={data.full_name || "Foto de perfil"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound size={42} />
              )}
            </div>
          </div>

          {/* NAME INFO */}
          <div className="mt-4 text-center">
            <h3 className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
              {data.full_name || "Nombre completo"}
            </h3>

            <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              {data.position || "Cargo"}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              {data.company || "Nombre de la empresa"}
            </p>
          </div>

          {/* QUICK ACTIONS */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <QuickAction
              icon={<Phone size={18} />}
              label="Llamar"
              value={data.phone}
              color={primaryColor}
            />

            <QuickAction
              icon={<MessageCircle size={18} />}
              label="WhatsApp"
              value={data.whatsapp}
              color={secondaryColor}
            />
          </div>

          {/* TAGS */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {data.position && (
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: primaryColor }}
              >
                <Briefcase size={13} />
                {data.position}
              </span>
            )}

            {data.profession && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-white/[0.06] dark:text-gray-300">
                {data.profession}
              </span>
            )}
          </div>

          {/* BIO */}
          {data.bio ? (
            <p className="mt-5 text-center text-sm leading-6 text-gray-500 dark:text-gray-400">
              {data.bio}
            </p>
          ) : (
            <p className="mt-5 text-center text-sm leading-6 text-gray-400 dark:text-gray-500">
              Agrega una breve descripción para que tus clientes conozcan más
              sobre ti o tu empresa.
            </p>
          )}

          {/* CONTACT INFO */}
          <div className="mt-5 space-y-3">
            <InfoItem
              icon={<Building2 size={17} />}
              label="Empresa"
              value={data.company}
            />

            <InfoItem
              icon={<Mail size={17} />}
              label="Correo"
              value={data.email}
            />

            <InfoItem
              icon={<Phone size={17} />}
              label="Teléfono"
              value={data.phone}
            />

            <InfoItem
              icon={<Globe size={17} />}
              label="Sitio web"
              value={data.website}
            />

            <InfoItem
              icon={<MapPin size={17} />}
              label="Ubicación"
              value={data.location}
            />
          </div>

          {/* SECONDARY ACTIONS */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <ActionButton
              icon={<Mail size={18} />}
              label="Correo"
              value={data.email}
              color={primaryColor}
            />

            <ActionButton
              icon={<Globe size={18} />}
              label="Web"
              value={data.website}
              color={secondaryColor}
            />
          </div>

          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            }}
          >
            Guardar contacto
          </button>
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  color: string;
}) {
  return (
    <button
      type="button"
      disabled={!value}
      className="flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      style={{ backgroundColor: color }}
    >
      {icon}
      {label}
    </button>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  if (!value) return null;

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-3 py-3 dark:border-white/[0.06] dark:bg-white/[0.04]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm dark:bg-gray-900 dark:text-gray-300">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-400">{label}</p>
        <p className="truncate text-sm font-semibold text-gray-700 dark:text-gray-200">
          {value}
        </p>
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  color: string;
}) {
  return (
    <button
      type="button"
      disabled={!value}
      className="flex items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white px-3 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-gray-200"
    >
      <span style={{ color }}>{icon}</span>
      {label}
    </button>
  );
}