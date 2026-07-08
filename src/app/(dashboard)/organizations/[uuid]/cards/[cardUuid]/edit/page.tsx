// src/app/(dashboard)/organizations/[uuid]/cards/[cardUuid]/edit/page.tsx

"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Alert, Spin } from "antd";

import CardForm from "@/modules/cards/components/CardForm";
import { useCardStore } from "@/modules/cards/store/useCardStore";
import { CardFormValues } from "@/modules/cards/types";

function CardEditInitialLoading() {
  return (
    <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex flex-col items-center gap-4">
        <Spin size="large" />

        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Cargando tarjeta...
        </p>
      </div>
    </div>
  );
}

function CardEditSavingOverlay() {
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

function CardEditErrorMessage({ message }: { message: string }) {
  return (
    <Alert
      message={message}
      type="error"
      showIcon
      className="
        rounded-xl
        border-error-200
        bg-error-50
        text-error-600
        shadow-none
        dark:border-error-500/20
        dark:bg-error-500/10
        dark:text-error-400
        [&_.ant-alert-message]:text-error-600
        dark:[&_.ant-alert-message]:text-error-400
      "
    />
  );
}

function CardEditWarningMessage({ message }: { message: string }) {
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

export default function EditCardPage() {
  const router = useRouter();

  const params = useParams<{
    uuid: string;
    cardUuid: string;
  }>();

  const organizationUuid = params.uuid;
  const cardUuid = params.cardUuid;

  const {
    selectedCard,
    loading,
    saving,
    fetchCard,
    updateCard,
    clearSelectedCard,
  } = useCardStore();

  useEffect(() => {
    if (!organizationUuid || !cardUuid) return;

    fetchCard(organizationUuid, cardUuid);

    return () => {
      clearSelectedCard();
    };
  }, [organizationUuid, cardUuid, fetchCard, clearSelectedCard]);

  const handleSubmit = async (values: CardFormValues) => {
    try {
      if (!organizationUuid) {
        throw new Error("No se encontró el UUID de la organización.");
      }

      if (!cardUuid) {
        throw new Error("No se encontró el UUID de la tarjeta.");
      }

      await updateCard(organizationUuid, cardUuid, values);

      router.push(`/organizations/${organizationUuid}/cards`);
    } catch (error) {
      console.error("Error al actualizar tarjeta:", error);
    }
  };

  if (loading && !selectedCard) {
    return <CardEditInitialLoading />;
  }

  if (!organizationUuid) {
    return (
      <CardEditErrorMessage message="No se encontró el UUID de la organización para editar la tarjeta." />
    );
  }

  if (!cardUuid) {
    return (
      <CardEditErrorMessage message="No se encontró el UUID de la tarjeta." />
    );
  }

  if (!selectedCard) {
    return (
      <CardEditWarningMessage message="No se encontró la tarjeta solicitada." />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          type="button"
          onClick={() => router.push(`/organizations/${organizationUuid}/cards`)}
          className="mb-4 text-sm font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
        >
          ← Volver a tarjetas
        </button>

        <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Editar tarjeta
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Actualiza los datos, colores y plantilla de la tarjeta.
        </p>
      </div>

      <div className="relative">
        {saving && <CardEditSavingOverlay />}

        <CardForm
          initialData={selectedCard}
          loading={saving}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}