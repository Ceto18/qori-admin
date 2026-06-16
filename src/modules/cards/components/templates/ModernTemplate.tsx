"use client";

import type { ReactNode } from "react";
import {
  BadgeCheck,
  Briefcase,
  Building2,
  FileText,
  Link2,
  MapPin,
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

  const profileImage = profilePreview || data.photo_perfil_url || "";
  const bannerImage = bannerPreview || data.photo_banner_url || "";

  const qualities = data.qualities ?? [];
  const documents = data.documents ?? [];
  const networks = data.networks ?? [];

  const filledQualities = qualities.filter((quality) => quality.name?.trim());

  const filledDocuments = documents.filter(Boolean);

  const filledNetworks = networks.filter(
    (network) =>
      network.uuid?.trim() ||
      network.name?.trim() ||
      network.value?.trim()
  );

  return (
    <div
      className="mx-auto w-full min-w-[320px] max-w-[390px] overflow-hidden rounded-[32px] p-[1.5px] shadow-xl"
      style={{
        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
      }}
    >
      <div className="overflow-hidden rounded-[30px] bg-white dark:bg-gray-950">
        {/* BANNER + FOTO */}
        <div className="relative">
          <div
            className="relative h-40 bg-cover bg-center"
            style={{
              backgroundColor: primaryColor,
              backgroundImage: bannerImage
                ? `url(${bannerImage})`
                : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/35" />

            <div className="absolute left-5 top-5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
              Tarjeta digital
            </div>
          </div>

          <div className="absolute left-1/2 top-full z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-gray-100 text-3xl font-bold text-gray-500 shadow-lg dark:border-gray-950 dark:bg-gray-800 dark:text-gray-300">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={data.full_name || "Foto de perfil"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound size={42} />
              )}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-5 pb-5 pt-16">
          <div className="max-h-[500px] overflow-y-auto pr-1">
            {/* NAME INFO */}
            <div className="text-center">
              <h3 className="break-words text-xl font-bold leading-tight text-gray-900 dark:text-white">
                {data.full_name || "Nombre completo"}
              </h3>

              <p className="mt-1 break-words text-sm font-medium text-gray-500 dark:text-gray-400">
                {data.position || "Cargo"}
              </p>

              {data.institution && (
                <p className="mt-1 break-words text-xs text-gray-400">
                  {data.institution}
                </p>
              )}
            </div>

            {/* QUICK ACTIONS */}
            {filledNetworks.length > 0 && (
              <div className="mt-5 grid grid-cols-2 gap-3">
                {filledNetworks.slice(0, 2).map((network, index) => (
                  <QuickNetworkAction
                    key={`${network.uuid}-${index}`}
                    name={network.name}
                    icon={network.icon_url}
                    value={network.value}
                    color={index === 0 ? primaryColor : secondaryColor}
                  />
                ))}
              </div>
            )}

            {/* TAGS */}
            {(data.position || data.profession) && (
              <div className="mt-5 max-h-24 overflow-y-auto rounded-2xl bg-gray-50 p-2 dark:bg-white/[0.04]">
                <div className="flex flex-wrap justify-center gap-2">
                  {data.position && (
                    <span
                      className="inline-flex max-w-full items-center gap-1.5 break-words rounded-full px-3 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Briefcase size={13} />
                      {data.position}
                    </span>
                  )}

                  {data.profession && (
                    <span className="inline-flex max-w-full items-center gap-1.5 break-words rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm dark:bg-white/[0.06] dark:text-gray-300">
                      {data.profession}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* DESCRIPTION */}
            {data.description ? (
              <div className="mt-5 max-h-32 overflow-y-auto rounded-2xl bg-gray-50 px-3 py-3 dark:bg-white/[0.04]">
                <p className="break-words text-center text-sm leading-6 text-gray-500 dark:text-gray-400">
                  {data.description}
                </p>
              </div>
            ) : (
              <p className="mt-5 text-center text-sm leading-6 text-gray-400 dark:text-gray-500">
                Agrega una breve descripción para que tus clientes conozcan más
                sobre ti o tu empresa.
              </p>
            )}

            {/* INFO */}
            <div className="mt-5 space-y-3">
              <InfoItem
                icon={<Building2 size={17} />}
                label="Empresa"
                value={data.institution}
              />

              <InfoItem
                icon={<MapPin size={17} />}
                label="Ubicación"
                value={data.ubication}
              />
            </div>

            {/* QUALITIES */}
            {filledQualities.length > 0 && (
              <div className="mt-5">
                <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  <BadgeCheck size={14} />
                  Características
                </h4>

                <div className="max-h-28 overflow-y-auto rounded-2xl bg-gray-50 p-2 dark:bg-white/[0.04]">
                  <div className="flex flex-wrap gap-2">
                    {filledQualities.map((quality, index) => (
                      <span
                        key={`${quality.name}-${index}`}
                        className="max-w-full break-words rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm dark:bg-white/[0.06] dark:text-gray-300"
                      >
                        {quality.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* NETWORKS */}
            {filledNetworks.length > 0 && (
              <div className="mt-5">
                <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  <Link2 size={14} />
                  Redes sociales
                </h4>

                <div className="max-h-40 space-y-3 overflow-y-auto">
                  {filledNetworks.map((network, index) => (
                    <NetworkItem
                      key={`${network.uuid}-${index}`}
                      name={network.name}
                      icon={network.icon_url}
                      value={network.value}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* DOCUMENTS */}
            {filledDocuments.length > 0 && (
              <div className="mt-5">
                <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  <FileText size={14} />
                  Documentos
                </h4>

                <div className="max-h-40 space-y-3 overflow-y-auto">
                  {filledDocuments.map((document, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-3 py-3 dark:border-white/[0.06] dark:bg-white/[0.04]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm dark:bg-gray-900 dark:text-gray-300">
                        <FileText size={17} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-gray-400">
                          Documento
                        </p>

                        <p className="truncate text-sm font-semibold text-gray-700 dark:text-gray-200">
                          {document instanceof File
                            ? document.name
                            : `Documento ${index + 1}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECONDARY ACTIONS */}
            {filledNetworks.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-3">
                {filledNetworks.slice(0, 2).map((network, index) => (
                  <ActionNetworkButton
                    key={`${network.uuid}-action-${index}`}
                    name={network.name}
                    icon={network.icon_url}
                    value={network.value}
                    color={index === 0 ? primaryColor : secondaryColor}
                  />
                ))}
              </div>
            )}

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
    </div>
  );
}

function QuickNetworkAction({
  name,
  icon,
  value,
  color,
}: {
  name?: string;
  icon?: string | null;
  value?: string;
  color: string;
}) {
  return (
    <button
      type="button"
      disabled={!value}
      className="flex min-w-0 items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      style={{ backgroundColor: color }}
    >
      <NetworkIcon icon={icon} name={name} compact />
      <span className="min-w-0 truncate">{name || "Red"}</span>
    </button>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value?: string;
}) {
  if (!value) return null;

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-3 py-3 dark:border-white/[0.06] dark:bg-white/[0.04]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm dark:bg-gray-900 dark:text-gray-300">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-gray-400">{label}</p>

        <p className="truncate text-sm font-semibold text-gray-700 dark:text-gray-200">
          {value}
        </p>
      </div>
    </div>
  );
}

function NetworkItem({
  name,
  icon,
  value,
}: {
  name?: string;
  icon?: string | null;
  value?: string;
}) {
  if (!name && !value) return null;

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-3 py-3 dark:border-white/[0.06] dark:bg-white/[0.04]">
      <NetworkIcon icon={icon} name={name} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-gray-400">
          {name || "Red social"}
        </p>

        {value && (
          <p className="truncate text-sm font-semibold text-gray-700 dark:text-gray-200">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

function ActionNetworkButton({
  name,
  icon,
  value,
  color,
}: {
  name?: string;
  icon?: string | null;
  value?: string;
  color: string;
}) {
  return (
    <button
      type="button"
      disabled={!value}
      className="flex min-w-0 items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white px-3 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-gray-200"
    >
      <span style={{ color }}>
        <NetworkIcon icon={icon} name={name} compact />
      </span>

      <span className="min-w-0 truncate">{name || "Red"}</span>
    </button>
  );
}

function NetworkIcon({
  icon,
  name,
  compact = false,
}: {
  icon?: string | null;
  name?: string;
  compact?: boolean;
}) {
  const sizeClass = compact ? "h-5 w-5" : "h-10 w-10";
  const imageSizeClass = compact ? "h-4 w-4" : "h-5 w-5";

  if (!icon) {
    return (
      <span
        className={`flex ${sizeClass} shrink-0 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm dark:bg-gray-900 dark:text-gray-300`}
      >
        <Link2 size={compact ? 15 : 17} />
      </span>
    );
  }

  return (
    <span
      className={`flex ${sizeClass} shrink-0 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-gray-900`}
    >
      <img
        src={icon}
        alt={name || "Red social"}
        className={`${imageSizeClass} object-contain`}
      />
    </span>
  );
}