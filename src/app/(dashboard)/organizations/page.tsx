"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TableToolbar from "@/shared/components/table/TableToolbar";
import TablePagination from "@/shared/components/table/TablePagination";
import ConfirmModal from "@/shared/components/ui/modal/ConfirmModal";

import OrganizationTable from "@/modules/organizations/components/OrganizationTable";
import { useOrganizationStore } from "@/modules/organizations/store/useOrganizationStore";
import { Organization } from "@/modules/organizations/types";

export default function OrganizationsPage() {
  const router = useRouter();

  const {
    organizations,
    currentPage,
    totalPages,
    perPage,
    loading,
    fetchOrganizations,
    deleteOrganization,
  } = useOrganizationStore();

  const [search, setSearch] = useState("");
  const [organizationToDelete, setOrganizationToDelete] =
    useState<Organization | null>(null);

  useEffect(() => {
    fetchOrganizations({
      page: 1,
      perPage,
      search: "",
    });
  }, [fetchOrganizations]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleSearchSubmit = () => {
    fetchOrganizations({
      page: 1,
      perPage,
      search,
    });
  };

  const handlePageChange = (page: number) => {
    fetchOrganizations({
      page,
      perPage,
      search,
    });
  };

  const handlePerPageChange = (newPerPage: number) => {
    fetchOrganizations({
      page: 1,
      perPage: newPerPage,
      search,
    });
  };

  const handleView = (organization: Organization) => {
    router.push(`/organizations/${organization.uuid}`);
  };

  const handleEdit = (organization: Organization) => {
    router.push(`/organizations/${organization.uuid}/edit`);
  };

  const handleDelete = (organization: Organization) => {
    setOrganizationToDelete(organization);
  };

  const handleConfirmDelete = async () => {
    if (!organizationToDelete) return;

    try {
      await deleteOrganization(organizationToDelete.uuid);
      setOrganizationToDelete(null);

      fetchOrganizations({
        page: currentPage,
        perPage,
        search,
      });
    } catch {
      // El error ya se muestra desde el store.
    }
  };

  const handleCancelDelete = () => {
    if (loading) return;

    setOrganizationToDelete(null);
  };

  return (
    <div className="space-y-6">
      <TableToolbar
        title="Organizaciones"
        description="Administra las organizaciones registradas en el sistema."
        addLabel="Nueva organización"
        onAdd={() => router.push("/organizations/create")}
        searchValue={search}
        searchPlaceholder="Buscar organización..."
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      <OrganizationTable
        data={organizations}
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
        open={Boolean(organizationToDelete)}
        title="Eliminar organización"
        message={`¿Seguro que deseas eliminar la organización "${
          organizationToDelete?.name ?? ""
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