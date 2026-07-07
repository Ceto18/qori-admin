"use client";

import type { ReactNode } from "react";
import {
    BadgeCheck,
    BriefcaseBusiness,
    Building2,
    ChevronRight,
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

type DocumentLike =
    | File
    | string
    | {
          name?: string;
          file_name?: string;
          filename?: string;
          original_name?: string;
          originalName?: string;
          title?: string;
          url?: string;
          path?: string;
      }
    | null;

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

    const filledDocuments = documents.filter(Boolean) as DocumentLike[];

    const filledNetworks = networks.filter(
        (network) =>
            network.uuid?.trim() ||
            network.name?.trim() ||
            network.value?.trim() ||
            network.icon_url?.trim()
    );

    return (
        <div className="mx-auto w-full min-w-[320px] max-w-[390px] overflow-hidden rounded-[36px] bg-[#f2f5fb] shadow-[0_28px_80px_rgba(15,23,42,0.18)] dark:bg-[#070b12]">
            <div className="relative">
                <div
                    className="absolute inset-x-0 top-0 h-[250px]"
                    style={{
                        background: bannerImage
                            ? `
                                linear-gradient(135deg, ${secondaryColor}66, ${primaryColor}4D),
                                linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.28)),
                                url(${bannerImage})
                              `
                            : `
                                radial-gradient(circle at 15% 20%, ${primaryColor} 0%, transparent 32%),
                                radial-gradient(circle at 85% 10%, ${secondaryColor} 0%, transparent 34%),
                                linear-gradient(135deg, ${secondaryColor}, ${primaryColor})
                              `,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />

                <div
                    className="absolute inset-x-0 top-[176px] h-[92px]"
                    style={{
                        background: `linear-gradient(180deg, transparent, #f2f5fb 78%)`,
                    }}
                />

                <div className="absolute inset-x-0 top-[176px] h-[92px] hidden dark:block dark:bg-gradient-to-b dark:from-transparent dark:to-[#070b12]" />

                <div
                    className="absolute -right-24 top-8 h-64 w-64 rounded-full opacity-25 blur-3xl"
                    style={{ backgroundColor: primaryColor }}
                />

                <div
                    className="absolute -left-24 top-40 h-64 w-64 rounded-full opacity-20 blur-3xl"
                    style={{ backgroundColor: secondaryColor }}
                />

                <div className="relative px-4 pb-5 pt-4">
                    <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/20 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-white shadow-sm backdrop-blur-md">
                            <Sparkles size={12} />
                            Modern
                        </span>

                        <span className="rounded-full bg-black/20 px-3 py-1.5 text-[11px] font-bold text-white/90 shadow-sm backdrop-blur-md">
                            Digital ID
                        </span>
                    </div>

                    <div className="mt-5 overflow-hidden rounded-[32px] border border-white/50 bg-white/92 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0d1320]/92">
                        <div className="relative p-4">
                            <div
                                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-10 blur-3xl"
                                style={{ backgroundColor: primaryColor }}
                            />

                            <div
                                className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full opacity-10 blur-3xl"
                                style={{ backgroundColor: secondaryColor }}
                            />

                            <div className="relative flex items-start gap-4">
                                <div className="min-w-0 flex-1 pt-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
                                        Perfil profesional
                                    </p>

                                    <h3 className="mt-2 break-words text-[26px] font-black leading-[1.02] tracking-[-0.045em] text-gray-950 dark:text-white">
                                        {data.full_name || "Nombre completo"}
                                    </h3>

                                    <p
                                        className="mt-2 break-words text-sm font-black"
                                        style={{ color: primaryColor }}
                                    >
                                        {data.position || "Cargo profesional"}
                                    </p>

                                    {data.institution && (
                                        <p className="mt-2 line-clamp-2 break-words text-xs font-semibold leading-5 text-gray-500 dark:text-gray-400">
                                            {data.institution}
                                        </p>
                                    )}
                                </div>

                                <div className="relative shrink-0">
                                    <div
                                        className="absolute -inset-2 rounded-[30px] opacity-20 blur-xl"
                                        style={{
                                            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                                        }}
                                    />

                                    <div
                                        className="relative rounded-[28px] p-[3px]"
                                        style={{
                                            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                                        }}
                                    >
                                        <div className="flex h-[98px] w-[98px] items-center justify-center overflow-hidden rounded-[25px] bg-gray-100 text-3xl font-black text-white dark:bg-white/10">
                                            {profileImage ? (
                                                <img
                                                    src={profileImage}
                                                    alt={
                                                        data.full_name ||
                                                        "Foto de perfil"
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
                                                        <UserRound size={38} />
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {filledNetworks.length > 0 && (
                                <SocialConstellation
                                    networks={filledNetworks}
                                    primaryColor={primaryColor}
                                    secondaryColor={secondaryColor}
                                />
                            )}

                            {(data.profession || data.ubication) && (
                                <div className="mt-4 flex flex-wrap justify-center gap-2">
                                    <MiniInfo
                                        icon={
                                            <BriefcaseBusiness size={15} />
                                        }
                                        label="Área"
                                        value={data.profession}
                                        color={primaryColor}
                                    />

                                    <MiniInfo
                                        icon={<MapPin size={15} />}
                                        label="Lugar"
                                        value={data.ubication}
                                        color={secondaryColor}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-white/10">
                        <section className="rounded-[28px] border border-white bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
                            <SectionHeader
                                icon={<UserRound size={14} />}
                                title="Presentación"
                            />

                            <p className="mt-3 max-h-32 overflow-y-auto break-words text-sm leading-6 text-gray-600 dark:text-gray-300">
                                {data.description ||
                                    "Agrega una breve descripción para que tus clientes conozcan más sobre ti, tu empresa o tus servicios."}
                            </p>
                        </section>

                        {(data.institution || data.ubication) && (
                            <section className="mt-4 grid grid-cols-1 gap-2.5">
                                <InfoRow
                                    icon={<Building2 size={17} />}
                                    label="Empresa"
                                    value={data.institution}
                                    color={primaryColor}
                                />
                            </section>
                        )}

                        {filledQualities.length > 0 && (
                            <section className="mt-4 rounded-[28px] border border-white bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
                                <SectionHeader
                                    icon={<BadgeCheck size={14} />}
                                    title="Características"
                                />

                                <div className="mt-3 flex max-h-28 flex-wrap gap-2 overflow-y-auto">
                                    {filledQualities.map((quality, index) => (
                                        <span
                                            key={`${quality.name}-${index}`}
                                            className="max-w-full break-words rounded-2xl bg-gray-100 px-3 py-2 text-xs font-black text-gray-600 dark:bg-white/[0.08] dark:text-gray-300"
                                        >
                                            {quality.name}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {filledDocuments.length > 0 && (
                            <section className="mt-4 rounded-[28px] border border-white bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
                                <SectionHeader
                                    icon={<FileText size={14} />}
                                    title="Documentos"
                                />

                                <div className="mt-3 max-h-40 space-y-2 overflow-y-auto pr-1">
                                    {filledDocuments.map((document, index) => (
                                        <DocumentRow
                                            key={index}
                                            document={document}
                                            index={index}
                                            color={primaryColor}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        <div className="mt-4 grid grid-cols-1 gap-3">
                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-2 rounded-[22px] px-4 py-3.5 text-sm font-black text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                                style={{
                                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                                    boxShadow: `0 16px 35px ${primaryColor}35`,
                                }}
                            >
                                Guardar contacto
                                <ChevronRight size={17} />
                            </button>

                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-3 rounded-[22px] border border-gray-200 bg-white px-4 py-3.5 text-sm font-black text-gray-950 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
                            >
                                <WalletCards size={17} />
                                Agregar a Google Wallet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SocialConstellation({
    networks,
    primaryColor,
    secondaryColor,
}: {
    networks: Array<{
        uuid?: string;
        name?: string;
        value?: string;
        icon_url?: string | null;
    }>;
    primaryColor: string;
    secondaryColor: string;
}) {
    return (
        <div className="mt-4">
            <div className="relative overflow-hidden rounded-[26px] border border-gray-100 bg-gray-50/80 px-3 py-3 dark:border-white/10 dark:bg-white/[0.04]">
                <div
                    className="pointer-events-none absolute -left-10 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full opacity-10 blur-2xl"
                    style={{ backgroundColor: primaryColor }}
                />

                <div
                    className="pointer-events-none absolute -right-10 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full opacity-10 blur-2xl"
                    style={{ backgroundColor: secondaryColor }}
                />

                <div className="relative flex flex-wrap items-center justify-center gap-2.5">
                    {networks.map((network, index) => (
                        <button
                            key={`network-${network.uuid || network.name || index}`}
                            type="button"
                            disabled={!network.value}
                            title={network.name || "Red social"}
                            className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/70 transition-all hover:-translate-y-1 hover:rotate-[-3deg] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:ring-white/10"
                        >
                            <span
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 transition-transform group-hover:scale-105 dark:bg-gray-100"
                                style={{
                                    boxShadow: `inset 0 0 0 1px ${
                                        index % 2 === 0
                                            ? `${primaryColor}22`
                                            : `${secondaryColor}22`
                                    }`,
                                }}
                            >
                                <NetworkIcon
                                    icon={network.icon_url}
                                    name={network.name}
                                    color={
                                        index % 2 === 0
                                            ? primaryColor
                                            : secondaryColor
                                    }
                                />
                            </span>
                        </button>
                    ))}
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
            <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gray-100 text-gray-600 dark:bg-white/[0.08] dark:text-gray-300">
                {icon}
            </span>

            <h4 className="text-xs font-black uppercase tracking-[0.16em] text-gray-400">
                {title}
            </h4>
        </div>
    );
}

function MiniInfo({
    icon,
    label,
    value,
    color,
}: {
    icon: ReactNode;
    label: string;
    value?: string;
    color: string;
}) {
    if (!value) return null;

    return (
        <div className="min-w-0 max-w-full rounded-[20px] bg-gray-100 px-3 py-3 text-center dark:bg-white/[0.06]">
            <div className="mb-1 flex items-center justify-center gap-1.5">
                <span style={{ color }}>{icon}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.14em] text-gray-400">
                    {label}
                </span>
            </div>

            <p className="max-w-[135px] truncate text-xs font-black text-gray-700 dark:text-gray-200">
                {value}
            </p>
        </div>
    );
}

function InfoRow({
    icon,
    label,
    value,
    color,
    centered = false,
}: {
    icon: ReactNode;
    label: string;
    value?: string;
    color: string;
    centered?: boolean;
}) {
    if (!value) return null;

    return (
        <div
            className={`flex items-center gap-3 rounded-[24px] border border-white bg-white p-3 shadow-sm dark:border-white/10 dark:bg-white/[0.05] ${
                centered ? "justify-center text-center" : ""
            }`}
        >
            <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] text-white"
                style={{ backgroundColor: color }}
            >
                {icon}
            </span>

            <div className={centered ? "min-w-0" : "min-w-0 flex-1"}>
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-gray-400">
                    {label}
                </p>

                <p className="break-words text-sm font-black text-gray-800 dark:text-white">
                    {value}
                </p>
            </div>
        </div>
    );
}

function DocumentRow({
    document,
    index,
    color,
}: {
    document: DocumentLike;
    index: number;
    color: string;
}) {
    if (!document) return null;

    const documentName = getDocumentName(document, index);

    return (
        <div className="group flex items-center gap-3 rounded-[22px] bg-gray-50 p-3 transition-all hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md dark:bg-white/[0.06] dark:hover:bg-white/[0.09]">
            <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-white"
                style={{ backgroundColor: color }}
            >
                <FileText size={16} />
            </span>

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-gray-800 dark:text-white">
                    {documentName}
                </p>
            </div>

            <ChevronRight
                size={16}
                className="shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5"
            />
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
        return <Link2 size={16} style={{ color }} />;
    }

    return (
        <img
            src={icon}
            alt={name || "Red social"}
            className="h-[20px] w-[20px] object-contain"
        />
    );
}

function getDocumentName(document: DocumentLike, index: number) {
    if (document instanceof File) {
        return document.name;
    }

    if (typeof document === "string") {
        return getNameFromPath(document) || `Documento ${index + 1}`;
    }

    if (document && typeof document === "object") {
        return (
            document.name ||
            document.file_name ||
            document.filename ||
            document.original_name ||
            document.originalName ||
            document.title ||
            getNameFromPath(document.url) ||
            getNameFromPath(document.path) ||
            `Documento ${index + 1}`
        );
    }

    return `Documento ${index + 1}`;
}

function getNameFromPath(path?: string) {
    if (!path) return "";

    try {
        const cleanPath = path.split("?")[0];
        const name = cleanPath.split("/").pop();

        return name ? decodeURIComponent(name) : "";
    } catch {
        return "";
    }
}