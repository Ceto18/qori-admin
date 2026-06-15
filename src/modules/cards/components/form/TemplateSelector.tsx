import { Check } from "lucide-react";

import { CARD_TEMPLATES } from "../../constants/cardTemplates";

interface Props {
    selectedDesignId: string;
    onChange: (value: string) => void;
}

export default function TemplateSelector({
    selectedDesignId,
    onChange,
}: Props) {
    return (
        <div>
            <h2 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Plantilla
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Selecciona el diseño que tendrá la tarjeta pública.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {CARD_TEMPLATES.map((template) => {
                    const selected = selectedDesignId === template.id;

                    return (
                        <button
                            key={template.id}
                            type="button"
                            onClick={() => onChange(template.id)}
                            className={`relative rounded-xl border p-4 text-left transition ${
                                selected
                                    ? "border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-500/10"
                                    : "border-gray-200 bg-white hover:border-brand-300 dark:border-white/[0.08] dark:bg-white/[0.03]"
                            }`}
                        >
                            {selected && (
                                <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white">
                                    <Check size={14} />
                                </span>
                            )}

                            <div
                                className="mb-3 h-20 rounded-lg border border-gray-100 dark:border-white/[0.06]"
                                style={{
                                    background:
                                        template.key === "classic"
                                            ? "linear-gradient(135deg, #2563eb, #1e293b)"
                                            : template.key === "modern"
                                            ? "linear-gradient(135deg, #7c3aed, #db2777)"
                                            : template.key === "corporate"
                                            ? "linear-gradient(135deg, #0f172a, #334155)"
                                            : template.key === "minimal"
                                            ? "linear-gradient(135deg, #f8fafc, #e5e7eb)"
                                            : "linear-gradient(135deg, #f59e0b, #111827)",
                                }}
                            />

                            <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                                {template.name}
                            </h3>

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