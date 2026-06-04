// src/modules/cards/components/TemplateSelector.tsx

"use client";

import { Check } from "lucide-react";
import { CARD_TEMPLATES } from "../constants/cardTemplates";
import { CardTemplateKey } from "../types";

interface Props {
  selectedTemplateKey: CardTemplateKey;
  onChange: (templateKey: CardTemplateKey) => void;
}

export default function TemplateSelector({
  selectedTemplateKey,
  onChange,
}: Props) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
          Seleccionar plantilla
        </h3>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Elige el diseño visual para la tarjeta de presentación.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {CARD_TEMPLATES.map((template) => {
          const isSelected = selectedTemplateKey === template.key;

          return (
            <button
              key={template.key}
              type="button"
              onClick={() => onChange(template.key)}
              className={`relative rounded-xl border p-4 text-left transition ${
                isSelected
                  ? "border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-500/10"
                  : "border-gray-200 bg-white hover:border-brand-300 dark:border-white/[0.08] dark:bg-white/[0.03]"
              }`}
            >
              {isSelected && (
                <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white">
                  <Check size={14} />
                </span>
              )}

              <div className="mb-3 h-24 rounded-lg border border-gray-100 bg-gradient-to-br from-gray-100 to-gray-200 dark:border-white/[0.06] dark:from-gray-800 dark:to-gray-900" />

              <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                {template.name}
              </h4>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {template.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}