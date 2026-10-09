"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Alert, Spin } from "antd";

import AffiliateForm from "@/modules/affiliates/components/form/AffiliateForm";
import { useAffiliateStore } from "@/modules/affiliates/store/useAffiliateStore";
import { UpdateAffiliatePayload } from "@/modules/affiliates/types";

function AffiliateEditInitialLoading() {
    return (
        <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="flex flex-col items-center gap-4">
                <Spin size="large" />

                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Cargando afiliado...
                </p>
            </div>
        </div>
    );
}

function AffiliateEditSavingOverlay() {
    return (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/75 dark:bg-gray-950/70">
            <div className="flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm dark:border-white/[0.08] dark:bg-gray-900">
                <Spin size="large" />

                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Guardando cambios...
                </p>
            </div>
        </div>
    );
}

function AffiliateEditWarningMessage({
    message,
}: {
    message: string;
}) {
    return (
        <Alert
            message={message}
            type="warning"
            showIcon
            className="
        rounded-xl
        border-warning-200
        bg-warning-50
        text-warning-700
        shadow-none
        dark:border-warning-500/20
        dark:bg-warning-500/10
        dark:text-warning-400
        [&_.ant-alert-message]:text-warning-700
        dark:[&_.ant-alert-message]:text-warning-400
      "
        />
    );
}

export default function EditAffiliatePage() {
    const router = useRouter();
    const params = useParams();

    const uuid = String(params.uuid ?? "");

    const {
        affiliate,
        loading,
        fetchAffiliate,
        updateAffiliate,
        clearAffiliate,
    } = useAffiliateStore();

    useEffect(() => {
        if (uuid) {
            fetchAffiliate(uuid);
        }

        return () => {
            clearAffiliate();
        };
    }, [
        uuid,
        fetchAffiliate,
        clearAffiliate,
    ]);

    const handleSubmit = async (
        payload:
            | UpdateAffiliatePayload
            | any
    ) => {
        try {
            if (!uuid) {
                throw new Error(
                    "No se encontró el UUID del afiliado."
                );
            }

            const success =
                await updateAffiliate(
                    uuid,
                    payload as UpdateAffiliatePayload
                );

            if (!success) return;

            router.push("/affiliates");
        } catch (error) {
            console.error(
                "Error al actualizar afiliado:",
                error
            );
        }
    };

    const handleCancel = () => {
        router.push("/affiliates");
    };

    if (loading && !affiliate) {
        return (
            <AffiliateEditInitialLoading />
        );
    }

    if (!loading && !affiliate) {
        return (
            <AffiliateEditWarningMessage message="No se encontró el afiliado solicitado." />
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                    Editar afiliado
                </h1>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Actualiza los datos del afiliado seleccionado.
                </p>
            </div>

            <div className="relative">
                {loading && (
                    <AffiliateEditSavingOverlay />
                )}

                <AffiliateForm
                    initialData={affiliate}
                    loading={loading}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
}