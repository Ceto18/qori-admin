"use client";

import { useEffect, useState } from "react";
import { usePlanStore } from "@/modules/plans/store/usePlanStore";
import { Plan } from "@/modules/plans/types";
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

function formatPrice(price: string | number) {
    const value = Number(price);

    if (Number.isNaN(value)) return price;

    return new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
    }).format(value);
}

export default function MembershipPlans() {
    const { plans, loading, fetchPlans } = usePlanStore();
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    useEffect(() => {
        fetchPlans({
            page: 1,
            perPage: 50,
            search: "",
        });
    }, [fetchPlans]);

    const activePlans = plans.filter((plan) => plan.active);

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

                {!loading && activePlans.length === 0 && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-white/[0.03]">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            No hay membresías disponibles
                        </h2>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Por ahora no existen planes activos para mostrar.
                        </p>
                    </div>
                )}

                {!loading && activePlans.length > 0 && (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {activePlans.map((plan) => (
                            <div
                                key={plan.uuid}
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

                                    <p className="mt-3 min-h-[48px] text-sm leading-6 text-gray-500 dark:text-gray-400">
                                        Accede hasta{" "}
                                        <span className="font-medium text-gray-700 dark:text-gray-300">
                                            {plan.max_organizations}
                                        </span>{" "}
                                        organizaciones y{" "}
                                        <span className="font-medium text-gray-700 dark:text-gray-300">
                                            {plan.max_cards}
                                        </span>{" "}
                                        tarjetas digitales dentro de Qori ID.
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
                                                {plan.max_organizations}
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-900">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Tarjetas
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-white/90">
                                                {plan.max_cards}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setSelectedPlan(plan)}
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
                onClose={() => setSelectedPlan(null)}
            />
        </>
    );
}