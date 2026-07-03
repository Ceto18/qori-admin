"use client";

import { useEffect, useState } from "react";

import Input from "@/shared/components/form/input/InputField";
import Label from "@/shared/components/form/Label";

import { Plan, PlanPayload } from "../../types";

interface Props {
    initialData?: Plan | null;
    loading?: boolean;
    onSubmit: (payload: PlanPayload) => Promise<void> | void;
    onCancel?: () => void;
}

type FeatureFormState = {
    description: string;
    sort_order: string;
};

type FormState = {
    name: string;
    description: string;
    price: string;
    max_organizations: string;
    max_cards: string;
    features: FeatureFormState[];
};

const initialFormState: FormState = {
    name: "",
    description: "",
    price: "",
    max_organizations: "",
    max_cards: "",
    features: [
        {
            description: "",
            sort_order: "1",
        },
    ],
};

export default function PlanForm({
    initialData,
    loading = false,
    onSubmit,
    onCancel,
}: Props) {
    const [form, setForm] = useState<FormState>(initialFormState);

    useEffect(() => {
        if (!initialData) {
            setForm(initialFormState);
            return;
        }

        const features =
            initialData.features && initialData.features.length > 0
                ? initialData.features.map((feature, index) => ({
                      description: feature.description ?? "",
                      sort_order: String(feature.sort_order ?? index + 1),
                  }))
                : [
                      {
                          description: "",
                          sort_order: "1",
                      },
                  ];

        setForm({
            name: initialData.name ?? "",
            description: initialData.description ?? "",
            price: String(initialData.price ?? ""),
            max_organizations: String(initialData.max_organizations ?? ""),
            max_cards: String(initialData.max_cards ?? ""),
            features,
        });
    }, [initialData]);

    const handleChange = (key: keyof FormState, value: string) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleFeatureChange = (
        index: number,
        key: keyof FeatureFormState,
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            features: prev.features.map((feature, featureIndex) =>
                featureIndex === index
                    ? {
                          ...feature,
                          [key]: value,
                      }
                    : feature
            ),
        }));
    };

    const addFeature = () => {
        setForm((prev) => ({
            ...prev,
            features: [
                ...prev.features,
                {
                    description: "",
                    sort_order: String(prev.features.length + 1),
                },
            ],
        }));
    };

    const removeFeature = (index: number) => {
        setForm((prev) => {
            const nextFeatures = prev.features.filter(
                (_, featureIndex) => featureIndex !== index
            );

            return {
                ...prev,
                features:
                    nextFeatures.length > 0
                        ? nextFeatures.map((feature, featureIndex) => ({
                              ...feature,
                              sort_order: String(featureIndex + 1),
                          }))
                        : [
                              {
                                  description: "",
                                  sort_order: "1",
                              },
                          ],
            };
        });
    };

    const buildPayload = (): PlanPayload => {
        return {
            name: form.name.trim(),
            description: form.description.trim(),
            price: Number(form.price),
            max_organizations: Number(form.max_organizations),
            max_cards: Number(form.max_cards),
            features: form.features
                .filter((feature) => feature.description.trim())
                .map((feature, index) => ({
                    description: feature.description.trim(),
                    sort_order: Number(feature.sort_order || index + 1),
                })),
        };
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await onSubmit(buildPayload());
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/[0.05] dark:bg-white/[0.03]"
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                    <Label>Nombre del plan</Label>
                    <Input
                        type="text"
                        value={form.name}
                        placeholder="Ej. Plan Básico"
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                </div>

                <div>
                    <Label>Precio</Label>
                    <Input
                        type="number"
                        value={form.price}
                        placeholder="Ej. 100"
                        onChange={(e) => handleChange("price", e.target.value)}
                    />
                </div>

                <div>
                    <Label>Máximo de organizaciones</Label>
                    <Input
                        type="number"
                        value={form.max_organizations}
                        placeholder="Ej. 150"
                        onChange={(e) =>
                            handleChange("max_organizations", e.target.value)
                        }
                    />
                </div>

                <div>
                    <Label>Máximo de tarjetas</Label>
                    <Input
                        type="number"
                        value={form.max_cards}
                        placeholder="Ej. 1000"
                        onChange={(e) =>
                            handleChange("max_cards", e.target.value)
                        }
                    />
                </div>

                <div className="md:col-span-2">
                    <Label>Descripción del plan</Label>
                    <textarea
                        value={form.description}
                        placeholder="Ej. Plan ideal para negocios que desean iniciar con tarjetas digitales."
                        onChange={(e) =>
                            handleChange("description", e.target.value)
                        }
                        rows={4}
                        className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-brand-500 focus:ring-3 focus:ring-brand-500/10 dark:border-white/[0.1] dark:text-white dark:placeholder:text-gray-500"
                    />
                </div>
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/[0.06] dark:bg-white/[0.03]">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                            Características del plan
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Agrega los beneficios que verá el cliente en el
                            plan.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={addFeature}
                        disabled={loading}
                        className="shrink-0 rounded-lg bg-brand-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Agregar
                    </button>
                </div>

                <div className="space-y-3">
                    {form.features.map((feature, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-1 gap-3 rounded-lg border border-gray-200 bg-white p-3 dark:border-white/[0.06] dark:bg-white/[0.03] md:grid-cols-[1fr_140px_auto]"
                        >
                            <div>
                                <Label>Descripción</Label>
                                <Input
                                    type="text"
                                    value={feature.description}
                                    placeholder="Ej. Hasta 1000 tarjetas digitales"
                                    onChange={(e) =>
                                        handleFeatureChange(
                                            index,
                                            "description",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div>
                                <Label>Orden</Label>
                                <Input
                                    type="number"
                                    value={feature.sort_order}
                                    placeholder="1"
                                    onChange={(e) =>
                                        handleFeatureChange(
                                            index,
                                            "sort_order",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="flex items-end">
                                <button
                                    type="button"
                                    onClick={() => removeFeature(index)}
                                    disabled={
                                        loading || form.features.length === 1
                                    }
                                    className="w-full rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-500/10 md:w-auto"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.1] dark:text-gray-300 dark:hover:bg-white/[0.05]"
                    >
                        Cancelar
                    </button>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Guardar
                </button>
            </div>
        </form>
    );
}