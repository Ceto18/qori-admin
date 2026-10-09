"use client";

import Badge from "@/shared/components/ui/badge/Badge";
import DataTable, {
    DataTableColumn,
} from "@/shared/components/table/DataTable";

import { Affiliate } from "../types";

interface Props {
    data: Affiliate[];
    loading?: boolean;

    onView?: (affiliate: Affiliate) => void;
    onEdit?: (affiliate: Affiliate) => void;
    onDelete?: (affiliate: Affiliate) => void;

    showView?: boolean;
    showEdit?: boolean;
    showDelete?: boolean;
}

export default function AffiliateTable({
    data,
    loading = false,
    onView,
    onEdit,
    onDelete,
    showView = false,
    showEdit = true,
    showDelete = true,
}: Props) {
    const columns: DataTableColumn<Affiliate>[] = [
        {
            key: "name",
            header: "Afiliado",
            render: (affiliate) => (
                <div>
                    <p className="font-medium text-gray-800 dark:text-white/90">
                        {getFullName(affiliate)}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {affiliate.email || "-"}
                    </p>
                </div>
            ),
        },
        {
            key: "document",
            header: "Documento",
            render: (affiliate) => (
                <div>
                    <p className="text-gray-700 dark:text-gray-300">
                        {affiliate.profile?.document || "-"}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {getDocumentTypeLabel(
                            affiliate.profile?.type_document
                        )}
                    </p>
                </div>
            ),
        },
        {
            key: "phone",
            header: "Teléfono",
            render: (affiliate) => (
                <span className="text-gray-500 dark:text-gray-400">
                    {formatPhone(
                        affiliate.profile?.country_code,
                        affiliate.profile?.phone
                    )}
                </span>
            ),
        },
        {
            key: "address",
            header: "Dirección",
            render: (affiliate) => (
                <span className="text-gray-500 dark:text-gray-400">
                    {affiliate.profile?.address || "-"}
                </span>
            ),
        },
        {
            key: "role",
            header: "Rol",
            render: () => (
                <Badge size="sm" color="info">
                    Afiliado
                </Badge>
            ),
        },
        {
            key: "active",
            header: "Estado",
            render: (affiliate) => (
                <Badge
                    size="sm"
                    color={
                        affiliate.active
                            ? "success"
                            : "error"
                    }
                >
                    {affiliate.active
                        ? "Activo"
                        : "Inactivo"}
                </Badge>
            ),
        },
        {
            key: "created_at",
            header: "Registro",
            render: (affiliate) => (
                <span className="text-gray-500 dark:text-gray-400">
                    {formatDate(
                        affiliate.created_at
                    )}
                </span>
            ),
        },
    ];

    return (
        <DataTable
            data={data}
            columns={columns}
            loading={loading}
            emptyMessage="No hay afiliados registrados."
            getRowKey={(affiliate) =>
                affiliate.uuid
            }
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            showView={showView}
            showEdit={showEdit}
            showDelete={showDelete}
        />
    );
}

function getFullName(
    affiliate: Affiliate
) {
    const name =
        affiliate.profile?.name ?? "";

    const lastName =
        affiliate.profile?.last_name ?? "";

    const fullName =
        `${name} ${lastName}`.trim();

    return fullName || "-";
}

function getDocumentTypeLabel(
    type?: string
) {
    const labels: Record<
        string,
        string
    > = {
        DNI: "DNI",
        CE: "Carnet de extranjería",
        PASAPORTE: "Pasaporte",
        RUC: "RUC",
    };

    if (!type) return "-";

    return labels[type] ?? type;
}

function formatPhone(
    countryCode?: string,
    phone?: string
) {
    if (!phone) return "-";

    if (!countryCode) {
        return phone;
    }

    return `${countryCode} ${phone}`;
}

function formatDate(
    value: string | null
) {
    if (!value) return "Sin fecha";

    return new Intl.DateTimeFormat(
        "es-PE",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }
    ).format(new Date(value));
}