"use client";

import type { ComponentType } from "react";

import { CardFormValues } from "../types";

import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import CorporateTemplate from "./templates/CorporateTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import PremiumTemplate from "./templates/PremiumTemplate";

interface Props {
    data: CardFormValues;
    profilePreview: string;
    bannerPreview: string;
}

interface TemplateProps {
    data: CardFormValues;
    profilePreview: string;
    bannerPreview: string;
}

const templateMap: Record<string, ComponentType<TemplateProps>> = {
    "1": ClassicTemplate,
    "2": ModernTemplate,
    "3": CorporateTemplate,
    "4": MinimalTemplate,
    "5": PremiumTemplate,
};

export default function CardPreview({
    data,
    profilePreview,
    bannerPreview,
}: Props) {
    const designId = String(data.design_id ?? "1");

    const SelectedTemplate = templateMap[designId] ?? ClassicTemplate;

    return (
        <aside className="sticky top-6 h-fit rounded-xl border border-gray-200 bg-white p-5 dark:border-white/[0.05] dark:bg-white/[0.03]">
            <h2 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Previsualización
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Vista previa de cómo se verá la tarjeta pública.
            </p>

            <div className="mt-5 flex justify-center">
                <div className="w-full max-w-[380px]">
                    <SelectedTemplate
                        data={data}
                        profilePreview={profilePreview}
                        bannerPreview={bannerPreview}
                    />
                </div>
            </div>
        </aside>
    );
}