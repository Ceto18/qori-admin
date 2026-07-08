// src/app/(dashboard)/organizations/[uuid]/cards/create/page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";

import CardForm from "@/modules/cards/components/CardForm";
import { useCardStore } from "@/modules/cards/store/useCardStore";
import { CardFormValues } from "@/modules/cards/types";

export default function CreateCardPage() {
  const router = useRouter();

  const params = useParams<{
    uuid: string;
  }>();

  const organizationUuid = params.uuid;

  const { createCard, saving } = useCardStore();

  const handleSubmit = async (values: CardFormValues) => {
    try {
      if (!organizationUuid) {
        throw new Error("No se encontró el UUID de la organización.");
      }

      await createCard(organizationUuid, values);

      router.push(`/organizations/${organizationUuid}/cards`);
    } catch (error) {
      console.error("Error al crear tarjeta:", error);
    }
  };

  if (!organizationUuid) {
    return (
      <div className="rounded-xl border border-error-200 bg-error-50 p-6 text-sm text-error-600 dark:border-error-500/20 dark:bg-error-500/10 dark:text-error-400">
        No se encontró el UUID de la organización para crear la tarjeta.
      </div>
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
          Nueva tarjeta
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Crea una tarjeta de presentación digital para esta organización.
        </p>
      </div>

      <CardForm loading={saving} onSubmit={handleSubmit} />
    </div>
  );
}