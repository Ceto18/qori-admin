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

type FormState = {
    name: string;
    price: string;
    max_organizations: string;
    max_cards: string;
};

const initialFormState: FormState = {
    name: "",
    price: "",
    max_organizations: "",
    max_cards: "",
};

export default function PlanForm({
    initialData,
    loading = false,
    onSubmit,
    onCancel,
}: Props) {
    const [form, setForm] = useState<FormState>(initialFormState);

    useEffect(() => {
        if (!initialData) return;

        setForm({
            name: initialData.name ?? "",
            price: String(initialData.price ?? ""),
            max_organizations: String(initialData.max_organizations ?? ""),
            max_cards: String(initialData.max_cards ?? ""),
        });
    }, [initialData]);

    const handleChange = (key: keyof FormState, value: string) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const buildPayload = (): PlanPayload => {
        return {
            name: form.name,
            price: Number(form.price),
            max_organizations: Number(form.max_organizations),
            max_cards: Number(form.max_cards),
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