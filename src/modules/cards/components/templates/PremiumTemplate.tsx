"use client";

import type { ReactNode } from "react";
import {
    BadgeCheck,
    BriefcaseBusiness,
    Download,
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
    const primaryColor = data.primary_color || "#d4af37";
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
        <div className="mx-auto w-full min-w-[320px] max-w-[390px]">
            <div className="relative overflow-hidden rounded-[34px] bg-white shadow-[0_28px_80px_rgba(15,23,42,0.20)] ring-1 ring-black/5 dark:bg-[#0b0f19] dark:ring-white/10">
                <div
                    className="absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-20 blur-3xl"
                    style={{ backgroundColor: primaryColor }}
                />

                <div
                    className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full opacity-10 blur-3xl"
                    style={{ backgroundColor: secondaryColor }}
                />

                <div className="relative h-44 overflow-hidden">
                    {bannerImage ? (
                        <img
                            src={bannerImage}
                            alt="Banner"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div
                            className="h-full w-full"
                            style={{
                                background: `
                                    radial-gradient(circle at 20% 15%, ${primaryColor} 0%, transparent 34%),
                                    linear-gradient(135deg, ${secondaryColor}, #020617)
                                `,
                            }}
                        />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/65" />

                    <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-white backdrop-blur-md">
                        <Sparkles size={13} />
                        Premium
                    </div>

                    {data.institution && (
                        <div className="absolute bottom-5 left-5 right-5">
                            <p className="truncate text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                                {data.institution}
                            </p>
                        </div>
                    )}
                </div>

                <div className="relative px-5 pb-5">
                    <div className="-mt-14 flex items-end justify-between gap-4">
                        <div
                            className="relative h-[112px] w-[112px] shrink-0 overflow-hidden rounded-[32px] border-[5px] border-white bg-gray-100 shadow-[0_20px_45px_rgba(15,23,42,0.20)] dark:border-[#0b0f19] dark:bg-white/10"
                            style={{
                                boxShadow: `0 20px 45px ${primaryColor}25`,
                            }}
                        >
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt={data.full_name || "Foto de perfil"}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div
                                    className="flex h-full w-full items-center justify-center text-white"
                                    style={{
                                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                                    }}
                                >
                                    <UserRound size={42} />
                                </div>
                            )}
                        </div>

                        {filledNetworks.length > 0 && (
                            <div className="mb-2 flex max-w-[205px] justify-end gap-2 overflow-hidden rounded-full border border-black/5 bg-white/85 p-1.5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
                                {filledNetworks.slice(0, 5).map((network, index) => (
                                    <button
                                        key={`${network.uuid}-${index}`}
                                        type="button"
                                        disabled={!network.value}
                                        title={network.name || "Red social"}
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all hover:-translate-y-0.5 hover:bg-gray-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-gray-950"
                                    >
                                        <NetworkIcon
                                            icon={network.icon_url}
                                            name={network.name}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-4">
                        <h3 className="break-words text-[26px] font-black leading-[1.05] tracking-[-0.04em] text-gray-950 dark:text-white">
                            {data.full_name || "Nombre completo"}
                        </h3>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span
                                className="inline-flex max-w-full items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black text-white shadow-sm"
                                style={{ backgroundColor: primaryColor }}
                            >
                                <BriefcaseBusiness size={13} />
                                <span className="truncate">
                                    {data.position || "Cargo profesional"}
                                </span>
                            </span>

                            {data.profession && (
                                <span className="inline-flex max-w-full rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600 dark:bg-white/10 dark:text-white/70">
                                    <span className="truncate">
                                        {data.profession}
                                    </span>
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mt-5 rounded-[26px] border border-gray-100 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/[0.05]">
                        <p className="max-h-28 overflow-y-auto break-words text-sm leading-6 text-gray-600 dark:text-gray-300">
                            {data.description ||
                                "Agrega una presentación breve para destacar tu experiencia, servicios o propuesta profesional."}
                        </p>
                    </div>

                    {data.ubication && (
                        <div className="mt-4">
                            <InfoRow
                                icon={<MapPin size={17} />}
                                label="Ubicación"
                                value={data.ubication}
                            />
                        </div>
                    )}

                    {filledQualities.length > 0 && (
                        <div className="mt-5">
                            <SectionHeader
                                icon={<BadgeCheck size={15} />}
                                title="Fortalezas"
                            />

                            <div className="mt-3 flex max-h-24 flex-wrap gap-2 overflow-y-auto">
                                {filledQualities.map((quality, index) => (
                                    <span
                                        key={`${quality.name}-${index}`}
                                        className="max-w-full rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white/80"
                                    >
                                        {quality.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {filledDocuments.length > 0 && (
                        <div className="mt-5">
                            <SectionHeader
                                icon={<FileText size={15} />}
                                title="Documentos"
                            />

                            <div className="mt-3 max-h-36 space-y-2 overflow-y-auto pr-1">
                                {filledDocuments.map((document: any, index) => {
                                    const documentName =
                                        document instanceof File
                                            ? document.name
                                            : document?.name || `Documento ${index + 1}`;

                                    const documentUrl =
                                        document instanceof File
                                            ? URL.createObjectURL(document)
                                            : document?.document_url || document?.url || "";

                                    return (
                                        <a
                                            key={document?.uuid || index}
                                            href={documentUrl || undefined}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-md dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.09]"
                                        >
                                            <div
                                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
                                                style={{
                                                    backgroundColor: primaryColor,
                                                }}
                                            >
                                                <FileText size={17} />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-bold text-gray-900 dark:text-white">
                                                    {documentName}
                                                </p>

                                                <p className="text-xs font-medium text-gray-400">
                                                    PDF disponible
                                                </p>
                                            </div>

                                            <Download
                                                size={16}
                                                className="shrink-0 text-gray-400"
                                            />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="mt-6 grid grid-cols-1 gap-3">
                        <button
                            type="button"
                            className="flex w-full items-center justify-center rounded-2xl px-4 py-3.5 text-sm font-black text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                            style={{
                                background: `linear-gradient(135deg, ${secondaryColor}, ${primaryColor})`,
                            }}
                        >
                            Guardar contacto
                        </button>

                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-black text-gray-950 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gray-50 active:translate-y-0 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                        >
                            <WalletCards size={17} />
                            Agregar a Google Wallet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SectionHeader({
    icon,
    title,
}: {
    icon: ReactNode;
    title: string;
}) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-white">
                {icon}
            </div>

            <h4 className="text-xs font-black uppercase tracking-[0.18em] text-gray-400">
                {title}
            </h4>
        </div>
    );
}

function InfoRow({
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
        <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-white">
                {icon}
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-gray-400">{label}</p>

                <p className="truncate text-sm font-bold text-gray-900 dark:text-white">
                    {value}
                </p>
            </div>
        </div>
    );
}

function NetworkIcon({
    icon,
    name,
}: {
    icon?: string | null;
    name?: string;
}) {
    if (!icon) {
        return <Link2 size={16} />;
    }

    return (
        <img
            src={icon}
            alt={name || "Red social"}
            className="h-4.5 w-4.5 object-contain"
        />
    );
}