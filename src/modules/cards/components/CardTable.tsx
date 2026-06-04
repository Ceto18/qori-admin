// src/modules/cards/components/CardTable.tsx

"use client";

import Badge from "@/shared/components/ui/badge/Badge";
import DataTable, {
  DataTableColumn,
} from "@/shared/components/table/DataTable";

import { Card } from "../types";

interface Props {
  data: Card[];
  loading?: boolean;

  onView?: (card: Card) => void;
  onEdit?: (card: Card) => void;
  onDelete?: (card: Card) => void;

  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
}

export default function CardTable({
  data,
  loading = false,
  onView,
  onEdit,
  onDelete,
  showView = true,
  showEdit = true,
  showDelete = true,
}: Props) {
  const columns: DataTableColumn<Card>[] = [
    {
      key: "full_name",
      header: "Nombre",
      render: (card) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-sm font-semibold text-gray-500 dark:bg-gray-800 dark:text-gray-300">
            {card.profile_image ? (
              <img
                src={card.profile_image}
                alt={card.full_name}
                className="h-full w-full object-cover"
              />
            ) : (
              card.full_name?.charAt(0)?.toUpperCase() || "?"
            )}
          </div>

          <div>
            <p className="font-medium text-gray-800 dark:text-white/90">
              {card.full_name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {card.position || "Sin cargo"}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "company",
      header: "Empresa",
      render: (card) => (
        <span className="text-gray-500 dark:text-gray-400">
          {card.company || "-"}
        </span>
      ),
    },
    {
      key: "template_key",
      header: "Plantilla",
      render: (card) => (
        <Badge size="sm" color="info">
          {getTemplateLabel(card.template_key)}
        </Badge>
      ),
    },
    {
      key: "slug",
      header: "Slug",
      render: (card) => (
        <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
          {card.slug || "-"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Estado",
      render: (card) => (
        <Badge
          size="sm"
          color={card.status === "inactive" ? "error" : "success"}
        >
          {card.status === "inactive" ? "Inactivo" : "Activo"}
        </Badge>
      ),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      loading={loading}
      emptyMessage="No hay tarjetas registradas."
      getRowKey={(card) => card.uuid}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      showView={showView}
      showEdit={showEdit}
      showDelete={showDelete}
    />
  );
}

function getTemplateLabel(templateKey: string) {
  const labels: Record<string, string> = {
    classic: "Clásica",
    modern: "Moderna",
    corporate: "Corporativa",
    minimal: "Minimalista",
    premium: "Premium",
  };

  return labels[templateKey] ?? templateKey;
}