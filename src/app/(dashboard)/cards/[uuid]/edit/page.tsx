// src/app/(admin)/cards/[uuid]/edit/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import CardForm from "@/modules/cards/components/CardForm";
import { useCardStore } from "@/modules/cards/store/useCardStore";
import { CardFormValues } from "@/modules/cards/types";
import { organizationService } from "@/modules/organizations/services/organizationService";

type Organization = {
  uuid: string;
  name?: string;
};

export default function EditCardPage() {
  const router = useRouter();
  const params = useParams();

  const uuid = String(params.uuid ?? "");

  const {
    selectedCard,
    loading,
    saving,
    fetchCard,
    updateCard,
    clearSelectedCard,
  } = useCardStore();

  const [organizationUuid, setOrganizationUuid] = useState("");
  const [loadingOrganization, setLoadingOrganization] = useState(true);

  useEffect(() => {
    const loadOrganizationAndCard = async () => {
      try {
        setLoadingOrganization(true);

        const response = await organizationService.getOrganizations({
          page: 1,
          per_page: 1,
        });

        const organization: Organization | null =
          response.data?.data?.[0] ??
          response.data?.[0] ??
          response.data ??
          null;

        if (!organization?.uuid) return;

        setOrganizationUuid(organization.uuid);

        if (uuid) {
          await fetchCard(organization.uuid, uuid);
        }
      } catch (error) {
        console.error("Error al cargar organización o tarjeta:", error);
      } finally {
        setLoadingOrganization(false);
      }
    };

    loadOrganizationAndCard();

    return () => {
      clearSelectedCard();
    };
  }, [uuid, fetchCard, clearSelectedCard]);

  const handleSubmit = async (values: CardFormValues) => {
    if (!organizationUuid) {
      throw new Error("No se encontró el UUID de la organización.");
    }

    if (!uuid) {
      throw new Error("No se encontró el UUID de la tarjeta.");
    }

    await updateCard(organizationUuid, uuid, values);

    router.push("/cards");
  };

  if (loadingOrganization || (loading && !selectedCard)) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500 dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-gray-400">
        Cargando tarjeta...
      </div>
    );
  }

  if (!organizationUuid) {
    return (
      <div className="rounded-xl border border-error-200 bg-error-50 p-6 text-sm text-error-600 dark:border-error-500/20 dark:bg-error-500/10 dark:text-error-400">
        No se encontró una organización disponible para editar la tarjeta.
      </div>
    );
  }

  if (!selectedCard) {
    return (
      <div className="rounded-xl border border-warning-200 bg-warning-50 p-6 text-sm text-warning-700 dark:border-warning-500/20 dark:bg-warning-500/10 dark:text-warning-400">
        No se encontró la tarjeta solicitada.
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