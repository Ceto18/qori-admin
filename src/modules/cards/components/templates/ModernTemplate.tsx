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
    WalletCards,
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

    const filledQualities = qualities.filter((quality) =>
        quality.name?.trim()
    );

    const filledDocuments = documents.filter(Boolean);

    const filledNetworks = networks.filter(
        (network) =>
            network.uuid?.trim() ||
            network.name?.trim() ||
            network.value?.trim()
    );

    return (
        <div
            className="mx-auto w-full min-w-[320px] max-w-[390px] overflow-hidden rounded-[34px] p-[1.5px] shadow-[0_24px_70px_rgba(15,23,42,0.18)]"
            style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            }}
        >
            <div className="overflow-hidden rounded-[32px] bg-white dark:bg-gray-950">
                <div className="relative">
                    <div
                        className="relative h-44 overflow-hidden bg-cover bg-center"
                        style={{
                            backgroundColor: primaryColor,
                            backgroundImage: bannerImage
                                ? `url(${bannerImage})`
                                : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/60" />

                        <div
                            className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-40 blur-3xl"
                            style={{ backgroundColor: primaryColor }}
                        />

                        <div
                            className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full opacity-35 blur-3xl"
                            style={{ backgroundColor: secondaryColor }}
                        />

                        <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-sm backdrop-blur-md">
                            Tarjeta digital
                        </div>

                        <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-black/25 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.2)]" />
                            Activa
                        </div>
                    </div>

                    <div className="absolute left-1/2 top-full z-10 -translate-x-1/2 -translate-y-1/2">
                        <div className="rounded-[2rem] bg-white p-1.5 shadow-[0_16px_40px_rgba(15,23,42,0.28)] dark:bg-gray-950">
                            <div
                                className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-[1.65rem] border-[3px] bg-gray-100 text-3xl font-bold text-white dark:bg-gray-800"
                                style={{ borderColor: primaryColor }}
                            >
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt={
                                            data.full_name || "Foto de perfil"
                                        }
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span
                                        className="flex h-full w-full items-center justify-center"
                                        style={{
                                            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                                        }}
                                    >
                                        {data.full_name
                                            ?.charAt(0)
                                            ?.toUpperCase() || (
                                            <UserRound size={42} />
                                        )}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-5 pb-5 pt-16">
                    <div className="max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10">
                        <div className="text-center">
                            <h3 className="break-words text-[22px] font-extrabold leading-tight text-gray-950 dark:text-white">
                                {data.full_name || "Nombre completo"}
                            </h3>

                            <p
                                className="mt-1 break-words text-sm font-bold"
                                style={{ color: primaryColor }}
                            >
                                {data.position || "Cargo"}
                            </p>

                            {data.institution && (
                                <p className="mt-2 break-words text-xs font-medium text-gray-400">
                                    {data.institution}
                                </p>
                            )}
                        </div>

                        {filledNetworks.length > 0 && (
                            <div className="mt-5 grid grid-cols-2 gap-3">
                                {filledNetworks
                                    .slice(0, 2)
                                    .map((network, index) => (
                                        <QuickNetworkAction
                                            key={`${network.uuid}-${index}`}
                                            name={network.name}
                                            icon={network.icon_url}
                                            value={network.value}
                                            color={
                                                index === 0
                                                    ? primaryColor
                                                    : secondaryColor
                                            }
                                        />
                                    ))}
                            </div>
                        )}

                        {(data.position || data.profession) && (
                            <div className="mt-5 max-h-24 overflow-y-auto rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-3 shadow-sm dark:border-white/[0.06] dark:from-white/[0.04] dark:to-white/[0.02]">
                                <div className="flex flex-wrap justify-center gap-2">
                                    {data.position && (
                                        <span
                                            className="inline-flex max-w-full items-center gap-1.5 break-words rounded-full px-3 py-1.5 text-xs font-bold text-white shadow-sm"
                                            style={{
                                                backgroundColor: primaryColor,
                                            }}
                                        >
                                            <Briefcase size={13} />
                                            {data.position}
                                        </span>
                                    )}

                                    {data.profession && (
                                        <span className="inline-flex max-w-full items-center gap-1.5 break-words rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.06] dark:text-gray-300">
                                            {data.profession}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {data.description ? (
                            <div className="mt-5 max-h-32 overflow-y-auto rounded-3xl border border-gray-100 bg-gray-50/80 px-4 py-4 shadow-sm dark:border-white/[0.06] dark:bg-white/[0.04]">
                                <p className="break-words text-center text-sm leading-6 text-gray-600 dark:text-gray-300">
                                    {data.description}
                                </p>
                            </div>
                        ) : (
                            <p className="mt-5 rounded-3xl border border-dashed border-gray-200 bg-gray-50 px-4 py-4 text-center text-sm leading-6 text-gray-400 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-gray-500">
                                Agrega una breve descripción para que tus
                                clientes conozcan más sobre ti o tu empresa.
                            </p>
                        )}

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

                        {filledQualities.length > 0 && (
                            <SectionTitle
                                icon={<BadgeCheck size={14} />}
                                title="Características"
                            >
                                <div className="max-h-28 overflow-y-auto rounded-3xl border border-gray-100 bg-gray-50/80 p-3 dark:border-white/[0.06] dark:bg-white/[0.04]">
                                    <div className="flex flex-wrap gap-2">
                                        {filledQualities.map(
                                            (quality, index) => (
                                                <span
                                                    key={`${quality.name}-${index}`}
                                                    className="max-w-full break-words rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.06] dark:text-gray-300"
                                                >
                                                    {quality.name}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </SectionTitle>
                        )}

                        {filledNetworks.length > 0 && (
                            <SectionTitle
                                icon={<Link2 size={14} />}
                                title="Redes sociales"
                            >
                                <div className="max-h-40 space-y-3 overflow-y-auto pr-1">
                                    {filledNetworks.map((network, index) => (
                                        <NetworkItem
                                            key={`${network.uuid}-${index}`}
                                            name={network.name}
                                            icon={network.icon_url}
                                            value={network.value}
                                        />
                                    ))}
                                </div>
                            </SectionTitle>
                        )}

                        {filledDocuments.length > 0 && (
                            <SectionTitle
                                icon={<FileText size={14} />}
                                title="Documentos"
                            >
                                <div className="max-h-40 space-y-3 overflow-y-auto pr-1">
                                    {filledDocuments.map((document, index) => (
                                        <div
                                            key={index}
                                            className="group flex items-center gap-3 rounded-3xl border border-gray-100 bg-gray-50 px-3 py-3 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-white/[0.06] dark:bg-white/[0.04] dark:hover:bg-white/[0.07]"
                                        >
                                            <div
                                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm"
                                                style={{
                                                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                                                }}
                                            >
                                                <FileText size={17} />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs font-medium text-gray-400">
                                                    Documento
                                                </p>

                                                <p className="truncate text-sm font-bold text-gray-700 dark:text-gray-200">
                                                    {document instanceof File
                                                        ? document.name
                                                        : `Documento ${
                                                              index + 1
                                                          }`}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SectionTitle>
                        )}

                        {filledNetworks.length > 0 && (
                            <div className="mt-6 grid grid-cols-2 gap-3">
                                {filledNetworks
                                    .slice(0, 2)
                                    .map((network, index) => (
                                        <ActionNetworkButton
                                            key={`${network.uuid}-action-${index}`}
                                            name={network.name}
                                            icon={network.icon_url}
                                            value={network.value}
                                            color={
                                                index === 0
                                                    ? primaryColor
                                                    : secondaryColor
                                            }
                                        />
                                    ))}
                            </div>
                        )}

                        <div className="mt-5 space-y-3">
                            <button
                                type="button"
                                className="flex w-full items-center justify-center rounded-2xl px-4 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                                style={{
                                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                                    boxShadow: `0 14px 30px ${primaryColor}35`,
                                }}
                            >
                                Guardar contacto
                            </button>

                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-gray-950 px-4 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-black hover:shadow-xl active:translate-y-0 dark:border-white/[0.08] dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100"
                            >
                                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-gray-950 dark:bg-gray-950 dark:text-white">
                                    <WalletCards size={15} />
                                </span>

                                Agregar a Google Wallet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SectionTitle({
    icon,
    title,
    children,
}: {
    icon: ReactNode;
    title: string;
    children: ReactNode;
}) {
    return (
        <div className="mt-5">
            <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                {icon}
                {title}
            </h4>

            {children}
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
            className="flex min-w-0 items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
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
        <div className="flex items-center gap-3 rounded-3xl border border-gray-100 bg-gray-50 px-3 py-3 shadow-sm dark:border-white/[0.06] dark:bg-white/[0.04]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-gray-500 shadow-sm dark:bg-gray-900 dark:text-gray-300">
                {icon}
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-400">{label}</p>

                <p className="truncate text-sm font-bold text-gray-700 dark:text-gray-200">
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
        <div className="group flex items-center gap-3 rounded-3xl border border-gray-100 bg-gray-50 px-3 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-white/[0.06] dark:bg-white/[0.04] dark:hover:bg-white/[0.07]">
            <NetworkIcon icon={icon} name={name} />

            <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-gray-400">
                    {name || "Red social"}
                </p>

                {value && (
                    <p className="truncate text-sm font-bold text-gray-700 dark:text-gray-200">
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
            className="flex min-w-0 items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white px-3 py-3 text-sm font-bold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-gray-200"
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
                className={`flex ${sizeClass} shrink-0 items-center justify-center rounded-2xl bg-white text-gray-500 shadow-sm dark:bg-gray-900 dark:text-gray-300`}
            >
                <Link2 size={compact ? 15 : 17} />
            </span>
        );
    }

    return (
        <span
            className={`flex ${sizeClass} shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-gray-900`}
        >
            <img
                src={icon}
                alt={name || "Red social"}
                className={`${imageSizeClass} object-contain`}
            />
        </span>
    );
}