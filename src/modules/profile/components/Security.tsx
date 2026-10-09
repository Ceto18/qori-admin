"use client";

import { useState } from "react";

import { useModal } from "@/shared/hooks/useModal";

import Input from "@/shared/components/form/input/InputField";
import Label from "@/shared/components/form/Label";
import Button from "@/shared/components/ui/button/Button";
import { Modal } from "@/shared/components/ui/modal/index";

import { useProfileStore } from "../store/useProfileStore";

type PasswordForm = {
    current_password: string;
    password: string;
    password_confirmation: string;
};

export default function Security() {
    const { isOpen, openModal, closeModal } = useModal();

    const {
        updatingPassword,
        passwordError,
        updatePassword,
        clearPasswordError,
    } = useProfileStore();

    const [form, setForm] = useState<PasswordForm>({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const resetForm = () => {
        setForm({
            current_password: "",
            password: "",
            password_confirmation: "",
        });
    };

    const handleChange = (
        field: keyof PasswordForm,
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleOpenModal = () => {
        clearPasswordError();
        resetForm();
        openModal();
    };

    const handleCloseModal = () => {
        if (updatingPassword) return;

        clearPasswordError();
        resetForm();
        closeModal();
    };

    const handleSave = async () => {
        if (updatingPassword) return;

        clearPasswordError();

        if (
            !form.current_password.trim() ||
            !form.password.trim() ||
            !form.password_confirmation.trim()
        ) {
            return;
        }

        if (form.password !== form.password_confirmation) {
            return;
        }

        const payload = {
            current_password: form.current_password,
            password: form.password,
            password_confirmation: form.password_confirmation,
        };

        console.log("Actualizando contraseña");

        const success = await updatePassword(payload);

        console.log("Resultado actualización contraseña:", success);

        if (success) {
            resetForm();
            closeModal();
        }
    };

    const passwordsDoNotMatch =
        form.password.length > 0 &&
        form.password_confirmation.length > 0 &&
        form.password !== form.password_confirmation;

    const isFormInvalid =
        !form.current_password.trim() ||
        !form.password.trim() ||
        !form.password_confirmation.trim() ||
        passwordsDoNotMatch;

    return (
        <>
            {/* ====================================================== */}
            {/* SECURITY CARD */}
            {/* ====================================================== */}

            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/3">
                <h4 className="mb-4 text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
                    Seguridad
                </h4>

                <div>
                    <div className="flex flex-col justify-between gap-4 border-b border-gray-200 py-4 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-end dark:border-gray-800">
                        <div>
                            <span className="mb-1 block text-base font-medium text-gray-800 dark:text-white/90">
                                Cambiar contraseña
                            </span>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Actualiza tu contraseña para mantener tu cuenta segura.
                            </p>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={handleOpenModal}
                                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-2.5 pe-4 ps-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                >
                                    <path
                                        d="M12.3861 5.08087L14.9182 7.61296M15.6437 3.5917L16.408 4.35603C16.8962 4.84419 16.8962 5.63564 16.408 6.1238L7.83547 14.6963C7.69039 14.8414 7.51182 14.9486 7.31554 15.0083L3.97461 16.0251L4.99141 12.6842C5.05115 12.4879 5.15829 12.3093 5.30337 12.1642L13.8759 3.5917C14.3641 3.10355 15.1555 3.10355 15.6437 3.5917Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                Cambiar contraseña
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ====================================================== */}
            {/* MODAL */}
            {/* ====================================================== */}

            <Modal
                isOpen={isOpen}
                onClose={handleCloseModal}
                className="m-4 max-w-[600px]"
            >
                <div className="relative no-scrollbar w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
                    {/* HEADER */}

                    <div className="px-2 pe-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Cambiar contraseña
                        </h4>

                        <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
                            Ingresa tu contraseña actual y define una nueva contraseña.
                        </p>
                    </div>

                    {/* FORM */}

                    <form
                        className="flex flex-col"
                        onSubmit={(event) => {
                            event.preventDefault();
                        }}
                    >
                        <div className="custom-scrollbar overflow-y-auto px-2">
                            <div className="grid grid-cols-1 gap-y-5">
                                {/* CONTRASEÑA ACTUAL */}

                                <div>
                                    <Label>Contraseña actual</Label>

                                    <Input
                                        type="password"
                                        value={form.current_password}
                                        onChange={(event) =>
                                            handleChange(
                                                "current_password",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>

                                {/* NUEVA CONTRASEÑA */}

                                <div>
                                    <Label>Nueva contraseña</Label>

                                    <Input
                                        type="password"
                                        value={form.password}
                                        onChange={(event) =>
                                            handleChange(
                                                "password",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>

                                {/* CONFIRMAR CONTRASEÑA */}

                                <div>
                                    <Label>Confirmar nueva contraseña</Label>

                                    <Input
                                        type="password"
                                        value={form.password_confirmation}
                                        onChange={(event) =>
                                            handleChange(
                                                "password_confirmation",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>

                                {/* VALIDACIÓN LOCAL */}

                                {passwordsDoNotMatch && (
                                    <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-500/20 dark:bg-red-500/10">
                                        <p className="text-sm text-red-600 dark:text-red-400">
                                            Las contraseñas no coinciden.
                                        </p>
                                    </div>
                                )}

                                {/* ERROR BACKEND */}

                                {passwordError && (
                                    <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-500/20 dark:bg-red-500/10">
                                        <p className="text-sm text-red-600 dark:text-red-400">
                                            {passwordError}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ACTIONS */}

                        <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCloseModal}
                                disabled={updatingPassword}
                            >
                                Cancelar
                            </Button>

                            <Button
                                size="sm"
                                onClick={handleSave}
                                disabled={
                                    updatingPassword ||
                                    isFormInvalid
                                }
                            >
                                {updatingPassword
                                    ? "Actualizando..."
                                    : "Cambiar contraseña"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}