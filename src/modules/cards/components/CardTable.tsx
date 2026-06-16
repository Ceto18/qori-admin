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
      render: (card) => {
        const fullName =
          card.full_name ??
          `${card.first_name ?? ""} ${card.last_name ?? ""}`.trim();

        return (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-sm font-semibold text-gray-500 dark:bg-gray-800 dark:text-gray-300">
              {card.photo_perfil_url ? (
                <img
                  src={card.photo_perfil_url}
                  alt={fullName || "Tarjeta"}
                  className="h-full w-full object-cover"
                />
              ) : (
                fullName?.charAt(0)?.toUpperCase() || "?"
              )}
            </div>

            <div>
              <p className="font-medium text-gray-800 dark:text-white/90">
                {fullName || "-"}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {card.position || "Sin cargo"}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      key: "institution",
      header: "Empresa",
      render: (card) => (
        <span className="text-gray-500 dark:text-gray-400">
          {card.institution || "-"}
        </span>
      ),
    },
    {
      key: "design_id",
      header: "Plantilla",
      render: (card) => (
        <Badge size="sm" color="info">
          {getTemplateLabel(card.design_id)}
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
      key: "active",
      header: "Estado",
      render: (card) => (
        <Badge size="sm" color={card.active ? "success" : "error"}>
          {card.active ? "Activo" : "Inactivo"}
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

function getTemplateLabel(designId: string | number) {
  const labels: Record<string, string> = {
    "1": "Clásica",
    "2": "Moderna",
    "3": "Corporativa",
    "4": "Minimalista",
    "5": "Premium",
  };

  return labels[String(designId)] ?? `Plantilla ${designId}`;
}