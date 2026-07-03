"use client";

import type { ReactNode } from "react";
import {
    BadgeCheck,
    Crown,
    FileText,
    Link2,
    MapPin,
    Sparkles,
    UserRound,
    WalletCards,
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
            className="mx-auto w-full min-w-[320px] max-w-[390px] overflow-hidden rounded-[36px] p-[2px] shadow-[0_28px_90px_rgba(2,6,23,0.45)]"
            style={{
                background: `linear-gradient(135deg, ${primaryColor}, rgba(255,255,255,0.35), ${secondaryColor})`,
            }}
        >
            <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-gray-950">
                <div
                    className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full opacity-25 blur-3xl"
                    style={{ backgroundColor: primaryColor }}
                />

                <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl" />

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
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-gray-950" />

                        <div
                            className="absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-40 blur-3xl"
                            style={{ backgroundColor: primaryColor }}
                        />

                        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/15 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white shadow-sm backdrop-blur-md">
                            <Crown size={14} />
                            Premium
                        </div>

                        <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/15 text-white shadow-sm backdrop-blur-md">
                            <Sparkles size={16} />
                        </div>

                        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                            <span className="rounded-full bg-black/25 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                                Digital Pass
                            </span>

                            <span
                                className="h-2.5 w-2.5 rounded-full shadow-[0_0_0_5px_rgba(255,255,255,0.16)]"
                                style={{ backgroundColor: primaryColor }}
                            />
                        </div>
                    </div>

                    <div className="absolute left-1/2 top-full z-10 -translate-x-1/2 -translate-y-1/2">
                        <div className="rounded-[2rem] bg-gray-950 p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
                            <div
                                className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-[1.6rem] border-[3px] bg-white/10 text-3xl font-bold text-white"
                                style={{
                                    borderColor: primaryColor,
                                    boxShadow: `0 18px 45px ${primaryColor}35`,
                                }}
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
                                        <UserRound size={42} />
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative px-5 pb-6 pt-16">
                    <div className="max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                        <div className="text-center">
                            <h3 className="break-words text-2xl font-extrabold leading-tight text-white">
                                {data.full_name || "Nombre completo"}
                            </h3>

                            <p
                                className="mt-1 break-words text-sm font-bold"
                                style={{ color: primaryColor }}
                            >
                                {data.position || "Cargo"}
                            </p>

                            {(data.institution || data.profession) && (
                                <div className="mt-3 flex flex-col items-center gap-1">
                                    {data.institution && (
                                        <p className="max-w-full break-words rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-xs font-medium text-gray-300">
                                            {data.institution}
                                        </p>
                                    )}

                                    {data.profession && (
                                        <p className="max-w-full break-words text-xs font-medium text-gray-500">
                                            {data.profession}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
                            {data.description ? (
                                <div className="max-h-32 overflow-y-auto rounded-2xl border border-white/10 bg-black/15 px-3 py-3">
                                    <p className="break-words text-center text-sm leading-6 text-gray-300">
                                        {data.description}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-center text-sm leading-6 text-gray-400">
                                    Agrega una presentación breve para destacar
                                    tu perfil, experiencia o propuesta
                                    profesional.
                                </p>
                            )}
                        </div>

                        {filledNetworks.length > 0 && (
                            <div className="mt-5 grid grid-cols-2 gap-3">
                                {filledNetworks
                                    .slice(0, 2)
                                    .map((network, index) => (
                                        <PrimaryNetworkAction
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

                        <div className="mt-5 space-y-3">
                            <InfoItem
                                icon={<MapPin size={17} />}
                                label="Ubicación"
                                value={data.ubication}
                            />
                        </div>

                        {filledQualities.length > 0 && (
                            <SectionBox
                                icon={<BadgeCheck size={14} />}
                                title="Características"
                            >
                                <div className="max-h-28 overflow-y-auto rounded-2xl border border-white/10 bg-black/15 p-3">
                                    <div className="flex flex-wrap gap-2">
                                        {filledQualities.map(
                                            (quality, index) => (
                                                <span
                                                    key={`${quality.name}-${index}`}
                                                    className="max-w-full break-words rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-gray-200 shadow-sm"
                                                >
                                                    {quality.name}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </SectionBox>
                        )}

                        {filledNetworks.length > 0 && (
                            <div className="mt-5">
                                <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                                    <Link2 size={14} />
                                    Redes sociales
                                </h4>

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
                            </div>
                        )}

                        {filledDocuments.length > 0 && (
                            <div className="mt-5">
                                <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                                    <FileText size={14} />
                                    Documentos
                                </h4>

                                <div className="max-h-40 space-y-3 overflow-y-auto pr-1">
                                    {filledDocuments.map((document, index) => (
                                        <div
                                            key={index}
                                            className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white/[0.09] hover:shadow-md"
                                        >
                                            <div
                                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-gray-950 shadow-sm"
                                                style={{
                                                    backgroundColor:
                                                        primaryColor,
                                                }}
                                            >
                                                <FileText size={17} />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs font-medium text-gray-400">
                                                    Documento
                                                </p>

                                                <p className="truncate text-sm font-semibold text-gray-100">
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
                            </div>
                        )}

                        {filledNetworks.length > 0 && (
                            <div className="mt-6 grid grid-cols-2 gap-3">
                                {filledNetworks
                                    .slice(0, 2)
                                    .map((network, index) => (
                                        <SecondaryNetworkAction
                                            key={`${network.uuid}-secondary-${index}`}
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
                                className="flex w-full items-center justify-center rounded-2xl px-4 py-3.5 text-sm font-extrabold text-gray-950 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                                style={{
                                    background: `linear-gradient(135deg, ${primaryColor}, #fff2c2)`,
                                    boxShadow: `0 14px 30px ${primaryColor}35`,
                                }}
                            >
                                Guardar contacto
                            </button>

                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white px-4 py-3.5 text-sm font-bold text-gray-950 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-xl active:translate-y-0"
                            >
                                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-950 text-white">
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

function SectionBox({
    icon,
    title,
    children,
}: {
    icon: ReactNode;
    title: string;
    children: ReactNode;
}) {
    return (
        <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
            <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                {icon}
                {title}
            </h4>

            {children}
        </div>
    );
}

function PrimaryNetworkAction({
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
            className="flex min-w-0 items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-bold text-gray-950 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
            style={{ backgroundColor: color }}
        >
            <NetworkIcon icon={icon} name={name} compact />

            <span className="min-w-0 truncate">{name || value || "Red"}</span>
        </button>
    );
}

function SecondaryNetworkAction({
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
            className="flex min-w-0 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.07] px-3 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white/[0.12] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
        >
            <span className="shrink-0" style={{ color }}>
                <NetworkIcon icon={icon} name={name} compact />
            </span>

            <span className="min-w-0 truncate">{value || name || "Red"}</span>
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
        <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white/[0.09] hover:shadow-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gray-300">
                {icon}
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-400">{label}</p>

                <p className="truncate text-sm font-semibold text-gray-100">
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
        <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white/[0.09] hover:shadow-md">
            <NetworkIcon icon={icon} name={name} />

            <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-gray-400">
                    {name || "Red social"}
                </p>

                {value && (
                    <p className="truncate text-sm font-semibold text-gray-100">
                        {value}
                    </p>
                )}
            </div>
        </div>
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
                className={`flex ${sizeClass} shrink-0 items-center justify-center rounded-xl bg-white/10 text-gray-300`}
            >
                <Link2 size={compact ? 15 : 17} />
            </span>
        );
    }

    return (
        <span
            className={`flex ${sizeClass} shrink-0 items-center justify-center rounded-xl bg-white/10`}
        >
            <img
                src={icon}
                alt={name || "Red social"}
                className={`${imageSizeClass} object-contain`}
            />
        </span>
    );
}