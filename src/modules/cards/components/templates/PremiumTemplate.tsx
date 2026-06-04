"use client";

import {
  Crown,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  UserRound,
} from "lucide-react";

import { CardFormValues } from "../../types";

interface Props {
  data: CardFormValues;
  profilePreview: string;
  bannerPreview: string;
}

export default function PremiumTemplate({
  data,
  profilePreview,
  bannerPreview,
}: Props) {
  const primaryColor = data.primary_color || "#f59e0b";
  const secondaryColor = data.secondary_color || "#111827";

  return (
    <div
      className="mx-auto w-full max-w-[390px] rounded-[34px] p-[2px] shadow-2xl"
      style={{
        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
      }}
    >
      <div className="overflow-hidden rounded-[32px] bg-gray-950">
        {/* HEADER */}
        <div
          className="relative h-44 bg-cover bg-center"
          style={{
            backgroundColor: primaryColor,
            backgroundImage: bannerPreview
              ? `url(${bannerPreview})`
              : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/30 to-gray-950" />

          <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
            <Crown size={14} />
            Premium
          </div>

          <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/15 text-white backdrop-blur-md">
            <Sparkles size={16} />
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative px-5 pb-6">
          {/* PROFILE */}
          <div className="-mt-14 flex justify-center">
            <div
              className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[28px] border-4 border-gray-950 bg-white/10 text-3xl font-bold text-white shadow-xl ring-2"
              style={{
                ringColor: primaryColor,
                boxShadow: `0 18px 45px ${primaryColor}35`,
              }}
            >
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

          {/* MAIN INFO */}
          <div className="mt-4 text-center">
            <h3 className="text-2xl font-extrabold leading-tight text-white">
              {data.full_name || "Nombre completo"}
            </h3>

            <p
              className="mt-1 text-sm font-semibold"
              style={{ color: primaryColor }}
            >
              {data.position || "Cargo"}
            </p>

            <p className="mt-1 text-xs font-medium text-gray-400">
              {data.company || "Empresa"}
            </p>
          </div>

          {/* BIO */}
          <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.06] p-4">
            {data.bio ? (
              <p className="text-center text-sm leading-6 text-gray-300">
                {data.bio}
              </p>
            ) : (
              <p className="text-center text-sm leading-6 text-gray-400">
                Agrega una presentación breve para destacar tu perfil,
                experiencia o propuesta profesional.
              </p>
            )}
          </div>

          {/* ACTIONS PRINCIPALES */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <PrimaryAction
              icon={<Phone size={18} />}
              label="Llamar"
              value={data.phone}
              color={primaryColor}
            />

            <PrimaryAction
              icon={<MessageCircle size={18} />}
              label="WhatsApp"
              value={data.whatsapp}
              color={primaryColor}
            />
          </div>

          {/* CONTACT INFO */}
          <div className="mt-5 space-y-3">
            <InfoItem icon={<Mail size={17} />} label="Correo" value={data.email} />

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

          {/* ACCIONES SECUNDARIAS */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <SecondaryAction
              icon={<Mail size={18} />}
              label="Correo"
              value={data.email}
              color={primaryColor}
            />

            <SecondaryAction
              icon={<Globe size={18} />}
              label="Web"
              value={data.website}
              color={primaryColor}
            />
          </div>

          {/* CTA */}
          <button
            type="button"
            className="mt-5 flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-extrabold text-gray-950 shadow-lg transition hover:opacity-90"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, #fff2c2)`,
            }}
          >
            Guardar contacto
          </button>
        </div>
      </div>
    </div>
  );
}

function PrimaryAction({
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
      className="flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-bold text-gray-950 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
      style={{ backgroundColor: color }}
    >
      {icon}
      {label}
    </button>
  );
}

function SecondaryAction({
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
      className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.07] px-3 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.12] disabled:cursor-not-allowed disabled:opacity-40"
    >
      <span style={{ color }}>{icon}</span>
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
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gray-300">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-400">{label}</p>
        <p className="truncate text-sm font-semibold text-gray-100">
          {value}
        </p>
      </div>
    </div>
  );
}