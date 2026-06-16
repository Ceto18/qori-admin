// src/modules/cards/components/CardForm.tsx

"use client";

import { useEffect, useState } from "react";

import { CARD_TEMPLATES } from "../constants/cardTemplates";
import { Card, CardFormValues } from "../types";
import {
    SocialNetwork,
    socialNetworkService,
} from "../services/socialNetworkService";

import CardPreview from "./CardPreview";

import MainDataSection from "./form/MainDataSection";
import QualitiesSection from "./form/QualitiesSection";
import DocumentsSection from "./form/DocumentsSection";
import NetworksSection from "./form/NetworksSection";
import MediaColorsSection from "./form/MediaColorsSection";
import TemplateSelector from "./form/TemplateSelector";

interface Props {
    initialData?: Card | null;
    loading?: boolean;
    onSubmit: (values: CardFormValues) => Promise<void>;
}

const DEFAULT_DESIGN_ID = CARD_TEMPLATES[0]?.id ?? "";

const getInitialForm = (): CardFormValues => ({
    first_name: "",
    last_name: "",
    full_name: "",

    position: "",
    institution: "",
    profession: "",
    ubication: "",
    description: "",

    design_id: DEFAULT_DESIGN_ID,

    primary_color: "#2563eb",
    secondary_color: "#111827",

    photo_perfil: null,
    photo_banner: null,

    photo_perfil_url: "",
    photo_banner_url: "",

    qualities: [{ name: "" }],
    documents: [],

    networks: [
        {
            uuid: "",
            value: "",
            label: "",
        },
    ],
});

