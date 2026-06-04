// src/app/(admin)/cards/[uuid]/edit/page.tsx

"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import CardForm from "@/modules/cards/components/CardForm";
import { useCardStore } from "@/modules/cards/store/useCardStore";
import { CardFormValues } from "@/modules/cards/types";

export default function EditCardPage() {
  const router = useRouter();
  const params = useParams();

  const uuid = String(params.uuid);

  const {
    selectedCard,
    loading,
    saving,
    fetchCard,
    updateCard,
    clearSelectedCard,
  } = useCardStore();

  useEffect(() => {
    fetchCard(uuid);

    return () => {
      clearSelectedCard();
    };
  }, [uuid, fetchCard, clearSelectedCard]);

  const handleSubmit = async (values: CardFormValues) => {
    await updateCard(uuid, values);

    router.push("/cards");
  };

  if (loading && !selectedCard) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500 dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-gray-400">
        Cargando tarjeta...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Editar tarjeta
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Actualiza los datos, colores y plantilla de la tarjeta.
        </p>
      </div>

      <CardForm
        initialData={selectedCard}
        loading={saving}
        onSubmit={handleSubmit}
      />
    </div>
  );
}