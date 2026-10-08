"use client";

import { useEffect, useState } from "react";

import { usePublicPlanStore } from "@/modules/public-plans/store/usePublicPlanStore";
import type { PublicPlan } from "@/modules/public-plans/types";
import { useSubscriptionStore } from "@/modules/plans/subscriptions/store/useSubscriptionStore";

import MembershipPaymentModal from "./MembershipPaymentModal";

function CrownIcon() {
    return (
        <svg
            className="h-6 w-6 text-brand-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 16.5L3.75 7.75 9 11.25 12 5.5l3 5.75 5.25-3.5L19 16.5H5z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 19.25h13.5"
            />
        </svg>
    );
}

function formatPrice(price: string | number, currency = "PEN") {
    const value = Number(price);

    if (Number.isNaN(value)) return price;

    return new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency,
    }).format(value);
}

function formatDate(date?: string | null) {
    if (!date) return "—";

    const dateOnly = date.split("T")[0];
    const parsedDate = new Date(`${dateOnly}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
        return "—";
    }

    return new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(parsedDate);
}

export default function MembershipPlans() {
    const {
        plans,
        loading,
        fetchActivePlans,
    } = usePublicPlanStore();

    const {
        currentPlan,
        loadingCurrentPlan,
        currentPlanError,
        fetchCurrentPlan,

        cancelSubscription,
        loadingCancel,
        cancelError,
        clearCancel,
    } = useSubscriptionStore();

    const [selectedPlan, setSelectedPlan] =
        useState<PublicPlan | null>(null);

    const [showCancelConfirm, setShowCancelConfirm] =
        useState(false);

    useEffect(() => {
        const loadMembership = async () => {
            const result = await fetchCurrentPlan();

            console.log("CURRENT PLAN:", result);

            if (!result?.has_subscription || !result.subscription) {
                await fetchActivePlans();
            }
        };

        loadMembership();
    }, [fetchCurrentPlan, fetchActivePlans]);

    const handleModalClose = async () => {
        setSelectedPlan(null);

        const result = await fetchCurrentPlan();

        console.log("CURRENT PLAN DESPUÉS DEL PAGO:", result);

        if (!result?.has_subscription || !result.subscription) {
            await fetchActivePlans();
        }
    };

    const handleOpenCancel = () => {
        clearCancel();
        setShowCancelConfirm(true);
    };

    const handleCloseCancel = () => {
        if (loadingCancel) return;

        clearCancel();
        setShowCancelConfirm(false);
    };

    const handleCancelSubscription = async () => {
        const response = await cancelSubscription();

        if (!response?.success) return;

        setShowCancelConfirm(false);

        const result = await fetchCurrentPlan();

        if (!result?.has_subscription || !result.subscription) {
            await fetchActivePlans();
        }
    };

    if (loadingCurrentPlan) {
        return (
            <div className="space-y-6">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="h-5 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="mt-5 h-8 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="mt-4 h-4 w-80 max-w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="h-12 w-12 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
                    <div className="mt-5 h-6 w-44 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="mt-4 h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                </div>
            </div>
        );
    }

    if (
        currentPlan?.has_subscription &&
        currentPlan.subscription
    ) {
        const subscription = currentPlan.subscription;

        return (
            <>
                <div className="space-y-6">
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/10 blur-3xl" />

                        <div className="relative">
                            <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600 dark:bg-green-500/10 dark:text-green-400">
                                Membresía activa
                            </span>

                            <h1 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white/90 md:text-3xl">
                                Mi membresía
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
                                Consulta los detalles de tu plan actual,
                                periodo de vigencia y método de pago.
                            </p>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/10 blur-2xl" />

                        <div className="relative">
                            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                                <div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10">
                                        <CrownIcon />
                                    </div>

                                    <h2 className="mt-5 text-xl font-semibold text-gray-800 dark:text-white/90">
                                        {subscription.plan.name}
                                    </h2>

                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
                                        {subscription.plan.description}
                                    </p>
                                </div>

                                <span className="self-start rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600 dark:bg-green-500/10 dark:text-green-400">
                                    Activa
                                </span>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Monto pagado
                                    </p>

                                    <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-white/90">
                                        {formatPrice(
                                            subscription.billing.amount,
                                            subscription.billing.currency
                                        )}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Inicio
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-white/90">
                                        {formatDate(
                                            subscription.period.starts_at
                                        )}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Vencimiento
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-white/90">
                                        {formatDate(
                                            subscription.period.ends_at
                                        )}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Días restantes
                                    </p>

                                    <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-white/90">
                                        {subscription.period.days_remaining}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Método de pago
                                </p>

                                <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-white/90">
                                    {subscription.payment_method.brand ||
                                        "Tarjeta"}

                                    {subscription.payment_method.last_four
                                        ? ` •••• ${subscription.payment_method.last_four}`
                                        : ""}
                                </p>
                            </div>

                            {cancelError && (
                                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                                    {cancelError}
                                </div>
                            )}

                            <div className="mt-6 border-t border-gray-100 pt-6 dark:border-gray-800">
                                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                    <div>
                                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                            Cancelar membresía
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Podrás volver a seleccionar una membresía después de cancelar.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleOpenCancel}
                                        disabled={loadingCancel}
                                        className="inline-flex shrink-0 items-center justify-center rounded-lg border border-red-200 px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
                                    >
                                        Cancelar membresía
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {showCancelConfirm && (
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                            onClick={handleCloseCancel}
                        />

                        <div className="relative z-10 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.8}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v4m0 4h.01M10.3 3.8 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0z"
                                    />
                                </svg>
                            </div>

                            <h2 className="mt-5 text-xl font-semibold text-gray-800 dark:text-white/90">
                                ¿Cancelar membresía?
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                Estás a punto de cancelar tu membresía{" "}
                                <span className="font-medium text-gray-700 dark:text-gray-300">
                                    {subscription.plan.name}
                                </span>
                                . Confirma para continuar.
                            </p>

                            {cancelError && (
                                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                                    {cancelError}
                                </div>
                            )}

                            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={handleCloseCancel}
                                    disabled={loadingCancel}
                                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/[0.03]"
                                >
                                    Volver
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCancelSubscription}
                                    disabled={loadingCancel}
                                    className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loadingCancel
                                        ? "Cancelando..."
                                        : "Sí, cancelar"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }

    return (
        <>
            <div className="space-y-6">
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/10 blur-3xl" />
                    <div className="absolute -bottom-20 left-20 h-48 w-48 rounded-full bg-brand-300/10 blur-3xl" />

                    <div className="relative">
                        <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                            Qori ID
                        </span>

                        <h1 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white/90 md:text-3xl">
                            Elige tu membresía anual
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
                            Activa una membresía anual para desbloquear la
                            creación, edición y uso de tus tarjetas digitales.
                        </p>
                    </div>
                </div>

                {currentPlanError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                        {currentPlanError}
                    </div>
                )}

                {loading && (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-[320px] animate-pulse rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]"
                            >
                                <div className="h-12 w-12 rounded-xl bg-gray-200 dark:bg-gray-800" />
                                <div className="mt-6 h-5 w-32 rounded bg-gray-200 dark:bg-gray-800" />
                                <div className="mt-4 h-3 w-full rounded bg-gray-200 dark:bg-gray-800" />
                                <div className="mt-2 h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
                                <div className="mt-8 h-8 w-28 rounded bg-gray-200 dark:bg-gray-800" />
                                <div className="mt-5 grid grid-cols-2 gap-3">
                                    <div className="h-16 rounded-xl bg-gray-200 dark:bg-gray-800" />
                                    <div className="h-16 rounded-xl bg-gray-200 dark:bg-gray-800" />
                                </div>
                                <div className="mt-6 h-11 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
                            </div>
                        ))}
                    </div>
                )}

                {!loading && plans.length === 0 && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-white/[0.03]">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            No hay membresías disponibles
                        </h2>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Por ahora no existen planes activos para mostrar.
                        </p>
                    </div>
                )}

                {!loading && plans.length > 0 && (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {plans.map((plan) => (
                            <div
                                key={plan.slug}
                                className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-white/[0.03]"
                            >
                                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/10 blur-2xl" />

                                <div className="relative">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10">
                                            <CrownIcon />
                                        </div>

                                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600 dark:bg-green-500/10 dark:text-green-400">
                                            Anual
                                        </span>
                                    </div>

                                    <h2 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white/90">
                                        {plan.name}
                                    </h2>

                                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-500 dark:text-gray-400">
                                        {plan.description}
                                    </p>

                                    <div className="mt-6">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Precio anual
                                        </p>

                                        <p className="mt-1 text-3xl font-bold text-gray-800 dark:text-white/90">
                                            {formatPrice(plan.price)}
                                        </p>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <div className="rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-900">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Organizaciones
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-white/90">
                                                {plan.limits.max_organizations}
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-900">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Tarjetas
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-white/90">
                                                {plan.limits.max_cards}
                                            </p>
                                        </div>
                                    </div>

                                    {plan.features.length > 0 && (
                                        <ul className="mt-5 space-y-2">
                                            {[...plan.features]
                                                .sort(
                                                    (a, b) =>
                                                        a.sort_order -
                                                        b.sort_order
                                                )
                                                .map((feature) => (
                                                    <li
                                                        key={`${plan.slug}-${feature.sort_order}`}
                                                        className="flex gap-2 text-sm text-gray-600 dark:text-gray-400"
                                                    >
                                                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-500" />
                                                        <span>
                                                            {feature.description}
                                                        </span>
                                                    </li>
                                                ))}
                                        </ul>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedPlan(plan)
                                        }
                                        className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white hover:bg-brand-600"
                                    >
                                        Elegir membresía
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <MembershipPaymentModal
                open={!!selectedPlan}
                plan={selectedPlan}
                onClose={handleModalClose}
            />
        </>
    );
}