"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Input from "@/shared/components/form/input/InputField";
import Label from "@/shared/components/form/Label";
import Button from "@/shared/components/ui/button/Button";

import {
    EyeCloseIcon,
    EyeIcon,
} from "@/shared/icons";

import { showSuccess } from "@/shared/utils/toast";
import { handleApiError } from "@/shared/utils/handleApiError";

type ResetPasswordFormProps = {
    token: string;
    email: string;
};

export default function ResetPasswordForm({
    token,
    email,
}: ResetPasswordFormProps) {
    const router = useRouter();

    const [
        showPassword,
        setShowPassword,
    ] = useState(false);

    const [
        showPasswordConfirmation,
        setShowPasswordConfirmation,
    ] = useState(false);

    const [password, setPassword] =
        useState("");

    const [
        passwordConfirmation,
        setPasswordConfirmation,
    ] = useState("");

    const [loading, setLoading] =
        useState(false);

    const handleResetPassword = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (loading) return;

        if (
            !password.trim() ||
            !passwordConfirmation.trim()
        ) {
            handleApiError({
                response: {
                    data: {
                        message:
                            "Ingresa y confirma tu nueva contraseña.",
                    },
                },
            });

            return;
        }

        if (
            password !==
            passwordConfirmation
        ) {
            handleApiError({
                response: {
                    data: {
                        message:
                            "Las contraseñas no coinciden.",
                    },
                },
            });

            return;
        }

        if (password.length < 8) {
            handleApiError({
                response: {
                    data: {
                        message:
                            "La contraseña debe tener al menos 8 caracteres.",
                    },
                },
            });

            return;
        }

        setLoading(true);

        try {
            /*
             * Aquí luego conectamos:
             *
             * await resetPasswordRequest({
             *     token,
             *     email,
             *     password,
             *     password_confirmation:
             *         passwordConfirmation,
             * });
             */

            console.log({
                token,
                email,
                password,
                password_confirmation:
                    passwordConfirmation,
            });

            showSuccess(
                "Contraseña actualizada correctamente."
            );

            router.replace("/signin");
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full flex-1 flex-col lg:w-1/2">
            <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
                <div>
                    <div className="mb-5 sm:mb-8">
                        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                            Cambiar contraseña
                        </h1>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta
                        </p>
                    </div>

                    <form
                        onSubmit={
                            handleResetPassword
                        }
                    >
                        <div className="space-y-6">
                            <div>
                                <Label>
                                    Correo electrónico
                                </Label>

                                <Input
                                    type="email"
                                    value={email}
                                    disabled
                                />
                            </div>

                            <div>
                                <Label>
                                    Nueva contraseña{" "}
                                    <span className="text-error-500">
                                        *
                                    </span>
                                </Label>

                                <div className="relative">
                                    <Input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Ingresa tu nueva contraseña"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (prev) =>
                                                    !prev
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
                                    Confirmar contraseña{" "}
                                    <span className="text-error-500">
                                        *
                                    </span>
                                </Label>

                                <div className="relative">
                                    <Input
                                        type={
                                            showPasswordConfirmation
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Confirma tu nueva contraseña"
                                        value={
                                            passwordConfirmation
                                        }
                                        onChange={(e) =>
                                            setPasswordConfirmation(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPasswordConfirmation(
                                                (prev) =>
                                                    !prev
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

                            <div>
                                <Button
                                    className="flex w-full items-center justify-center rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
                                    size="sm"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Actualizando..."
                                        : "Cambiar contraseña"}
                                </Button>
                            </div>
                        </div>
                    </form>

                    <div className="mt-5">
                        <p className="text-center text-sm text-gray-700 dark:text-gray-400 sm:text-start">
                            ¿Ya recordaste tu contraseña?{" "}

                            <Link
                                href="/signin"
                                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                            >
                                Iniciar sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}