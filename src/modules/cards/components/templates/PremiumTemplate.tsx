"use client";

import {
    BadgeCheck,
    Crown,
    FileText,
    Link2,
    MapPin,
    Sparkles,
    UserRound,
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
        <div
            className="mx-auto w-full min-w-[320px] max-w-[390px] rounded-[34px] p-[2px] shadow-2xl"
            style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            }}
        >
            <div className="overflow-hidden rounded-[32px] bg-gray-950">
                {/* HEADER */}
                <div
                    className="relative h-44 bg-cover bg-center"
                    style={{
                        backgroundColor: primaryColor,
                        backgroundImage: bannerPreview
                            ? `url(${bannerPreview})`
                            : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/30 to-gray-950" />

                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                        <Crown size={14} />
                        Premium
                    </div>

                    <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/15 text-white backdrop-blur-md">
                        <Sparkles size={16} />
                    </div>
                </div>

                {/* CONTENT */}
                <div className="relative px-5 pb-6">
                    {/* PROFILE */}
                    <div className="-mt-14 flex justify-center">
                        <div
                            className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[28px] border-4 border-gray-950 bg-white/10 text-3xl font-bold text-white shadow-xl ring-2"
                            style={{
                                boxShadow: `0 18px 45px ${primaryColor}35`,
                            }}
                        >
                            {profilePreview ? (
                                <img
                                    src={profilePreview}
                                    alt={data.full_name || "Foto de perfil"}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <UserRound size={42} />
                            )}
                        </div>
                    </div>

                    {/* MAIN INFO */}
                    <div className="mt-4 text-center">
                        <h3 className="text-2xl font-extrabold leading-tight text-white">
                            {data.full_name || "Nombre completo"}
                        </h3>

                        <p
                            className="mt-1 text-sm font-semibold"
                            style={{ color: primaryColor }}
                        >
                            {data.position || "Cargo"}
                        </p>

                        {data.company && (
                            <p className="mt-1 text-xs font-medium text-gray-400">
                                {data.company}
                            </p>
                        )}

                        {data.profession && (
                            <p className="mt-1 text-xs font-medium text-gray-500">
                                {data.profession}
                            </p>
                        )}
                    </div>

                    {/* BIO */}
                    <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.06] p-4">
                        {data.bio ? (
                            <p className="text-center text-sm leading-6 text-gray-300">
                                {data.bio}
                            </p>
                        ) : (
                            <p className="text-center text-sm leading-6 text-gray-400">
                                Agrega una presentación breve para destacar tu perfil,
                                experiencia o propuesta profesional.
                            </p>
                        )}
                    </div>

                    {/* ACTIONS PRINCIPALES */}
                    {filledNetworks.length > 0 && (
                        <div className="mt-5 grid grid-cols-2 gap-3">
                            {filledNetworks.slice(0, 2).map((network, index) => (
                                <PrimaryNetworkAction
                                    key={`${network.red_social}-${index}`}
                                    name={network.name}
                                    icon={network.icon}
                                    link={network.link}
                                    color={primaryColor}
                                />
                            ))}
                        </div>
                    )}

                    {/* INFO PRINCIPAL */}
                    <div className="mt-5 space-y-3">
                        <InfoItem
                            icon={<MapPin size={17} />}
                            label="Ubicación"
                            value={data.location}
                        />
                    </div>

                    {/* QUALITIES */}
                    {filledQualities.length > 0 && (
                        <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.06] p-4">
                            <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                <BadgeCheck size={14} />
                                Características
                            </h4>

                            <div className="flex flex-wrap gap-2">
                                {filledQualities.map((quality, index) => (
                                    <span
                                        key={`${quality.name}-${index}`}
                                        className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-xs font-semibold text-gray-200"
                                    >
                                        {quality.name}
                                    </span>
                                ))}
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

                            <div className="space-y-3">
                                {filledNetworks.map((network, index) => (
                                    <NetworkItem
                                        key={`${network.red_social}-${index}`}
                                        name={network.name}
                                        icon={network.icon}
                                        link={network.link}
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

                            <div className="space-y-3">
                                {filledDocuments.map((document, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gray-300">
                                            <FileText size={17} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs font-medium text-gray-400">
                                                Documento
                                            </p>

                                            <p className="truncate text-sm font-semibold text-gray-100">
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

                    {/* ACCIONES SECUNDARIAS */}
                    {filledNetworks.length > 0 && (
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            {filledNetworks.slice(0, 2).map((network, index) => (
                                <SecondaryNetworkAction
                                    key={`${network.red_social}-secondary-${index}`}
                                    name={network.name}
                                    icon={network.icon}
                                    link={network.link}
                                    color={primaryColor}
                                />
                            ))}
                        </div>
                    )}

                    {/* CTA */}
                    <button
                        type="button"
                        className="mt-5 flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-extrabold text-gray-950 shadow-lg transition hover:opacity-90"
                        style={{
                            background: `linear-gradient(135deg, ${primaryColor}, #fff2c2)`,
                        }}
                    >
                        Guardar contacto
                    </button>
                </div>
            </div>
        </div>
    );
}

function PrimaryNetworkAction({
    name,
    icon,
    link,
    color,
}: {
    name?: string;
    icon?: string | null;
    link?: string;
    color: string;
}) {
    return (
        <button
            type="button"
            disabled={!link}
            className="flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-bold text-gray-950 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
            style={{ backgroundColor: color }}
        >
            <NetworkIcon icon={icon} name={name} compact />
            <span className="truncate">{name || "Red"}</span>
        </button>
    );
}

function SecondaryNetworkAction({
    name,
    icon,
    link,
    color,
}: {
    name?: string;
    icon?: string | null;
    link?: string;
    color: string;
}) {
    return (
        <button
            type="button"
            disabled={!link}
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.07] px-3 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.12] disabled:cursor-not-allowed disabled:opacity-40"
        >
            <span style={{ color }}>
                <NetworkIcon icon={icon} name={name} compact />
            </span>

            <span className="truncate">{name || "Red"}</span>
        </button>
    );
}

function InfoItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value?: string;
}) {
    if (!value) return null;

    return (
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gray-300">
                {icon}
            </div>

            <div className="min-w-0">
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
    link,
}: {
    name?: string;
    icon?: string | null;
    link?: string;
}) {
    if (!name && !link) return null;

    return (
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3">
            <NetworkIcon icon={icon} name={name} />

            <div className="min-w-0">
                <p className="text-xs font-medium text-gray-400">
                    {name || "Red social"}
                </p>

                {link && (
                    <p className="truncate text-sm font-semibold text-gray-100">
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