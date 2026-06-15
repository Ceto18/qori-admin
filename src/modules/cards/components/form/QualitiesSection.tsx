import { Plus, Trash2 } from "lucide-react";

import Input from "@/shared/components/form/input/InputField";
import { CardQuality } from "../../types";
import FormField from "./FormField";

interface Props {
    qualities: CardQuality[];
    onAdd: () => void;
    onUpdate: (index: number, value: string) => void;
    onRemove: (index: number) => void;
}

export default function QualitiesSection({
    qualities,
    onAdd,
    onUpdate,
    onRemove,
}: Props) {
    return (
        <section className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-base font-semibold text-gray-800 dark:text-white/90">
                        Características
                    </h2>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Agrega las características o cualidades que tendrá la tarjeta.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onAdd}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-600"
                >
                    <Plus size={16} />
                    Agregar
                </button>
            </div>

            <div className="mt-5 space-y-3">
                {qualities.map((quality, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-[1fr_auto] items-end gap-3"
                    >
                        <FormField label={`Característica ${index + 1}`}>
                            <Input
                                type="text"
                                value={quality.name}
                                placeholder="Ej. Responsable"
                                onChange={(e) =>
                                    onUpdate(index, e.target.value)
                                }
                            />
                        </FormField>

                        <button
                            type="button"
                            onClick={() => onRemove(index)}
                            disabled={qualities.length === 1}
                            className="mb-0.5 flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-error-300 hover:text-error-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[0.08] dark:text-gray-400"
                        >
                            <Trash2 size={17} />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}