export default function CardForm({
    initialData = null,
    loading = false,
    onSubmit,
}: Props) {
    const [form, setForm] = useState<CardFormValues>(getInitialForm);
    const [profilePreview, setProfilePreview] = useState<string>("");
    const [bannerPreview, setBannerPreview] = useState<string>("");

    const [socialNetworks, setSocialNetworks] = useState<SocialNetwork[]>([]);

    useEffect(() => {
        const loadSocialNetworks = async () => {
            try {
                const response = await socialNetworkService.getSocialNetworks();

                setSocialNetworks(response.data?.data ?? []);
            } catch (error) {
                console.error("Error al cargar redes sociales:", error);
                setSocialNetworks([]);
            }
        };

        loadSocialNetworks();
    }, []);

    useEffect(() => {
        if (!initialData) {
            setForm(getInitialForm());
            setProfilePreview("");
            setBannerPreview("");
            return;
        }

        const firstName = initialData.first_name ?? "";
        const lastName = initialData.last_name ?? "";
        const fullName =
            initialData.full_name ?? `${firstName} ${lastName}`.trim();

        const profileImage = initialData.photo_perfil_url ?? "";
        const bannerImage = initialData.photo_banner_url ?? "";

        setForm({
            first_name: firstName,
            last_name: lastName,
            full_name: fullName,

            position: initialData.position ?? "",
            institution: initialData.institution ?? "",
            profession: initialData.profession ?? "",
            ubication: initialData.ubication ?? "",
            description: initialData.description ?? "",

            design_id: String(initialData.design_id ?? DEFAULT_DESIGN_ID),

            primary_color: initialData.primary_color ?? "#2563eb",
            secondary_color: initialData.secondary_color ?? "#111827",

            photo_perfil: null,
            photo_banner: null,

            photo_perfil_url: profileImage,
            photo_banner_url: bannerImage,

            qualities:
                initialData.qualities && initialData.qualities.length > 0
                    ? initialData.qualities.map((quality) => ({
                        uuid: quality.uuid,
                        name: quality.name ?? "",
                    }))
                    : [{ name: "" }],

            documents: [],

            networks:
                initialData.networks && initialData.networks.length > 0
                    ? initialData.networks.map((network) => ({
                        uuid: network.uuid ?? "",
                        value: network.value ?? "",
                        label: network.label ?? "",
                        name: network.name ?? "",
                        icon_url: network.icon_url ?? null,
                        type: network.type ?? "",
                    }))
                    : [
                        {
                            uuid: "",
                            value: "",
                            label: "",
                        },
                    ],
        });

        setProfilePreview(profileImage);
        setBannerPreview(bannerImage);
    }, [initialData]);

    const updateField = <K extends keyof CardFormValues>(
        key: K,
        value: CardFormValues[K]
    ) => {
        setForm((prev) => {
            const next = {
                ...prev,
                [key]: value,
            };

            if (key === "first_name" || key === "last_name") {
                next.full_name = `${next.first_name} ${next.last_name}`.trim();
            }

            return next;
        });
    };

    const handleProfileImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        updateField("photo_perfil", file);
        setProfilePreview(URL.createObjectURL(file));
    };

    const handleBannerImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        updateField("photo_banner", file);
        setBannerPreview(URL.createObjectURL(file));
    };

    const addQuality = () => {
        setForm((prev) => ({
            ...prev,
            qualities: [...(prev.qualities ?? []), { name: "" }],
        }));
    };

    const updateQuality = (index: number, value: string) => {
        setForm((prev) => ({
            ...prev,
            qualities: (prev.qualities ?? []).map((quality, qualityIndex) =>
                qualityIndex === index
                    ? {
                        ...quality,
                        name: value,
                    }
                    : quality
            ),
        }));
    };

    const removeQuality = (index: number) => {
        setForm((prev) => {
            const qualities = prev.qualities ?? [];

            return {
                ...prev,
                qualities:
                    qualities.length > 1
                        ? qualities.filter(
                            (_, qualityIndex) => qualityIndex !== index
                        )
                        : qualities,
            };
        });
    };

    const addDocument = () => {
        setForm((prev) => ({
            ...prev,
            documents: [...(prev.documents ?? []), null],
        }));
    };

    const updateDocument = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setForm((prev) => ({
            ...prev,
            documents: (prev.documents ?? []).map((document, documentIndex) =>
                documentIndex === index ? file : document
            ),
        }));
    };

    const removeDocument = (index: number) => {
        setForm((prev) => ({
            ...prev,
            documents: (prev.documents ?? []).filter(
                (_, documentIndex) => documentIndex !== index
            ),
        }));
    };

    const addNetwork = () => {
        setForm((prev) => ({
            ...prev,
            networks: [
                ...(prev.networks ?? []),
                {
                    uuid: "",
                    value: "",
                    label: "",
                },
            ],
        }));
    };

    const updateNetwork = (
        index: number,
        key: "uuid" | "value" | "label" | "name" | "icon" | "icon_url" | "type",
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            networks: (prev.networks ?? []).map((network, networkIndex) =>
                networkIndex === index
                    ? {
                        ...network,
                        [key]: value,
                    }
                    : network
            ),
        }));
    };

    const removeNetwork = (index: number) => {
        setForm((prev) => {
            const networks = prev.networks ?? [];

            return {
                ...prev,
                networks:
                    networks.length > 1
                        ? networks.filter(
                            (_, networkIndex) => networkIndex !== index
                        )
                        : networks,
            };
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (loading) return;

        await onSubmit(form);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]"
        >
            <div className="space-y-6">
                <MainDataSection form={form} updateField={updateField} />

                <QualitiesSection
                    qualities={form.qualities ?? []}
                    onAdd={addQuality}
                    onUpdate={updateQuality}
                    onRemove={removeQuality}
                />

                <DocumentsSection
                    documents={form.documents ?? []}
                    onAdd={addDocument}
                    onUpdate={updateDocument}
                    onRemove={removeDocument}
                />

                <NetworksSection
                    networks={form.networks ?? []}
                    socialNetworks={socialNetworks}
                    onAdd={addNetwork}
                    onUpdate={updateNetwork}
                    onRemove={removeNetwork}
                />

                <MediaColorsSection
                    form={form}
                    updateField={updateField}
                    onProfileImageChange={handleProfileImageChange}
                    onBannerImageChange={handleBannerImageChange}
                />

                <section className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/[0.05] dark:bg-white/[0.03]">
                    <TemplateSelector
                        selectedDesignId={form.design_id}
                        onChange={(designId) =>
                            updateField("design_id", designId)
                        }
                    />
                </section>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Guardando..." : "Guardar tarjeta"}
                    </button>
                </div>
            </div>

            <CardPreview
                data={form}
                profilePreview={profilePreview}
                bannerPreview={bannerPreview}
            />
        </form>
    );
}