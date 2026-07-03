"use client";

import type { ReactNode } from "react";
import {
    BadgeCheck,
    FileText,
    Link2,
    MapPin,
    WalletCards,
} from "lucide-react";

import { CardFormValues } from "../../types";

interface Props {
    data: CardFormValues;
    profilePreview: string;
    bannerPreview: string;
}

export default function MinimalTemplate({
    data,
    profilePreview,
}: Props) {
    const primaryColor = data.primary_color || "#111827";
    const profileImage = profilePreview || data.photo_perfil_url || "";

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
        <div className="w-full min-w-[320px] max-w-[380px] overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:border-white/[0.08] dark:bg-gray-950">
            <div className="max-h-[640px] overflow-y-auto p-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10">
                <div className="flex flex-col items-center text-center">
                    <div
                        className="mb-5 h-1 w-16 rounded-full"
                        style={{ backgroundColor: primaryColor }}
                    />

                    <div className="relative">
                        <div
                            className="absolute inset-0 rounded-full opacity-20 blur-2xl"
                            style={{ backgroundColor: primaryColor }}
                        />

                        <div className="relative rounded-full bg-white p-1.5 shadow-[0_14px_35px_rgba(15,23,42,0.16)] dark:bg-gray-950">
                            <div
                                className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full text-3xl font-bold text-white ring-4 ring-gray-50 dark:ring-white/[0.06]"
                                style={{ backgroundColor: primaryColor }}
                            >
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt={data.full_name || "Perfil"}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    data.full_name?.charAt(0)?.toUpperCase() ||
                                    "?"
                                )}
                            </div>
                        </div>
                    </div>

                    <h3 className="mt-5 break-words text-[22px] font-extrabold leading-tight text-gray-950 dark:text-white">
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
                                <p className="max-w-full break-words rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-white/[0.06] dark:text-gray-400">
                                    {data.institution}
                                </p>
                            )}

                            {data.profession && (
                                <p className="max-w-full break-words text-xs font-medium text-gray-400">
                                    {data.profession}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {data.description && (
                    <div className="mt-6 max-h-32 overflow-y-auto rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white px-4 py-4 shadow-sm dark:border-white/[0.06] dark:from-white/[0.04] dark:to-white/[0.02]">
                        <p className="break-words text-center text-sm leading-6 text-gray-600 dark:text-gray-300">
                            {data.description}
                        </p>
                    </div>
                )}

                <div className="mt-6 space-y-3">
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
                            <div className="flex flex-wrap justify-center gap-2">
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

                {filledNetworks.length > 0 && (
                    <SectionTitle
                        icon={<Link2 size={14} />}
                        title="Redes sociales"
                    >
                        <div className="max-h-40 space-y-3 overflow-y-auto pr-1">
                            {filledNetworks.map((network, index) => (
                                <NetworkInfo
                                    key={`${network.uuid}-${index}`}
                                    name={network.name}
                                    icon={network.icon_url}
                                    value={network.value}
                                    color={primaryColor}
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
                                    className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-3 py-3 text-sm text-gray-600 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-gray-300 dark:hover:bg-white/[0.07]"
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

                <div className="mt-6 space-y-3">
                    <button
                        type="button"
                        className="w-full rounded-2xl px-4 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                        style={{
                            backgroundColor: primaryColor,
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
        <div className="mt-6">
            <h4 className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
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

function NetworkInfo({
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
    if (!name && !value) return null;

    return (
        <div className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-3 py-3 text-sm text-gray-600 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-gray-300 dark:hover:bg-white/[0.07]">
            <NetworkIcon icon={icon} name={name} color={color} />

            <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-xs font-bold text-gray-800 dark:text-gray-100">
                    {name || "Red social"}
                </p>

                {value && (
                    <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
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
    color,
}: {
    icon?: string | null;
    name?: string;
    color: string;
}) {
    if (!icon) {
        return (
            <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-sm"
                style={{ backgroundColor: color }}
            >
                <Link2 size={16} />
            </span>
        );
    }

    return (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm dark:border-white/[0.08] dark:bg-white/[0.06]">
            <img
                src={icon}
                alt={name || "Red social"}
                className="h-4 w-4 object-contain"
            />
        </span>
    );
}