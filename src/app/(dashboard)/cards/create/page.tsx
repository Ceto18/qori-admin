// src/app/(admin)/cards/create/page.tsx

"use client";

import { useRouter } from "next/navigation";

import CardForm from "@/modules/cards/components/CardForm";
import { useCardStore } from "@/modules/cards/store/useCardStore";
import { CardFormValues } from "@/modules/cards/types";

export default function CreateCardPage() {
  const router = useRouter();

  const { createCard, saving } = useCardStore();

  const handleSubmit = async (values: CardFormValues) => {
    await createCard(values);

    router.push("/cards");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Nueva tarjeta
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Crea una tarjeta de presentación digital y selecciona una plantilla.
        </p>
      </div>

      <CardForm loading={saving} onSubmit={handleSubmit} />
    </div>
  );
}