"use client";

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
    const qualities = data.qualities ?? [];
    const documents = data.documents ?? [];
    const networks = data.networks ?? [];

    const filledQualities = qualities.filter((quality) =>
        quality.name?.trim()
    );

    const filledDocuments = documents.filter(Boolean);

    const filledNetworks = networks.filter(
        (network) =>
            network.red_social?.trim() ||
            network.link?.trim() ||
            network.name?.trim()
    );

    return (
        <div className="w-full min-w-[320px] max-w-[380px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/[0.08] dark:bg-gray-900">
            <div
                className="h-32 bg-cover bg-center"
                style={{
                    backgroundColor: data.primary_color || "#2563eb",
                    backgroundImage: bannerPreview
                        ? `url(${bannerPreview})`
                        : undefined,
                }}
            />

            <div className="px-5 pb-5">
                <div className="-mt-14 flex justify-center">
                    <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-100 text-3xl font-bold text-gray-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-300">
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
                </div>

                <div className="mt-4 text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {data.full_name || "Nombre completo"}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
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
                    <p className="mt-4 text-center text-sm leading-6 text-gray-500 dark:text-gray-400">
                        {data.bio}
                    </p>
                )}

                <div className="mt-5 space-y-2">
                    <Info icon={<MapPin size={16} />} value={data.location} />
                </div>

                {filledQualities.length > 0 && (
                    <div className="mt-5">
                        <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                            <BadgeCheck size={14} />
                            Características
                        </h4>

                        <div className="flex flex-wrap gap-2">
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
                    <div className="mt-5">
                        <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                            <Link2 size={14} />
                            Redes sociales
                        </h4>

                        <div className="space-y-2">
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
                    <div className="mt-5">
                        <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                            <FileText size={14} />
                            Documentos
                        </h4>

                        <div className="space-y-2">
                            {filledDocuments.map((document, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5 text-sm text-gray-600 dark:bg-white/[0.04] dark:text-gray-300"
                                >
                                    <span className="text-gray-400">
                                        <FileText size={16} />
                                    </span>

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
                    className="mt-5 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white"
                    style={{ backgroundColor: data.primary_color || "#2563eb" }}
                >
                    Guardar contacto
                </button>
            </div>
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
        <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5 text-sm text-gray-600 dark:bg-white/[0.04] dark:text-gray-300">
            <span className="text-gray-400">{icon}</span>
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

            <div className="min-w-0 flex-1">
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
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm dark:bg-white/[0.06]">
                <Link2 size={16} />
            </span>
        );
    }

    return (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm dark:bg-white/[0.06]">
            <img
                src={icon}
                alt={name || "Red social"}
                className="h-4 w-4 object-contain"
            />
        </span>
    );
}