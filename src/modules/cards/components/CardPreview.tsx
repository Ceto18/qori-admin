"use client";

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

export default function CardPreview({
  data,
  profilePreview,
  bannerPreview,
}: Props) {
  const templateMap = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    corporate: CorporateTemplate,
    minimal: MinimalTemplate,
    premium: PremiumTemplate,
  };

  const SelectedTemplate = templateMap[data.template_key] ?? ClassicTemplate;

  return (
    <aside className="sticky top-6 h-fit rounded-xl border border-gray-200 bg-white p-5 dark:border-white/[0.05] dark:bg-white/[0.03]">
      <h2 className="text-base font-semibold text-gray-800 dark:text-white/90">
        Previsualización
      </h2>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Vista previa de cómo se verá la tarjeta pública.
      </p>

      <div className="mt-5 flex justify-center">
        <SelectedTemplate
          data={data}
          profilePreview={profilePreview}
          bannerPreview={bannerPreview}
        />
      </div>
    </aside>
  );
}