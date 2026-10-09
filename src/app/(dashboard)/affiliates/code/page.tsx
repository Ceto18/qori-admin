"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import RoleGuard from "@/modules/auth/RoleGuard";

function AffiliateCodePageContent() {
    const [copied, setCopied] = useState(false);

    // TODO:
    // Estos valores vendrán posteriormente del store/API.
    const code = "";
    const totalUses = 0;
    const monthlyUses = 0;
    const active = true;

    const handleCopy = async () => {
        if (!code) return;

        try {
            await navigator.clipboard.writeText(code);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error(
                "Error al copiar el código:",
                error
            );
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                    Mi código de afiliado
                </h1>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Consulta tu código de afiliado y revisa
                    su cantidad de usos.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
                        <div className="mb-5 flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Código de afiliado
                                </p>

                                <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
                                    Comparte este código con tus
                                    referidos.
                                </p>
                            </div>

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${active
                                        ? "bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-400"
                                        : "bg-error-50 text-error-600 dark:bg-error-500/10 dark:text-error-400"
                                    }`}
                            >
                                {active ? "Activo" : "Inactivo"}
                            </span>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="flex h-12 flex-1 items-center rounded-lg border border-gray-200 bg-gray-50 px-4 dark:border-gray-800 dark:bg-gray-900">
                                <span className="font-mono text-lg font-semibold tracking-wider text-gray-800 dark:text-white/90">
                                    {code || "Sin código asignado"}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={handleCopy}
                                disabled={!code}
                                className="flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {copied ? (
                                    <>
                                        <Check size={18} />
                                        Copiado
                                    </>
                                ) : (
                                    <>
                                        <Copy size={18} />
                                        Copiar
                                    </>
                                )}
                            </button>
                        </div>

                        {!code && (
                            <p className="mt-3 text-sm text-warning-600 dark:text-warning-400">
                                Actualmente no tienes un código de
                                afiliado asignado.
                            </p>
                        )}
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Estado
                    </p>

                    <div className="mt-4">
                        <p className="text-2xl font-semibold text-gray-800 dark:text-white/90">
                            {active ? "Activo" : "Inactivo"}
                        </p>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Estado actual de tu cuenta de afiliado.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <MetricCard
                    title="Usos totales"
                    value={totalUses}
                    description="Cantidad total de veces que se utilizó tu código."
                />

                <MetricCard
                    title="Usos este mes"
                    value={monthlyUses}
                    description="Usos registrados durante el mes actual."
                />

                <MetricCard
                    title="Código"
                    value={code || "-"}
                    description="Tu código personal de afiliado."
                />
            </div>
        </div>
    );
}

function MetricCard({
    title,
    value,
    description,
}: {
    title: string;
    value: string | number;
    description: string;
}) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/[0.05] dark:bg-white/[0.03]">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {title}
            </p>

            <p className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white/90">
                {value}
            </p>

            <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                {description}
            </p>
        </div>
    );
}

export default function AffiliateCodePage() {
    return (
        <RoleGuard roles={["affiliate"]}>
            <AffiliateCodePageContent />
        </RoleGuard>
    );
}