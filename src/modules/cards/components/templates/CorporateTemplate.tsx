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

export default function CorporateTemplate({
    data,
    profilePreview,
    bannerPreview,
}: Props) {
    const primaryColor = data.primary_color || "#2563eb";
    const secondaryColor = data.secondary_color || "#0f172a";

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
        <div className="mx-auto w-full min-w-[320px] max-w-[390px] overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 shadow-xl dark:border-white/[0.08]">
            {/* HEADER + PROFILE */}
            <div className="relative">
                <div
                    className="relative h-40 bg-cover bg-center"
                    style={{
                        backgroundColor: secondaryColor,
                        backgroundImage: bannerImage
                            ? `url(${bannerImage})`
                            : `linear-gradient(135deg, ${secondaryColor}, ${primaryColor})`,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-slate-950" />

                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                        <Building2 size={14} />
                        Corporativa
                    </div>
                </div>

                <div className="absolute left-1/2 top-full z-10 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-slate-950 bg-white/10 text-3xl font-bold text-white shadow-xl ring-1 ring-white/10">
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
                    {/* NAME */}
                    <div className="text-center">
                        <h3 className="break-words text-xl font-bold leading-tight text-white">
                            {data.full_name || "Nombre completo"}
                        </h3>

                        <p className="mt-1 break-words text-sm font-medium text-slate-300">
                            {data.position || "Cargo"}
                        </p>

                        {data.profession && (
                            <p className="mt-1 break-words text-xs text-slate-400">
                                {data.profession}
                            </p>
                        )}
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

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-slate-400">
                                    Empresa
                                </p>

                                <p className="truncate text-sm font-bold text-white">
                                    {data.institution ||
                                        "Nombre de la empresa"}
                                </p>
                            </div>
                        </div>

                        {data.description ? (
                            <div className="mt-4 max-h-32 overflow-y-auto rounded-xl bg-white/[0.04] px-3 py-3">
                                <p className="break-words text-sm leading-6 text-slate-300">
                                    {data.description}
                                </p>
                            </div>
                        ) : (
                            <p className="mt-4 text-sm leading-6 text-slate-400">
                                Agrega una descripción corporativa para presentar
                                mejor tu perfil profesional o tu empresa.
                            </p>
                        )}
                    </div>

                    {/* QUICK NETWORKS */}
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
                                        color={primaryColor}
                                    />
                                ))}
                        </div>
                    )}

                    {/* INFO */}
                    <div className="mt-5 space-y-3">
                        <InfoItem
                            icon={<MapPin size={17} />}
                            label="Ubicación"
                            value={data.ubication}
                        />

                        <InfoItem
                            icon={<Briefcase size={17} />}
                            label="Área / Cargo"
                            value={data.position}
                        />
                    </div>

                    {/* QUALITIES */}
                    {filledQualities.length > 0 && (
                        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                            <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                <BadgeCheck size={14} />
                                Características
                            </h4>

                            <div className="max-h-28 overflow-y-auto rounded-xl bg-white/[0.04] p-2">
                                <div className="flex flex-wrap gap-2">
                                    {filledQualities.map((quality, index) => (
                                        <span
                                            key={`${quality.name}-${index}`}
                                            className="max-w-full break-words rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-slate-200"
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
                            <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
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
                            <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                <FileText size={14} />
                                Documentos
                            </h4>

                            <div className="max-h-40 space-y-3 overflow-y-auto">
                                {filledDocuments.map((document, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-3"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-slate-300">
                                            <FileText size={17} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-medium text-slate-400">
                                                Documento
                                            </p>

                                            <p className="truncate text-sm font-semibold text-slate-100">
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
            className="flex min-w-0 items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
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
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-slate-300">
                {icon}
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-400">{label}</p>

                <p className="truncate text-sm font-semibold text-slate-100">
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
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-3">
            <NetworkIcon icon={icon} name={name} />

            <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-slate-400">
                    {name || "Red social"}
                </p>

                {value && (
                    <p className="truncate text-sm font-semibold text-slate-100">
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
                className={`flex ${sizeClass} shrink-0 items-center justify-center rounded-xl bg-white/10 text-slate-300`}
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