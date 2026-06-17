"use client";

import Badge from "@/shared/components/ui/badge/Badge";
import DataTable, {
    DataTableColumn,
} from "@/shared/components/table/DataTable";

import { DiscountCode } from "../types";

interface Props {
    data: DiscountCode[];
    loading?: boolean;

    onView?: (discountCode: DiscountCode) => void;
    onEdit?: (discountCode: DiscountCode) => void;
    onDelete?: (discountCode: DiscountCode) => void;

    showView?: boolean;
    showEdit?: boolean;
    showDelete?: boolean;
}

export default function DiscountCodeTable({
    data,
    loading = false,
    onView,
    onEdit,
    onDelete,
    showView = false,
    showEdit = true,
    showDelete = true,
}: Props) {
    const columns: DataTableColumn<DiscountCode>[] = [
        {
            key: "code",
            header: "Código",
            render: (discountCode) => (
                <div>
                    <p className="font-medium text-gray-800 dark:text-white/90">
                        {discountCode.code || "-"}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {discountCode.name || "Sin nombre"}
                    </p>
                </div>
            ),
        },
        {
            key: "type",
            header: "Tipo",
            render: (discountCode) => (
                <Badge size="sm" color="info">
                    {getTypeLabel(discountCode.type)}
                </Badge>
            ),
        },
        {
            key: "value",
            header: "Valor",
            render: (discountCode) => (
                <span className="font-medium text-gray-700 dark:text-gray-300">
                    {formatDiscountValue(discountCode.type, discountCode.value)}
                </span>
            ),
        },
        {
            key: "max_uses",
            header: "Usos",
            render: (discountCode) => (
                <span className="text-gray-500 dark:text-gray-400">
                    {discountCode.used_count ?? 0}
                    {" / "}
                    {discountCode.max_uses ?? "Ilimitado"}
                </span>
            ),
        },
        {
            key: "starts_at",
            header: "Inicio",
            render: (discountCode) => (
                <span className="text-gray-500 dark:text-gray-400">
                    {formatDate(discountCode.starts_at)}
                </span>
            ),
        },
        {
            key: "expires_at",
            header: "Expira",
            render: (discountCode) => (
                <span className="text-gray-500 dark:text-gray-400">
                    {formatDate(discountCode.expires_at)}
                </span>
            ),
        },
        {
            key: "active",
            header: "Estado",
            render: (discountCode) => (
                <Badge size="sm" color={discountCode.active ? "success" : "error"}>
                    {discountCode.active ? "Activo" : "Inactivo"}
                </Badge>
            ),
        },
    ];

    return (
        <DataTable
            data={data}
            columns={columns}
            loading={loading}
            emptyMessage="No hay códigos de descuento registrados."
            getRowKey={(discountCode) => discountCode.uuid}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            showView={showView}
            showEdit={showEdit}
            showDelete={showDelete}
        />
    );
}

function getTypeLabel(type: string) {
    const labels: Record<string, string> = {
        percentage: "Porcentaje",
        fixed: "Monto fijo",
    };

    return labels[type] ?? type;
}

function formatDiscountValue(type: string, value: string | number) {
    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) return value;

    if (type === "percentage") {
        return `${numberValue.toFixed(2)}%`;
    }

    return `S/ ${numberValue.toFixed(2)}`;
}

function formatDate(value: string | null) {
    if (!value) return "Sin fecha";

    return new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(value));
}