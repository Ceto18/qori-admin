"use client";

import type { ReactNode } from "react";
import { BadgeCheck, FileText, Link2, MapPin } from "lucide-react";

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
            network.value?.trim() ||
            network.name?.trim()
    );

    const primaryColor = data.primary_color || "#2563eb";

    return (
        <div className="w-full min-w-[320px] max-w-[380px] overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)] dark:border-white/[0.08] dark:bg-gray-950">
            <div className="relative">
                <div
                    className="relative h-36 overflow-hidden bg-cover bg-center"
                    style={{
                        backgroundColor: primaryColor,
                        backgroundImage: bannerImage
                            ? `url(${bannerImage})`
                            : undefined,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/45" />

                    <div
                        className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-2xl"
                        style={{ backgroundColor: primaryColor }}
                    />

                    <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                        <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                            Perfil
                        </span>

                        <span className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.25)]" />
                    </div>
                </div>

                <div className="absolute left-1/2 top-full z-10 -translate-x-1/2 -translate-y-1/2">
                    <div className="rounded-full bg-white p-1.5 shadow-[0_12px_35px_rgba(15,23,42,0.25)] dark:bg-gray-950">
                        <div
                            className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] bg-gray-100 text-3xl font-bold text-white dark:bg-gray-800"
                            style={{ borderColor: primaryColor }}
                        >
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt={data.full_name || "Perfil"}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span
                                    className="flex h-full w-full items-center justify-center"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    {data.full_name?.charAt(0)?.toUpperCase() ||
                                        "?"}
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
                            className="mt-1 break-words text-sm font-semibold"
                            style={{ color: primaryColor }}
                        >
                            {data.position || "Cargo"}
                        </p>

                        {(data.institution || data.profession) && (
                            <div className="mt-3 flex flex-col items-center gap-1.5">
                                {data.institution && (
                                    <p className="max-w-full break-words text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                                        {data.institution}
                                    </p>
                                )}

                                {data.profession && (
                                    <p className="max-w-full break-words rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-white/[0.06] dark:text-gray-400">
                                        {data.profession}
                                    </p>
                                )}
                            </div>
                        )}

                        {filledNetworks.length > 0 && (
                            <div className="mt-4 flex justify-center">
                                <div className="flex max-w-full gap-2 overflow-x-auto rounded-full border border-gray-200 bg-gray-50 px-2 py-2 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.04]">
                                    {filledNetworks
                                        .slice(0, 6)
                                        .map((network, index) => (
                                            <button
                                                key={`${network.uuid}-${index}`}
                                                type="button"
                                                disabled={!network.value}
                                                title={
                                                    network.name ||
                                                    "Red social"
                                                }
                                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white/[0.08] dark:text-white"
                                            >
                                                <NetworkMiniIcon
                                                    icon={network.icon_url}
                                                    name={network.name}
                                                    color={primaryColor}
                                                />
                                            </button>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {data.description && (
                        <div className="mt-5 max-h-32 overflow-y-auto rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white px-4 py-4 shadow-sm dark:border-white/[0.06] dark:from-white/[0.04] dark:to-white/[0.02]">
                            <p className="break-words text-center text-sm leading-6 text-gray-600 dark:text-gray-300">
                                {data.description}
                            </p>
                        </div>
                    )}

                    <div className="mt-5 space-y-2">
                        <Info
                            icon={<MapPin size={16} />}
                            value={data.ubication}
                            color={primaryColor}
                        />
                    </div>

                    {filledQualities.length > 0 && (
                        <SectionTitle
                            icon={<BadgeCheck size={14} />}
                            title="Características"
                        >
                            <div className="max-h-28 overflow-y-auto rounded-2xl border border-gray-100 bg-gray-50/80 p-3 dark:border-white/[0.06] dark:bg-white/[0.04]">
                                <div className="flex flex-wrap gap-2">
                                    {filledQualities.map((quality, index) => (
                                        <span
                                            key={`${quality.name}-${index}`}
                                            className="max-w-full break-words rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.06] dark:text-gray-300"
                                        >
                                            {quality.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </SectionTitle>
                    )}

                    {filledDocuments.length > 0 && (
                        <SectionTitle
                            icon={<FileText size={14} />}
                            title="Documentos"
                        >
                            <div className="max-h-36 space-y-2 overflow-y-auto pr-1">
                                {filledDocuments.map((document, index) => (
                                    <div
                                        key={index}
                                        className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-3 py-3 text-sm text-gray-600 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-gray-300 dark:hover:bg-white/[0.07]"
                                    >
                                        <span
                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-sm"
                                            style={{
                                                backgroundColor: primaryColor,
                                            }}
                                        >
                                            <FileText size={16} />
                                        </span>

                                        <span className="min-w-0 flex-1 truncate font-medium">
                                            {document instanceof File
                                                ? document.name
                                                : `Documento ${index + 1}`}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </SectionTitle>
                    )}

                    <div className="mt-5 space-y-3">
                        <button
                            type="button"
                            className="w-full rounded-2xl px-4 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                            style={{
                                backgroundColor: primaryColor,
                                boxShadow: `0 14px 30px ${primaryColor}40`,
                            }}
                        >
                            Guardar contacto
                        </button>

                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-gray-950 px-4 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-black hover:shadow-xl active:translate-y-0 dark:border-white/[0.08] dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100"
                        >
                            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-[13px] font-black text-gray-950 dark:bg-gray-950 dark:text-white">
                                G
                            </span>

                            Agregar a Google Wallet
                        </button>
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
            <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                {icon}
                {title}
            </h4>

            {children}
        </div>
    );
}

function Info({
    icon,
    value,
    color,
}: {
    icon: ReactNode;
    value?: string;
    color: string;
}) {
    if (!value) return null;

    return (
        <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-3 py-3 text-sm text-gray-600 shadow-sm dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-gray-300">
            <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: color }}
            >
                {icon}
            </span>

            <span className="min-w-0 flex-1 truncate font-medium">
                {value}
            </span>
        </div>
    );
}

function NetworkMiniIcon({
    icon,
    name,
    color,
}: {
    icon?: string | null;
    name?: string;
    color: string;
}) {
    if (!icon) {
        return <Link2 size={16} style={{ color }} />;
    }

    return (
        <img
            src={icon}
            alt={name || "Red social"}
            className="h-[18px] w-[18px] object-contain"
        />
    );
}