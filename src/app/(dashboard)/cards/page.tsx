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
  const [cardToDelete, setCardToDelete] = useState<Card | null>(null);

  useEffect(() => {
    fetchCards({
      page: 1,
      perPage,
      search: "",
    });
  }, [fetchCards]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleSearchSubmit = () => {
    fetchCards({
      page: 1,
      perPage,
      search,
    });
  };

  const handlePageChange = (page: number) => {
    fetchCards({
      page,
      perPage,
      search,
    });
  };

  const handlePerPageChange = (newPerPage: number) => {
    fetchCards({
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
    if (!cardToDelete) return;

    try {
      await deleteCard(cardToDelete.uuid);
      setCardToDelete(null);

      fetchCards({
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