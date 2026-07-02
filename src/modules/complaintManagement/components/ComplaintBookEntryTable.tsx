"use client";

import Badge from "@/shared/components/ui/badge/Badge";
import DataTable, {
    DataTableColumn,
} from "@/shared/components/table/DataTable";

import { ComplaintBookEntry } from "../types";

interface Props {
    data: ComplaintBookEntry[];
    loading?: boolean;

    onView?: (entry: ComplaintBookEntry) => void;
    onEdit?: (entry: ComplaintBookEntry) => void;
    onDelete?: (entry: ComplaintBookEntry) => void;

    showView?: boolean;
    showEdit?: boolean;
    showDelete?: boolean;
}

export default function ComplaintBookEntryTable({
    data,
    loading = false,
    onView,
    onEdit,
    onDelete,
    showView = true,
    showEdit = false,
    showDelete = false,
}: Props) {
    const columns: DataTableColumn<ComplaintBookEntry>[] = [
        {
            key: "entry_type",
            header: "Tipo",
            render: (entry) => (
                <Badge
                    size="sm"
                    color={entry.entry_type === "claim" ? "warning" : "info"}
                >
                    {getEntryTypeLabel(entry.entry_type)}
                </Badge>
            ),
        },
        {
            key: "consumer_name",
            header: "Consumidor",
            render: (entry) => (
                <div>
                    <p className="font-medium text-gray-800 dark:text-white/90">
                        {entry.consumer_name || "-"}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {getDocumentTypeLabel(entry.document_type)}{" "}
                        {entry.document_number || "-"}
                    </p>
                </div>
            ),
        },
        {
            key: "email",
            header: "Contacto",
            render: (entry) => (
                <div>
                    <p className="text-gray-700 dark:text-gray-300">
                        {entry.email || "-"}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {entry.phone || "Sin teléfono"}
                    </p>
                </div>
            ),
        },
        {
            key: "product_or_service",
            header: "Producto / Servicio",
            render: (entry) => (
                <span className="text-gray-700 dark:text-gray-300">
                    {entry.product_or_service || "-"}
                </span>
            ),
        },
        {
            key: "claimed_amount",
            header: "Monto",
            render: (entry) => (
                <span className="font-medium text-gray-700 dark:text-gray-300">
                    {formatAmount(entry.claimed_amount)}
                </span>
            ),
        },
        {
            key: "is_minor",
            header: "Menor de edad",
            render: (entry) => (
                <Badge size="sm" color={entry.is_minor ? "warning" : "success"}>
                    {entry.is_minor ? "Sí" : "No"}
                </Badge>
            ),
        },
        {
            key: "created_at",
            header: "Fecha",
            render: (entry) => (
                <span className="text-gray-500 dark:text-gray-400">
                    {formatDate(entry.created_at)}
                </span>
            ),
        },
    ];

    return (
        <DataTable
            data={data}
            columns={columns}
            loading={loading}
            emptyMessage="No hay reclamos o quejas registrados."
            getRowKey={(entry) => entry.uuid ?? String(entry.id)}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            showView={showView}
            showEdit={showEdit}
            showDelete={showDelete}
        />
    );
}

function getEntryTypeLabel(type: string) {
    const labels: Record<string, string> = {
        claim: "Reclamo",
        complaint: "Queja",
    };

    return labels[type] ?? type;
}

function getDocumentTypeLabel(type: string) {
    const labels: Record<string, string> = {
        dni: "DNI",
        ce: "Carné de extranjería",
        passport: "Pasaporte",
        ruc: "RUC",
    };

    return labels[type] ?? type?.toUpperCase?.() ?? "-";
}

function formatAmount(value?: string | number | null) {
    if (value === null || value === undefined || value === "") {
        return "Sin monto";
    }

    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) {
        return String(value);
    }

    return `S/ ${numberValue.toFixed(2)}`;
}

function formatDate(value?: string | null) {
    if (!value) return "Sin fecha";

    return new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(value));
}