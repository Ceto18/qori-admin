// src/app/(admin)/cards/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Modal, Spin, message } from "antd";

import RoleGuard from "@/modules/auth/RoleGuard";
import TableToolbar from "@/shared/components/table/TableToolbar";
import TablePagination from "@/shared/components/table/TablePagination";
import ConfirmModal from "@/shared/components/ui/modal/ConfirmModal";

import CardTable from "@/modules/cards/components/CardTable";
import { useCardStore } from "@/modules/cards/store/useCardStore";
import { Card } from "@/modules/cards/types";
import { organizationService } from "@/modules/organizations/services/organizationService";
import { cardService } from "@/modules/cards/services/cardService";
import { handleApiError } from "@/shared/utils/handleApiError";

type Organization = {
  uuid: string;
  name?: string;
  slug?: string;
};

function TableAntLoading() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-white/70 dark:bg-gray-950/70">
      <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm dark:border-white/[0.08] dark:bg-gray-900">
        <Spin size="large" />

        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Cargando tarjetas...
        </span>
      </div>
    </div>
  );
}

function CardsPageErrorMessage({ message }: { message: string }) {
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

function CardsPageContent() {
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
  const [organizationSlug, setOrganizationSlug] = useState("");
  const [organizationLoaded, setOrganizationLoaded] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<Card | null>(null);

  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedQrCard, setSelectedQrCard] = useState<Card | null>(null);
  const [selectedQrUrl, setSelectedQrUrl] = useState("");

  useEffect(() => {
    const loadOrganization = async () => {
      try {
        setOrganizationLoaded(false);

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
        setOrganizationSlug(organization.slug ?? "");

        await fetchCards(organization.uuid, {
          page: 1,
          perPage,
          search: "",
        });
      } catch (error) {
        console.error("Error al cargar organización:", error);
        handleApiError(error);
      } finally {
        setOrganizationLoaded(true);
      }
    };

    loadOrganization();
  }, [fetchCards, perPage]);

  const handleOpenUrl = async (card: Card) => {
    if (!organizationUuid) {
      message.error("No se encontró la organización.");
      return;
    }

    try {
      const response = await cardService.getCardUrl(
        organizationUuid,
        card.uuid
      );

      const publicUrl = response.data;

      if (!publicUrl) {
        message.error("No se encontró la URL de la tarjeta.");
        return;
      }

      window.open(publicUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error al obtener URL de tarjeta:", error);
      handleApiError(error);
    }
  };

  const handleOpenQr = async (card: Card) => {
    if (!organizationUuid) {
      message.error("No se encontró la organización.");
      return;
    }

    try {
      const qrBlob = await cardService.getCardQr(
        organizationUuid,
        card.uuid
      );

      const qrImageUrl = URL.createObjectURL(qrBlob);

      setSelectedQrCard(card);
      setSelectedQrUrl(qrImageUrl);
      setQrModalOpen(true);
    } catch (error) {
      console.error("Error al obtener QR de tarjeta:", error);
      handleApiError(error);
    }
  };

  const handleCloseQrModal = () => {
    if (selectedQrUrl) {
      URL.revokeObjectURL(selectedQrUrl);
    }

    setQrModalOpen(false);
    setSelectedQrCard(null);
    setSelectedQrUrl("");
  };

  const handleOpenQrImage = () => {
    if (!selectedQrUrl) return;

    window.open(selectedQrUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownloadQrImage = () => {
    if (!selectedQrUrl) return;

    const fileName = selectedQrCard?.full_name
      ? `qr-${selectedQrCard.full_name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")}.svg`
      : "codigo-qr.svg";

    const link = document.createElement("a");
    link.href = selectedQrUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleToggleState = async (card: Card, state: boolean) => {
    try {
      if (!organizationUuid) return;

      await cardService.toggleCardState(organizationUuid, card.uuid, state);

      await fetchCards(organizationUuid, {
        page: currentPage,
        perPage,
        search,
      });
    } catch (error) {
      console.error("Error al cambiar estado de la tarjeta:", error);
      handleApiError(error);
    }
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

  const selectedQrCardName =
    selectedQrCard?.full_name ??
    `${selectedQrCard?.first_name ?? ""} ${
      selectedQrCard?.last_name ?? ""
    }`.trim();

  if (organizationLoaded && !organizationUuid) {
    return (
      <CardsPageErrorMessage message="No se encontró una organización disponible para listar las tarjetas." />
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

      <div className="relative">
        {(!organizationLoaded || loading) && <TableAntLoading />}

        <CardTable
          data={cards}
          loading={false}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleState={handleToggleState}
          onOpenUrl={handleOpenUrl}
          onOpenQr={handleOpenQr}
        />
      </div>

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

      <Modal
        open={qrModalOpen}
        title="Código QR de la tarjeta"
        centered
        zIndex={9999}
        onCancel={handleCloseQrModal}
        footer={null}
        className="
          [&_.ant-modal-content]:rounded-2xl
          [&_.ant-modal-content]:border
          [&_.ant-modal-content]:border-gray-200
          [&_.ant-modal-content]:bg-white
          [&_.ant-modal-content]:p-0
          [&_.ant-modal-content]:shadow-xl
          dark:[&_.ant-modal-content]:border-white/[0.08]
          dark:[&_.ant-modal-content]:bg-gray-900

          [&_.ant-modal-header]:rounded-t-2xl
          [&_.ant-modal-header]:border-b
          [&_.ant-modal-header]:border-gray-100
          [&_.ant-modal-header]:bg-white
          [&_.ant-modal-header]:px-6
          [&_.ant-modal-header]:py-4
          dark:[&_.ant-modal-header]:border-white/[0.08]
          dark:[&_.ant-modal-header]:bg-gray-900

          [&_.ant-modal-title]:text-base
          [&_.ant-modal-title]:font-semibold
          [&_.ant-modal-title]:text-gray-800
          dark:[&_.ant-modal-title]:text-white

          [&_.ant-modal-body]:px-6
          [&_.ant-modal-body]:py-6

          [&_.ant-modal-close]:text-gray-400
          hover:[&_.ant-modal-close]:text-gray-600
          dark:[&_.ant-modal-close]:text-gray-500
          dark:hover:[&_.ant-modal-close]:text-gray-300
        "
      >
        <div className="flex flex-col items-center text-center">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/[0.08] dark:bg-white">
            {selectedQrUrl ? (
              <img
                src={selectedQrUrl}
                alt="Código QR"
                className="h-[260px] w-[260px] object-contain"
              />
            ) : (
              <div className="flex h-[260px] w-[260px] items-center justify-center text-sm text-gray-400 dark:text-gray-500">
                Cargando QR...
              </div>
            )}
          </div>

          <h3 className="mt-4 text-base font-semibold text-gray-800 dark:text-white">
            {selectedQrCardName || "Tarjeta digital"}
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Escanea este código para ver la tarjeta digital.
          </p>

          <div className="mt-5 flex w-full flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleDownloadQrImage}
              disabled={!selectedQrUrl}
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                bg-white
                px-4
                py-2
                text-sm
                font-medium
                text-gray-700
                transition
                hover:bg-gray-50
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:border-white/[0.1]
                dark:bg-gray-800
                dark:text-gray-300
                dark:hover:bg-white/[0.05]
              "
            >
              Descargar QR
            </button>

            <button
              type="button"
              onClick={handleOpenQrImage}
              disabled={!selectedQrUrl}
              className="
                w-full
                rounded-lg
                bg-brand-500
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-brand-600
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Abrir QR
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function CardsPage() {
  return (
    <RoleGuard roles={["admin", "superadmin"]}>
      <CardsPageContent />
    </RoleGuard>
  );
}