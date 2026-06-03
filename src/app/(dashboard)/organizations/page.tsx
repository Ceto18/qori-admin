"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TableToolbar from "@/shared/components/table/TableToolbar";
import TablePagination from "@/shared/components/table/TablePagination";

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
  } = useOrganizationStore();

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrganizations({
      page: 1,
      perPage,
      search: "",
    });
  }, [fetchOrganizations, perPage]);

  const handleSearchChange = (value: string) => {
    setSearch(value);

    fetchOrganizations({
      page: 1,
      perPage,
      search: value,
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
    console.log("Eliminar organización:", organization.uuid);

    // Luego aquí conectamos con el store:
    // deleteOrganization(organization.uuid);
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
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />
    </div>
  );
}