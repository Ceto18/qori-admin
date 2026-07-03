// src/modules/cards/components/CardTable.tsx

"use client";

import { useState } from "react";
import { Switch } from "antd";
import { Link2, QrCode } from "lucide-react";

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
    onToggleState?: (card: Card, state: boolean) => Promise<void> | void;

    onOpenUrl?: (card: Card) => void;
    onOpenQr?: (card: Card) => void;

    showView?: boolean;
    showEdit?: boolean;
    showDelete?: boolean;
    showShareUrl?: boolean;
    showQr?: boolean;
}

export default function CardTable({
    data,
    loading = false,
    onView,
    onEdit,
    onDelete,
    onToggleState,
    onOpenUrl,
    onOpenQr,
    showView = false,
    showEdit = true,
    showDelete = true,
    showShareUrl = true,
    showQr = true,
}: Props) {
    const [updatingCardUuid, setUpdatingCardUuid] = useState<string | null>(
        null
    );

    const handleToggleState = async (card: Card, state: boolean) => {
        if (!onToggleState) return;

        try {
            setUpdatingCardUuid(card.uuid);
            await onToggleState(card, state);
        } finally {
            setUpdatingCardUuid(null);
        }
    };

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
            key: "active",
            header: "Habilitado",
            render: (card) => (
                <Switch
                    checked={Boolean(card.active)}
                    loading={updatingCardUuid === card.uuid}
                    disabled={
                        !onToggleState ||
                        (updatingCardUuid !== null &&
                            updatingCardUuid !== card.uuid)
                    }
                    onChange={(checked) => handleToggleState(card, checked)}
                />
            ),
        },
        {
            key: "share",
            header: "Compartir",
            render: (card) => (
                <div className="flex items-center gap-2">
                    {showShareUrl && (
                        <button
                            type="button"
                            onClick={() => onOpenUrl?.(card)}
                            disabled={!onOpenUrl}
                            title="Compartir URL"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[0.08] dark:text-gray-400 dark:hover:border-brand-500/50 dark:hover:bg-brand-500/10 dark:hover:text-brand-400"
                        >
                            <Link2 size={16} />
                        </button>
                    )}

                    {showQr && (
                        <button
                            type="button"
                            onClick={() => onOpenQr?.(card)}
                            disabled={!onOpenQr}
                            title="Ver QR"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-purple-500 hover:bg-purple-50 hover:text-purple-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[0.08] dark:text-gray-400 dark:hover:border-purple-500/50 dark:hover:bg-purple-500/10 dark:hover:text-purple-400"
                        >
                            <QrCode size={16} />
                        </button>
                    )}
                </div>
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