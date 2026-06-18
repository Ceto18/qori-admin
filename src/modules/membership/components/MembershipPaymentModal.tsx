"use client";

import { useEffect, useMemo, useState } from "react";
import { Plan } from "@/modules/plans/types";
import { DiscountCode } from "@/modules/discountCodes/types";
import { useDiscountCodeStore } from "@/modules/discountCodes/store/useDiscountCodeStore";

type Props = {
    open: boolean;
    plan: Plan | null;
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

function isDiscountAvailable(discount: DiscountCode) {
    if (!discount.active) return false;

    const now = new Date();

    if (discount.starts_at && new Date(discount.starts_at) > now) {
        return false;
    }

    if (discount.expires_at && new Date(discount.expires_at) < now) {
        return false;
    }

    if (
        discount.max_uses !== null &&
        Number(discount.used_count) >= Number(discount.max_uses)
    ) {
        return false;
    }

    return true;
}

function calculateDiscountAmount(
    planPrice: number,
    discount: DiscountCode | null
) {
    if (!discount) return 0;

    const value = Number(discount.value);

    if (Number.isNaN(value)) return 0;

    if (discount.type === "percentage") {
        const percentage = Math.min(Math.max(value, 0), 100);
        return planPrice * (percentage / 100);
    }

    return Math.min(value, planPrice);
}

export default function MembershipPaymentModal({ open, plan, onClose }: Props) {
    const [discountCode, setDiscountCode] = useState("");
    const [appliedDiscount, setAppliedDiscount] =
        useState<DiscountCode | null>(null);
    const [discountError, setDiscountError] = useState("");

    const { discountCodes, loading, fetchDiscountCodes } =
        useDiscountCodeStore();

    useEffect(() => {
        if (!open) return;

        fetchDiscountCodes({
            page: 1,
            perPage: 100,
            search: "",
        });
    }, [open, fetchDiscountCodes]);

    useEffect(() => {
        if (!open) {
            setDiscountCode("");
            setAppliedDiscount(null);
            setDiscountError("");
        }
    }, [open]);

    const planPrice = useMemo(() => {
        if (!plan) return 0;

        const value = Number(plan.price);

        return Number.isNaN(value) ? 0 : value;
    }, [plan]);

    const discountAmount = useMemo(() => {
        return calculateDiscountAmount(planPrice, appliedDiscount);
    }, [planPrice, appliedDiscount]);

    const total = Math.max(planPrice - discountAmount, 0);

    const handleApplyDiscount = () => {
        const normalizedCode = discountCode.trim().toUpperCase();

        setDiscountError("");
        setAppliedDiscount(null);

        if (!normalizedCode) {
            setDiscountError("Ingresa un código de descuento.");
            return;
        }

        const foundDiscount = discountCodes.find(
            (discount) =>
                discount.code.trim().toUpperCase() === normalizedCode
        );

        if (!foundDiscount) {
            setDiscountError("El código ingresado no existe.");
            return;
        }

        if (!isDiscountAvailable(foundDiscount)) {
            setDiscountError("El código ingresado no está disponible.");
            return;
        }

        setAppliedDiscount(foundDiscount);
    };

    const handleRemoveDiscount = () => {
        setDiscountCode("");
        setAppliedDiscount(null);
        setDiscountError("");
    };

    const handlePayNow = () => {
        if (!plan) return;

        console.log("Abrir Culqi con:", {
            plan_uuid: plan.uuid,
            plan_name: plan.name,
            discount_code: appliedDiscount?.code ?? null,
            subtotal: planPrice,
            discount: discountAmount,
            total,
        });

        // Aquí luego conectaremos Culqi:
        // 1. Abrir Culqi Checkout
        // 2. Recibir token de Culqi
        // 3. Enviar token + plan_uuid + discount_code al backend
        // 4. Backend confirma pago y activa membresía
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
                            </div>

                            <p className="text-lg font-bold text-gray-800 dark:text-white/90">
                                {formatPrice(plan.price)}
                            </p>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="rounded-xl bg-white px-4 py-3 dark:bg-gray-900">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Organizaciones
                                </p>
                                <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-white/90">
                                    {plan.max_organizations}
                                </p>
                            </div>

                            <div className="rounded-xl bg-white px-4 py-3 dark:bg-gray-900">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Tarjetas
                                </p>
                                <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-white/90">
                                    {plan.max_cards}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Código de descuento
                        </label>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <input
                                value={discountCode}
                                onChange={(event) => {
                                    setDiscountCode(event.target.value);
                                    setDiscountError("");
                                }}
                                placeholder="Ej: ABCD123"
                                disabled={!!appliedDiscount}
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
                                    disabled={loading}
                                    className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 px-5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/[0.03]"
                                >
                                    {loading ? "Validando..." : "Aplicar"}
                                </button>
                            )}
                        </div>

                        {discountError && (
                            <p className="mt-2 text-sm text-red-500">
                                {discountError}
                            </p>
                        )}

                        {appliedDiscount && (
                            <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                                Código aplicado: {appliedDiscount.code}
                                {appliedDiscount.name
                                    ? ` - ${appliedDiscount.name}`
                                    : ""}
                            </p>
                        )}
                    </div>

                    <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">
                                Subtotal anual
                            </span>
                            <span className="font-medium text-gray-800 dark:text-white/90">
                                {formatPrice(planPrice)}
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