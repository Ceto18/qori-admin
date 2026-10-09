"use client";

import { useEffect, useState } from "react";

import Input from "@/shared/components/form/input/InputField";
import Label from "@/shared/components/form/Label";
import {
    EyeCloseIcon,
    EyeIcon,
} from "@/shared/icons";

import {
    Affiliate,
    AffiliateFormValues,
    AffiliatePayload,
    UpdateAffiliatePayload,
} from "../../types";

interface Props {
    initialData?: Affiliate | null;
    loading?: boolean;
    onSubmit: (
        payload: AffiliatePayload | UpdateAffiliatePayload
    ) => Promise<void> | void;
    onCancel?: () => void;
}

const initialFormState: AffiliateFormValues = {
    email: "",
    password: "",
    password_confirmation: "",
    name: "",
    last_name: "",
    type_document: "DNI",
    document: "",
    phone: "",
    address: "",
};

export default function AffiliateForm({
    initialData,
    loading = false,
    onSubmit,
    onCancel,
}: Props) {
    const [form, setForm] =
        useState<AffiliateFormValues>(initialFormState);

    const [showPassword, setShowPassword] =
        useState(false);

    const [
        showPasswordConfirmation,
        setShowPasswordConfirmation,
    ] = useState(false);

    const isEditing = Boolean(initialData);

    useEffect(() => {
        if (!initialData) {
            setForm(initialFormState);
            return;
        }

        setForm({
            email: initialData.email ?? "",
            password: "",
            password_confirmation: "",
            name: initialData.profile?.name ?? "",
            last_name:
                initialData.profile?.last_name ?? "",
            type_document:
                initialData.profile?.type_document ?? "DNI",
            document:
                initialData.profile?.document ?? "",
            phone:
                initialData.profile?.phone ?? "",
            address:
                initialData.profile?.address ?? "",
        });
    }, [initialData]);

    const handleChange = (
        key: keyof AffiliateFormValues,
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const buildPayload = ():
        | AffiliatePayload
        | UpdateAffiliatePayload => {
        const basePayload = {
            email: form.email.trim(),
            name: form.name.trim(),
            last_name: form.last_name.trim(),
            type_document: form.type_document,
            document: form.document.trim(),
            phone: form.phone.trim(),
            address: form.address.trim(),
        };

        if (isEditing) {
            return basePayload;
        }

        return {
            ...basePayload,
            password: form.password,
            password_confirmation:
                form.password_confirmation,
        };
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (loading) return;

        if (
            !form.email.trim() ||
            !form.name.trim() ||
            !form.last_name.trim() ||
            !form.type_document ||
            !form.document.trim() ||
            !form.phone.trim() ||
            !form.address.trim()
        ) {
            return;
        }

        if (!isEditing) {
            if (
                !form.password ||
                !form.password_confirmation
            ) {
                return;
            }

            if (
                form.password !==
                form.password_confirmation
            ) {
                return;
            }
        }

        await onSubmit(buildPayload());
    };

    const passwordsDoNotMatch =
        !isEditing &&
        form.password.length > 0 &&
        form.password_confirmation.length > 0 &&
        form.password !==
        form.password_confirmation;

    const isFormInvalid =
        !form.email.trim() ||
        !form.name.trim() ||
        !form.last_name.trim() ||
        !form.type_document ||
        !form.document.trim() ||
        !form.phone.trim() ||
        !form.address.trim() ||
        (!isEditing &&
            (!form.password ||
                !form.password_confirmation ||
                passwordsDoNotMatch));

    const selectClassName =
        "h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90";

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/[0.05] dark:bg-white/[0.03]"
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                    <Label>Nombre</Label>
                    <Input
                        type="text"
                        value={form.name}
                        placeholder="Ej. Ana"
                        onChange={(e) =>
                            handleChange(
                                "name",
                                e.target.value
                            )
                        }
                    />
                </div>

                <div>
                    <Label>Apellido</Label>
                    <Input
                        type="text"
                        value={form.last_name}
                        placeholder="Ej. Pérez"
                        onChange={(e) =>
                            handleChange(
                                "last_name",
                                e.target.value
                            )
                        }
                    />
                </div>

                <div>
                    <Label>
                        Tipo de documento
                    </Label>

                    <select
                        value={form.type_document}
                        onChange={(e) =>
                            handleChange(
                                "type_document",
                                e.target.value
                            )
                        }
                        className={selectClassName}
                    >
                        <option value="DNI">
                            DNI
                        </option>

                        <option value="CE">
                            Carnet de extranjería
                        </option>

                        <option value="PASAPORTE">
                            Pasaporte
                        </option>

                        <option value="RUC">
                            RUC
                        </option>
                    </select>
                </div>

                <div>
                    <Label>
                        Número de documento
                    </Label>

                    <Input
                        type="text"
                        value={form.document}
                        placeholder="Ej. 12345678"
                        onChange={(e) =>
                            handleChange(
                                "document",
                                e.target.value
                            )
                        }
                    />
                </div>

                <div>
                    <Label>
                        Correo electrónico
                    </Label>

                    <Input
                        type="email"
                        value={form.email}
                        placeholder="afiliado@example.com"
                        onChange={(e) =>
                            handleChange(
                                "email",
                                e.target.value
                            )
                        }
                    />
                </div>

                <div>
                    <Label>
                        Teléfono
                    </Label>

                    <Input
                        type="text"
                        value={form.phone}
                        placeholder="Ej. 999888777"
                        onChange={(e) =>
                            handleChange(
                                "phone",
                                e.target.value
                            )
                        }
                    />
                </div>

                <div className="md:col-span-2">
                    <Label>
                        Dirección
                    </Label>

                    <Input
                        type="text"
                        value={form.address}
                        placeholder="Ej. Av. Ejemplo 123"
                        onChange={(e) =>
                            handleChange(
                                "address",
                                e.target.value
                            )
                        }
                    />
                </div>

                {!isEditing && (
                    <>
                        <div>
                            <Label>
                                Contraseña
                            </Label>

                            <div className="relative">
                                <Input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={form.password}
                                    placeholder="Ingresa una contraseña"
                                    onChange={(e) =>
                                        handleChange(
                                            "password",
                                            e.target.value
                                        )
                                    }
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            (prev) => !prev
                                        )
                                    }
                                    className="absolute right-4 top-1/2 z-30 -translate-y-1/2 cursor-pointer"
                                >
                                    {showPassword ? (
                                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                                    ) : (
                                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <Label>
                                Confirmar contraseña
                            </Label>

                            <div className="relative">
                                <Input
                                    type={
                                        showPasswordConfirmation
                                            ? "text"
                                            : "password"
                                    }
                                    value={
                                        form.password_confirmation
                                    }
                                    placeholder="Confirma la contraseña"
                                    onChange={(e) =>
                                        handleChange(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPasswordConfirmation(
                                            (prev) => !prev
                                        )
                                    }
                                    className="absolute right-4 top-1/2 z-30 -translate-y-1/2 cursor-pointer"
                                >
                                    {showPasswordConfirmation ? (
                                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                                    ) : (
                                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {passwordsDoNotMatch && (
                <p className="mt-3 text-sm text-error-500">
                    Las contraseñas no coinciden.
                </p>
            )}

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
                    disabled={
                        loading ||
                        isFormInvalid
                    }
                    className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading
                        ? "Guardando..."
                        : isEditing
                            ? "Actualizar"
                            : "Crear afiliado"}
                </button>
            </div>
        </form>
    );
}