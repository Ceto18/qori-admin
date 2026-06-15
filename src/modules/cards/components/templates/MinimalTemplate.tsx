"use client";

import { BadgeCheck, FileText, Link2, MapPin } from "lucide-react";
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

    const qualities = data.qualities ?? [];
    const documents = data.documents ?? [];
    const networks = data.networks ?? [];

    const filledQualities = qualities.filter((quality) => quality.name?.trim());
    const filledDocuments = documents.filter(Boolean);
    const filledNetworks = networks.filter(
        (network) =>
            network.red_social?.trim() ||
            network.name?.trim() ||
            network.link?.trim()
    );

    return (
        <div className="w-full min-w-[320px] max-w-[380px] rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/[0.08] dark:bg-gray-900">
            <div className="flex flex-col items-center text-center">
                <div
                    className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full text-3xl font-bold text-white"
                    style={{ backgroundColor: primaryColor }}
                >
                    {profilePreview ? (
                        <img
                            src={profilePreview}
                            alt={data.full_name || "Perfil"}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        data.full_name?.charAt(0)?.toUpperCase() || "?"
                    )}
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                    {data.full_name || "Nombre completo"}
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {data.position || "Cargo"}
                </p>

                {data.company && (
                    <p className="mt-1 text-xs text-gray-400">
                        {data.company}
                    </p>
                )}

                {data.profession && (
                    <p className="mt-1 text-xs text-gray-400">
                        {data.profession}
                    </p>
                )}
            </div>

            {data.bio && (
                <p className="mt-5 text-center text-sm leading-6 text-gray-500 dark:text-gray-400">
                    {data.bio}
                </p>
            )}

            <div className="mt-6 space-y-3">
                <Info icon={<MapPin size={16} />} value={data.location} />
            </div>

            {filledQualities.length > 0 && (
                <div className="mt-6">
                    <h4 className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                        <BadgeCheck size={14} />
                        Características
                    </h4>

                    <div className="flex flex-wrap justify-center gap-2">
                        {filledQualities.map((quality, index) => (
                            <span
                                key={`${quality.name}-${index}`}
                                className="rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 dark:bg-white/[0.04] dark:text-gray-300"
                            >
                                {quality.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {filledNetworks.length > 0 && (
                <div className="mt-6">
                    <h4 className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                        <Link2 size={14} />
                        Redes sociales
                    </h4>

                    <div className="space-y-3">
                        {filledNetworks.map((network, index) => (
                            <NetworkInfo
                                key={`${network.red_social}-${index}`}
                                name={network.name}
                                icon={network.icon}
                                link={network.link}
                            />
                        ))}
                    </div>
                </div>
            )}

            {filledDocuments.length > 0 && (
                <div className="mt-6">
                    <h4 className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                        <FileText size={14} />
                        Documentos
                    </h4>

                    <div className="space-y-3">
                        {filledDocuments.map((document, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5 text-sm text-gray-500 dark:bg-white/[0.04] dark:text-gray-400"
                            >
                                <FileText size={16} />

                                <span className="truncate">
                                    {document instanceof File
                                        ? document.name
                                        : `Documento ${index + 1}`}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <button
                type="button"
                className="mt-6 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white"
                style={{ backgroundColor: primaryColor }}
            >
                Guardar contacto
            </button>
        </div>
    );
}

function Info({
    icon,
    value,
}: {
    icon: React.ReactNode;
    value?: string;
}) {
    if (!value) return null;

    return (
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{icon}</span>
            <span className="truncate">{value}</span>
        </div>
    );
}

function NetworkInfo({
    name,
    icon,
    link,
}: {
    name?: string;
    icon?: string | null;
    link?: string;
}) {
    if (!name && !link) return null;

    return (
        <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5 text-sm text-gray-600 dark:bg-white/[0.04] dark:text-gray-300">
            <NetworkIcon icon={icon} name={name} />

            <div className="min-w-0 flex-1 text-left">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                    {name || "Red social"}
                </p>

                {link && (
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                        {link}
                    </p>
                )}
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
        return (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm dark:bg-white/[0.06]">
                <Link2 size={16} />
            </span>
        );
    }

    return (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm dark:bg-white/[0.06]">
            <img
                src={icon}
                alt={name || "Red social"}
                className="h-4 w-4 object-contain"
            />
        </span>
    );
}