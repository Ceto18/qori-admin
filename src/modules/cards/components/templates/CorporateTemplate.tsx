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
        <div
            className="mx-auto w-full min-w-[320px] max-w-[390px] overflow-hidden rounded-[34px] p-[1.5px] shadow-[0_26px_80px_rgba(2,6,23,0.35)]"
            style={{
                background: `linear-gradient(135deg, ${primaryColor}, rgba(255,255,255,0.22), ${secondaryColor})`,
            }}
        >
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950">
                <div
                    className="pointer-events-none absolute -right-20 top-10 h-56 w-56 rounded-full opacity-25 blur-3xl"
                    style={{ backgroundColor: primaryColor }}
                />

                <div
                    className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full opacity-20 blur-3xl"
                    style={{ backgroundColor: secondaryColor }}
                />

                <div className="relative">
                    <div
                        className="relative h-44 overflow-hidden bg-cover bg-center"
                        style={{
                            backgroundColor: secondaryColor,
                            backgroundImage: bannerImage
                                ? `url(${bannerImage})`
                                : `linear-gradient(135deg, ${secondaryColor}, ${primaryColor})`,
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-slate-950/35 to-slate-950" />

                        <div
                            className="absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-35 blur-3xl"
                            style={{ backgroundColor: primaryColor }}
                        />

                        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-sm backdrop-blur-md">
                            <Building2 size={14} />
                            Corporativa
                        </div>

                        <div className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                            <span
                                className="h-2 w-2 rounded-full shadow-[0_0_0_4px_rgba(255,255,255,0.15)]"
                                style={{ backgroundColor: primaryColor }}
                            />
                            Business Card
                        </div>
                    </div>

                    <div className="absolute left-1/2 top-full z-10 -translate-x-1/2 -translate-y-1/2">
                        <div className="rounded-[2rem] border border-white/10 bg-slate-950 p-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
                            <div
                                className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-[1.65rem] border-[3px] bg-white/10 text-3xl font-bold text-white ring-1 ring-white/10"
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
                                        <UserRound size={42} />
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative px-5 pb-5 pt-16">
                    <div className="max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                        <div className="text-center">
                            <h3 className="break-words text-[22px] font-extrabold leading-tight text-white">
                                {data.full_name || "Nombre completo"}
                            </h3>

                            <p
                                className="mt-1 break-words text-sm font-bold"
                                style={{ color: primaryColor }}
                            >
                                {data.position || "Cargo"}
                            </p>

                            {data.profession && (
                                <p className="mt-1 break-words text-xs font-medium text-slate-400">
                                    {data.profession}
                                </p>
                            )}
                        </div>

                        <div className="mt-5 rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
                                    style={{
                                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                                    }}
                                >
                                    <Building2 size={20} />
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
                                <div className="mt-4 max-h-32 overflow-y-auto rounded-2xl border border-white/10 bg-black/15 px-3 py-3">
                                    <p className="break-words text-sm leading-6 text-slate-300">
                                        {data.description}
                                    </p>
                                </div>
                            ) : (
                                <p className="mt-4 rounded-2xl border border-dashed border-white/10 bg-black/10 px-3 py-3 text-sm leading-6 text-slate-400">
                                    Agrega una descripción corporativa para
                                    presentar mejor tu perfil profesional o tu
                                    empresa.
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
                                                    className="max-w-full break-words rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-slate-200 shadow-sm"
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
                                <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
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
                                <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
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
                                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                                                style={{
                                                    backgroundColor:
                                                        primaryColor,
                                                }}
                                            >
                                                <FileText size={17} />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs font-medium text-slate-400">
                                                    Documento
                                                </p>

                                                <p className="truncate text-sm font-semibold text-slate-100">
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

                        <div className="mt-6 space-y-3">
                            <button
                                type="button"
                                className="flex w-full items-center justify-center rounded-2xl px-4 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                                style={{
                                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                                    boxShadow: `0 14px 30px ${primaryColor}35`,
                                }}
                            >
                                Contactar ahora
                            </button>

                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white px-4 py-3.5 text-sm font-bold text-slate-950 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-xl active:translate-y-0"
                            >
                                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-950 text-white">
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
        <div className="mt-5 rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
            <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
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
        <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white/[0.09] hover:shadow-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-slate-300 shadow-sm">
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
        <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white/[0.09] hover:shadow-md">
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