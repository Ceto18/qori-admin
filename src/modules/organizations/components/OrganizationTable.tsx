"use client";

import Badge from "@/shared/components/ui/badge/Badge";
import DataTable, {
  DataTableColumn,
} from "@/shared/components/table/DataTable";

import { Organization } from "../types";

interface Props {
  data: Organization[];
  loading?: boolean;

  onView?: (organization: Organization) => void;
  onEdit?: (organization: Organization) => void;
  onDelete?: (organization: Organization) => void;

  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
}

export default function OrganizationTable({
  data,
  loading = false,
  onView,
  onEdit,
  onDelete,
  showView = true,
  showEdit = true,
  showDelete = true,
}: Props) {
  const columns: DataTableColumn<Organization>[] = [
    {
      key: "uuid",
      header: "ID",
      render: (organization) => (
        <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
          {organization.uuid}
        </span>
      ),
    },
    {
      key: "name",
      header: "Nombre",
      render: (organization) => (
        <span className="font-medium text-gray-800 dark:text-white/90">
          {organization.name}
        </span>
      ),
    },
    {
      key: "role",
      header: "Rol",
      render: (organization) => (
        <Badge
          size="sm"
          color={organization.role === "owner" ? "success" : "warning"}
        >
          {organization.role === "owner" ? "Propietario" : organization.role}
        </Badge>
      ),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      loading={loading}
      emptyMessage="No hay organizaciones registradas."
      getRowKey={(organization) => organization.uuid}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      showView={false}
      showEdit={showEdit}
      showDelete={showDelete}
    />
  );
}