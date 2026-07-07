"use client";

import { useEffect, useMemo, useState } from "react";

import type { PublicPlan } from "@/modules/public-plans/types";
import { useSubscriptionStore } from "@/modules/plans/subscriptions/store/useSubscriptionStore";

type Props = {
    open: boolean;
    plan: PublicPlan | null;
    onClose: () => void;
};

function formatPrice(price: string | number) {
    const value = Number(price);

    if (Number.isNaN(value)) return price;

    return new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
    }).format(value);
}

function CloseIcon() {
    return (
        <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
            />
        </svg>
    );
}

export default function MembershipPaymentModal({ open, plan, onClose }: Props) {
    const [discountCode, setDiscountCode] = useState("");

    const {
        preview,
        loadingPreview,
        previewError,
        fetchPreview,
        clearPreview,
    } = useSubscriptionStore();

    useEffect(() => {
        if (!open) {
            setDiscountCode("");
            clearPreview();
        }
    }, [open, clearPreview]);

    const planPrice = useMemo(() => {
        if (!plan) return 0;

        const value = Number(plan.price);

        return Number.isNaN(value) ? 0 : value;
    }, [plan]);

    const originalPrice = preview?.original_price ?? planPrice;
    const discountAmount = preview?.discount_amount ?? 0;
    const total = preview?.final_price ?? planPrice;
    const appliedDiscount = preview?.discount_code ?? null;

    const handleApplyDiscount = async () => {
        if (!plan) return;

        const planUuid = plan.uuid;

        if (!planUuid) {
            console.error("El plan seleccionado no tiene uuid:", plan);
            return;
        }

        const normalizedCode = discountCode.trim().toUpperCase();

        clearPreview();

        if (!normalizedCode) {
            return;
        }

        await fetchPreview({
            plan_uuid: planUuid,
            discount_code: normalizedCode,
        });
    };

    const handleRemoveDiscount = () => {
        setDiscountCode("");
        clearPreview();
    };

    const handlePayNow = () => {
        if (!plan) return;

        if (!plan.uuid) {
            console.error("El plan seleccionado no tiene uuid:", plan);
            return;
        }

        if (!window.Culqi) {
            console.error("Culqi todavía no está cargado.");
            return;
        }

        const publicKey = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY;

        if (!publicKey) {
            console.error("Falta configurar NEXT_PUBLIC_CULQI_PUBLIC_KEY.");
            return;
        }

        const amountInCents = Math.round(total * 100);

        window.Culqi.publicKey = publicKey;

        window.Culqi.settings({
            title: "Qori ID",
            currency: "PEN",
            amount: amountInCents,
            description: plan.name,
        });

        window.Culqi.options?.({
            lang: "es",
            installments: false,
            paymentMethods: {
                tarjeta: true,
                yape: false,
                bancaMovil: false,
                agente: false,
                billetera: false,
                cuotealo: false,
            },
        });

        window.culqi = async () => {
            if (window.Culqi?.token) {
                const tokenId = window.Culqi.token.id;

                console.log("TOKEN CULQI:", tokenId);

                console.log("Enviar al backend:", {
                    plan_uuid: plan.uuid,
                    discount_code: appliedDiscount?.code ?? null,
                    culqi_token: tokenId,
                });

                /*
                    Luego esto lo cambiarás por tu store:

                    await checkoutSubscription({
                        plan_uuid: plan.uuid,
                        discount_code: appliedDiscount?.code ?? null,
                        culqi_token: tokenId,
                    });
                */

                return;
            }

            if (window.Culqi?.error) {
                console.error("Error Culqi:", window.Culqi.error);
            }
        };

        window.Culqi.open();
    };

    if (!open || !plan) return null;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-start justify-between border-b border-gray-100 p-6 dark:border-gray-800">
                    <div>
                        <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                            Pago anual
                        </span>

                        <h2 className="mt-3 text-xl font-semibold text-gray-800 dark:text-white/90">
                            Confirmar membresía
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Revisa el monto final antes de continuar con Culqi.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <div className="space-y-5 p-6">
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/40">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Plan seleccionado
                                </p>

                                <h3 className="mt-1 text-lg font-semibold text-gray-800 dark:text-white/90">
                                    {plan.name}
                                </h3>

                                {plan.description && (
                                    <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                        {plan.description}
                                    </p>
                                )}
                            </div>

                            <p className="shrink-0 text-lg font-bold text-gray-800 dark:text-white/90">
                                {formatPrice(plan.price)}
                            </p>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="rounded-xl bg-white px-4 py-3 dark:bg-gray-900">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Organizaciones
                                </p>

                                <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-white/90">
                                    {plan.limits.max_organizations}
                                </p>
                            </div>

                            <div className="rounded-xl bg-white px-4 py-3 dark:bg-gray-900">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Tarjetas
                                </p>

                                <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-white/90">
                                    {plan.limits.max_cards}
                                </p>
                            </div>
                        </div>

                        {plan.features?.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Incluye:
                                </p>

                                <ul className="mt-2 space-y-2">
                                    {[...plan.features]
                                        .sort(
                                            (a, b) =>
                                                a.sort_order - b.sort_order
                                        )
                                        .map((feature) => (
                                            <li
                                                key={`${feature.description}-${feature.sort_order}`}
                                                className="flex gap-2 text-sm text-gray-500 dark:text-gray-400"
                                            >
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />

                                                <span>
                                                    {feature.description}
                                                </span>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Código de descuento
                        </label>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <input
                                value={discountCode}
                                onChange={(event) => {
                                    setDiscountCode(
                                        event.target.value.toUpperCase()
                                    );

                                    if (previewError) {
                                        clearPreview();
                                    }
                                }}
                                placeholder="Ej: ABCD123"
                                disabled={!!appliedDiscount || loadingPreview}
                                className="h-11 flex-1 rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 disabled:bg-gray-50 disabled:text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-brand-500"
                            />

                            {appliedDiscount ? (
                                <button
                                    type="button"
                                    onClick={handleRemoveDiscount}
                                    className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 px-5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/[0.03]"
                                >
                                    Quitar
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleApplyDiscount}
                                    disabled={loadingPreview}
                                    className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 px-5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/[0.03]"
                                >
                                    {loadingPreview
                                        ? "Validando..."
                                        : "Aplicar"}
                                </button>
                            )}
                        </div>

                        {previewError && (
                            <p className="mt-2 text-sm text-red-500">
                                {previewError}
                            </p>
                        )}

                        {appliedDiscount && (
                            <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                                Código aplicado: {appliedDiscount.code}
                                {appliedDiscount.type === "percentage"
                                    ? ` - ${appliedDiscount.value}% de descuento`
                                    : ` - ${formatPrice(
                                          appliedDiscount.value
                                      )} de descuento`}
                            </p>
                        )}
                    </div>

                    <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">
                                Subtotal anual
                            </span>

                            <span className="font-medium text-gray-800 dark:text-white/90">
                                {formatPrice(originalPrice)}
                            </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">
                                Descuento
                            </span>

                            <span className="font-medium text-green-600 dark:text-green-400">
                                - {formatPrice(discountAmount)}
                            </span>
                        </div>

                        <div className="my-4 border-t border-gray-100 dark:border-gray-800" />

                        <div className="flex items-center justify-between">
                            <span className="text-base font-semibold text-gray-800 dark:text-white/90">
                                Total a pagar
                            </span>

                            <span className="text-2xl font-bold text-gray-800 dark:text-white/90">
                                {formatPrice(total)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-gray-100 p-6 dark:border-gray-800 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/[0.03]"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={handlePayNow}
                        className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white hover:bg-brand-600"
                    >
                        Pagar ahora
                    </button>
                </div>
            </div>
        </div>
    );
}