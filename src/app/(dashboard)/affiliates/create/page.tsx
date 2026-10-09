"use client";

import { useRouter } from "next/navigation";
import { Spin } from "antd";

import AffiliateForm from "@/modules/affiliates/components/form/AffiliateForm";
import { useAffiliateStore } from "@/modules/affiliates/store/useAffiliateStore";
import {
  AffiliatePayload,
  UpdateAffiliatePayload,
} from "@/modules/affiliates/types";

function AffiliateCreateSavingOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/75 dark:bg-gray-950/70">
      <div className="flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm dark:border-white/[0.08] dark:bg-gray-900">
        <Spin size="large" />

        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Guardando afiliado...
        </p>
      </div>
    </div>
  );
}

export default function CreateAffiliatePage() {
  const router = useRouter();

  const {
    loading,
    createAffiliate,
  } = useAffiliateStore();

  const handleSubmit = async (
    payload:
      | AffiliatePayload
      | UpdateAffiliatePayload
  ) => {
    try {
      const success =
        await createAffiliate(
          payload as AffiliatePayload
        );

      if (!success) return;

      router.push("/affiliates");
    } catch (error) {
      console.error(
        "Error al crear afiliado:",
        error
      );
    }
  };

  const handleCancel = () => {
    router.push("/affiliates");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Nuevo afiliado
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Registra un nuevo afiliado
          ingresando sus datos personales
          y credenciales de acceso.
        </p>
      </div>

      <div className="relative">
        {loading && (
          <AffiliateCreateSavingOverlay />
        )}

        <AffiliateForm
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}