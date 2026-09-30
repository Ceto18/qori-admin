"use client";

import { useEffect, useMemo, useState } from "react";

import type { PublicPlan } from "@/modules/public-plans/types";
import { useSubscriptionStore } from "@/modules/plans/subscriptions/store/useSubscriptionStore";
import { useAuthStore } from "@/store/useAuthStore";

type Props = {
    open: boolean;
    plan: PublicPlan | null;
    onClose: () => void;
};

type CulqiCheckoutInstance = {
    token?: { id: string };
    order?: unknown;
    error?: {
        user_message?: string;
        merchant_message?: string;
        [key: string]: unknown;
    };
    open: () => void;
    close: () => void;
    culqi?: () => void | Promise<void>;
};

type CulqiCheckoutConstructor = new (
    publicKey: string,
    config: Record<string, unknown>
) => CulqiCheckoutInstance;

declare global {
    interface Window {
        CulqiCheckout?: CulqiCheckoutConstructor;
    }
}

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

function SuccessIcon() {
    return (
        <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5 12 4 4L19 6"
            />
        </svg>
    );
}

export default function MembershipPaymentModal({
    open,
    plan,
    onClose,
}: Props) {
    const [discountCode, setDiscountCode] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const { user } = useAuthStore();

    const {
        preview,
        loadingPreview,
        previewError,
        fetchPreview,
        clearPreview,
        checkout,
        subscribe,
        loadingCheckout,
        checkoutError,
        clearCheckout,
    } = useSubscriptionStore();

    useEffect(() => {
        if (!open) {
            setDiscountCode("");
            setPaymentSuccess(false);
            clearPreview();
            clearCheckout();
        }
    }, [open, clearPreview, clearCheckout]);

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
        if (!plan?.uuid) return;

        const normalizedCode = discountCode.trim().toUpperCase();

        clearPreview();

        if (!normalizedCode) return;

        await fetchPreview({
            plan_uuid: plan.uuid,
            discount_code: normalizedCode,
        });
    };

    const handleRemoveDiscount = () => {
        setDiscountCode("");
        clearPreview();
    };

    const handleSuccessClose = () => {
        setPaymentSuccess(false);
        setDiscountCode("");
        clearPreview();
        clearCheckout();
        onClose();
    };

    const handlePayNow = async () => {
        if (!plan?.uuid) {
            console.error(
                "El plan seleccionado no tiene uuid:",
                plan
            );
            return;
        }

        if (!user?.email) {
            console.error(
                "No se encontró el correo del usuario autenticado."
            );
            return;
        }

        const publicKey =
            process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY;

        if (!publicKey) {
            console.error(
                "Falta configurar NEXT_PUBLIC_CULQI_PUBLIC_KEY."
            );
            return;
        }

        if (!window.CulqiCheckout) {
            console.error(
                "CulqiCheckout todavía no está cargado."
            );
            return;
        }

        try {
            clearCheckout();

            const checkoutResponse = await checkout({
                plan_uuid: plan.uuid,
                discount_code:
                    appliedDiscount?.code ?? null,
                customer_email: user.email,
            });

            if (!checkoutResponse) {
                throw new Error(
                    "No se pudo crear el checkout."
                );
            }

            const subscription =
                checkoutResponse.data.subscriptionIntent;

            const pricing =
                checkoutResponse.data.pricing;

            if (!subscription?.uuid) {
                throw new Error(
                    "El checkout no devolvió el UUID de la suscripción."
                );
            }

            if (!pricing) {
                throw new Error(
                    "El checkout no devolvió la información del precio."
                );
            }

            const amountInCents =
                Number(pricing.amount_cents);

            if (
                !Number.isInteger(amountInCents) ||
                amountInCents <= 0
            ) {
                throw new Error(
                    "El monto de la suscripción no es válido."
                );
            }

            if (!pricing.currency) {
                throw new Error(
                    "El checkout no devolvió una moneda válida."
                );
            }

            const CulqiCheckout =
                window.CulqiCheckout;

            const culqiCheckout =
                new CulqiCheckout(publicKey, {
                    settings: {
                        title:
                            `Suscripción - ${plan.name}`,
                        currency:
                            pricing.currency,
                        amount:
                            amountInCents,
                    },

                    client: {
                        email: user.email,
                    },

                    options: {
                        lang: "es",
                        installments: false,
                        modal: true,
                        container:
                            "#culqi-container",

                        paymentMethods: {
                            tarjeta: true,
                            yape: false,
                            billetera: false,
                            bancaMovil: false,
                            agente: false,
                            cuotealo: false,
                        },

                        paymentMethodsSort: [
                            "tarjeta",
                        ],
                    },

                    appearance: {
                        theme: "default",
                        hiddenCulqiLogo: false,
                        hiddenBannerContent: false,
                        hiddenBanner: false,
                        hiddenToolBarAmount: false,
                        menuType: "sidebar",
                        buttonCardPayText:
                            "Pagar suscripción",
                        logo: "",

                        defaultStyle: {
                            bannerColor:
                                "#0A2540",
                            buttonBackground:
                                "#0A2540",
                            menuColor:
                                "#0A2540",
                            linksColor:
                                "#0A2540",
                            buttonTextColor:
                                "#FFFFFF",
                            priceColor:
                                "#0A2540",
                        },
                    },
                });

            culqiCheckout.culqi =
                async () => {
                    if (culqiCheckout.token) {
                        const tokenId =
                            culqiCheckout.token.id;

                        culqiCheckout.close();

                        try {
                            const response =
                                await subscribe({
                                    subscription_uuid:
                                        subscription.uuid,
                                    token_id:
                                        tokenId,
                                });

                            if (!response) {
                                throw new Error(
                                    "No se pudo procesar la suscripción."
                                );
                            }

                            clearPreview();
                            clearCheckout();
                            setPaymentSuccess(true);
                        } catch (error) {
                            console.error(
                                "Error subscribe:",
                                error
                            );
                        }

                        return;
                    }

                    if (culqiCheckout.order) {
                        culqiCheckout.close();

                        console.log(
                            "Order Culqi:",
                            culqiCheckout.order
                        );

                        clearCheckout();

                        return;
                    }

                    console.error(
                        "Error Culqi:",
                        culqiCheckout.error
                    );

                    clearCheckout();
                };

            culqiCheckout.open();
        } catch (error) {
            console.error(
                "Error creando checkout:",
                error
            );
        }
    };

    if (!open || !plan) return null;

    if (paymentSuccess) {
        return (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />

                <div className="relative z-10 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                        <SuccessIcon />
                    </div>

                    <h2 className="mt-5 text-xl font-semibold text-gray-800 dark:text-white/90">
                        Suscripción activada
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                        Tu pago fue procesado correctamente y tu
                        membresía se activó exitosamente.
                    </p>

                    <div className="mt-5 rounded-xl bg-gray-50 p-4 text-left dark:bg-gray-950/40">
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Plan
                            </span>

                            <span className="text-sm font-semibold text-gray-800 dark:text-white/90">
                                {plan.name}
                            </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Monto
                            </span>

                            <span className="text-sm font-semibold text-gray-800 dark:text-white/90">
                                {formatPrice(total)}
                            </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Estado
                            </span>

                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-400">
                                Activa
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSuccessClose}
                        className="mt-6 w-full rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white hover:bg-brand-600"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        );
    }

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
                        disabled={loadingCheckout}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-60 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
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
                                {formatPrice(
                                    plan.price
                                )}
                            </p>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="rounded-xl bg-white px-4 py-3 dark:bg-gray-900">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Organizaciones
                                </p>

                                <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-white/90">
                                    {
                                        plan.limits
                                            .max_organizations
                                    }
                                </p>
                            </div>

                            <div className="rounded-xl bg-white px-4 py-3 dark:bg-gray-900">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Tarjetas
                                </p>

                                <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-white/90">
                                    {
                                        plan.limits
                                            .max_cards
                                    }
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
                                                a.sort_order -
                                                b.sort_order
                                        )
                                        .map(
                                            (feature) => (
                                                <li
                                                    key={`${feature.description}-${feature.sort_order}`}
                                                    className="flex gap-2 text-sm text-gray-500 dark:text-gray-400"
                                                >
                                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />

                                                    <span>
                                                        {
                                                            feature.description
                                                        }
                                                    </span>
                                                </li>
                                            )
                                        )}
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
                                disabled={
                                    !!appliedDiscount ||
                                    loadingPreview ||
                                    loadingCheckout
                                }
                                className="h-11 flex-1 rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 disabled:bg-gray-50 disabled:text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-brand-500"
                            />

                            {appliedDiscount ? (
                                <button
                                    type="button"
                                    onClick={
                                        handleRemoveDiscount
                                    }
                                    disabled={
                                        loadingCheckout
                                    }
                                    className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 px-5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/[0.03]"
                                >
                                    Quitar
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={
                                        handleApplyDiscount
                                    }
                                    disabled={
                                        loadingPreview ||
                                        loadingCheckout
                                    }
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

                        {checkoutError && (
                            <p className="mt-2 text-sm text-red-500">
                                {checkoutError}
                            </p>
                        )}

                        {appliedDiscount && (
                            <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                                Código aplicado:{" "}
                                {appliedDiscount.code}

                                {appliedDiscount.type ===
                                    "percentage"
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
                                {formatPrice(
                                    originalPrice
                                )}
                            </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">
                                Descuento
                            </span>

                            <span className="font-medium text-green-600 dark:text-green-400">
                                -{" "}
                                {formatPrice(
                                    discountAmount
                                )}
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
                        disabled={loadingCheckout}
                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/[0.03]"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={handlePayNow}
                        disabled={
                            loadingCheckout ||
                            loadingPreview
                        }
                        className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loadingCheckout
                            ? "Procesando..."
                            : "Pagar ahora"}
                    </button>
                </div>
            </div>

            <div id="culqi-container" />
        </div>
    );
}