// src/app/(admin)/cards/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TableToolbar from "@/shared/components/table/TableToolbar";
import TablePagination from "@/shared/components/table/TablePagination";
import ConfirmModal from "@/shared/components/ui/modal/ConfirmModal";

import CardTable from "@/modules/cards/components/CardTable";
import { useCardStore } from "@/modules/cards/store/useCardStore";
import { Card } from "@/modules/cards/types";
import { organizationService } from "@/modules/organizations/services/organizationService";

type Organization = {
  uuid: string;
  name?: string;
};

export default function CardsPage() {
  const router = useRouter();

  const {
    cards,
    currentPage,
    totalPages,
    perPage,
    loading,
    fetchCards,
    deleteCard,
  } = useCardStore();

  const [search, setSearch] = useState("");
  const [organizationUuid, setOrganizationUuid] = useState("");
  const [loadingOrganization, setLoadingOrganization] = useState(true);
  const [cardToDelete, setCardToDelete] = useState<Card | null>(null);

  useEffect(() => {
    const loadOrganization = async () => {
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

        if (organization?.uuid) {
          setOrganizationUuid(organization.uuid);

          await fetchCards(organization.uuid, {
            page: 1,
            perPage,
            search: "",
          });
        }
      } catch (error) {
        console.error("Error al cargar organización:", error);
      } finally {
        setLoadingOrganization(false);
      }
    };

    loadOrganization();
  }, [fetchCards, perPage]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleSearchSubmit = () => {
    if (!organizationUuid) return;

    fetchCards(organizationUuid, {
      page: 1,
      perPage,
      search,
    });
  };

  const handlePageChange = (page: number) => {
    if (!organizationUuid) return;

    fetchCards(organizationUuid, {
      page,
      perPage,
      search,
    });
  };

  const handlePerPageChange = (newPerPage: number) => {
    if (!organizationUuid) return;

    fetchCards(organizationUuid, {
      page: 1,
      perPage: newPerPage,
      search,
    });
  };

  const handleView = (card: Card) => {
    router.push(`/cards/${card.uuid}`);
  };

  const handleEdit = (card: Card) => {
    router.push(`/cards/${card.uuid}/edit`);
  };

  const handleDelete = (card: Card) => {
    setCardToDelete(card);
  };

  const handleConfirmDelete = async () => {
    if (!cardToDelete || !organizationUuid) return;

    try {
      await deleteCard(organizationUuid, cardToDelete.uuid);

      setCardToDelete(null);

      await fetchCards(organizationUuid, {
        page: currentPage,
        perPage,
        search,
      });
    } catch {
      // El error ya se maneja en el store.
    }
  };

  const handleCancelDelete = () => {
    if (loading) return;

    setCardToDelete(null);
  };

  if (loadingOrganization) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500 dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-gray-400">
        Cargando organización...
      </div>
    );
  }

  if (!organizationUuid) {
    return (
      <div className="rounded-xl border border-error-200 bg-error-50 p-6 text-sm text-error-600 dark:border-error-500/20 dark:bg-error-500/10 dark:text-error-400">
        No se encontró una organización disponible para listar las tarjetas.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TableToolbar
        title="Tarjetas"
        description="Administra las tarjetas de presentación digitales."
        addLabel="Nueva tarjeta"
        onAdd={() => router.push("/cards/create")}
        searchValue={search}
        searchPlaceholder="Buscar tarjeta..."
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      <CardTable
        data={cards}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        perPage={perPage}
        perPageOptions={[10, 25, 50, 100]}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />

      <ConfirmModal
        open={Boolean(cardToDelete)}
        title="Eliminar tarjeta"
        message={`¿Seguro que deseas eliminar la tarjeta "${
          cardToDelete?.full_name ?? ""
        }"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        loading={loading}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}