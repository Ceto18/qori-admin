"use client";

import {
  Briefcase,
  Building2,
  Globe,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

import { CardFormValues } from "../../types";

interface Props {
  data: CardFormValues;
  profilePreview: string;
  bannerPreview: string;
}

export default function CorporateTemplate({
  data,
  profilePreview,
  bannerPreview,
}: Props) {
  const primaryColor = data.primary_color || "#2563eb";
  const secondaryColor = data.secondary_color || "#0f172a";

  return (
    <div className="mx-auto w-full max-w-[390px] overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 shadow-xl dark:border-white/[0.08]">
      {/* HEADER */}
      <div
        className="relative h-40 bg-cover bg-center"
        style={{
          backgroundColor: secondaryColor,
          backgroundImage: bannerPreview
            ? `url(${bannerPreview})`
            : `linear-gradient(135deg, ${secondaryColor}, ${primaryColor})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-slate-950" />

        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
          <Building2 size={14} />
          Corporativa
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative px-5 pb-5">
        {/* PROFILE */}
        <div className="-mt-14 flex justify-center">
          <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border-4 border-slate-950 bg-white/10 text-3xl font-bold text-white shadow-xl ring-1 ring-white/10">
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

        {/* NAME */}
        <div className="mt-4 text-center">
          <h3 className="text-xl font-bold leading-tight text-white">
            {data.full_name || "Nombre completo"}
          </h3>

          <p className="mt-1 text-sm font-medium text-slate-300">
            {data.position || "Cargo"}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {data.profession || "Profesión"}
          </p>
        </div>

        {/* COMPANY CARD */}
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
              style={{ backgroundColor: primaryColor }}
            >
              <Building2 size={19} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-400">Empresa</p>
              <p className="truncate text-sm font-bold text-white">
                {data.company || "Nombre de la empresa"}
              </p>
            </div>
          </div>

          {data.bio ? (
            <p className="mt-4 text-sm leading-6 text-slate-300">
              {data.bio}
            </p>
          ) : (
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Agrega una descripción corporativa para presentar mejor tu perfil
              profesional o tu empresa.
            </p>
          )}
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
            icon={<Mail size={18} />}
            label="Correo"
            value={data.email}
            color={primaryColor}
          />
        </div>

        {/* CONTACT */}
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

          <InfoItem
            icon={<Briefcase size={17} />}
            label="Área / Cargo"
            value={data.position}
          />
        </div>

        {/* CTA */}
        <button
          type="button"
          className="mt-6 flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-bold text-white shadow-lg transition hover:opacity-90"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          }}
        >
          Contactar ahora
        </button>
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
      className="flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
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
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-slate-300">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="truncate text-sm font-semibold text-slate-100">
          {value}
        </p>
      </div>
    </div>
  );
}