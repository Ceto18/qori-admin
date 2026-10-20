"use client";

import React, { useState } from "react";
import Link from "next/link";

import Input from "@/shared/components/form/input/InputField";
import Label from "@/shared/components/form/Label";
import Button from "@/shared/components/ui/button/Button";

import { forgotPasswordRequest } from "../services/authService";

import { showSuccess } from "@/shared/utils/toast";
import { handleApiError } from "@/shared/utils/handleApiError";

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (loading) return;

        const normalizedEmail = email
            .trim()
            .toLowerCase();

        if (!normalizedEmail) {
            handleApiError({
                response: {
                    data: {
                        message:
                            "Ingresa tu correo electrónico.",
                    },
                },
            });

            return;
        }

        setLoading(true);

        try {
            const response =
                await forgotPasswordRequest({
                    email: normalizedEmail,
                });

            setSent(true);

            showSuccess(
                response.message ??
                "Se envió el enlace de recuperación a tu correo."
            );
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
                        <h1 className="mb-2 text-title-sm font-semibold text-gray-800 dark:text-white/90 sm:text-title-md">
                            Recuperar contraseña
                        </h1>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Ingresa el correo electrónico
                            asociado a tu cuenta y te
                            enviaremos las instrucciones para
                            restablecer tu contraseña.
                        </p>
                    </div>

                    {!sent ? (
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <Label>
                                        Correo electrónico{" "}
                                        <span className="text-error-500">
                                            *
                                        </span>
                                    </Label>

                                    <Input
                                        placeholder="ejemplo@correo.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <Button
                                        className="flex w-full items-center justify-center rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
                                        size="sm"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Enviando..."
                                            : "Enviar enlace de recuperación"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                            <h2 className="mb-2 font-medium text-gray-800 dark:text-white/90">
                                Revisa tu correo
                            </h2>

                            <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                                Si existe una cuenta asociada a{" "}
                                <span className="font-medium text-gray-700 dark:text-gray-300">
                                    {email}
                                </span>
                                , recibirás un enlace con las
                                instrucciones para restablecer tu
                                contraseña.
                            </p>

                            <button
                                type="button"
                                onClick={() => setSent(false)}
                                className="mt-4 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400"
                            >
                                Usar otro correo
                            </button>
                        </div>
                    )}

                    <div className="mt-5">
                        <p className="text-center text-sm text-gray-700 dark:text-gray-400 sm:text-start">
                            ¿Recordaste tu contraseña?{" "}
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