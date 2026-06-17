// src/modules/plans/components/PlanTable.tsx

"use client";

import { useState } from "react";
import { Switch } from "antd";

import Badge from "@/shared/components/ui/badge/Badge";
import DataTable, {
    DataTableColumn,
} from "@/shared/components/table/DataTable";

import { Plan } from "../types";

interface Props {
    data: Plan[];
    loading?: boolean;

    onView?: (plan: Plan) => void;
    onEdit?: (plan: Plan) => void;
    onDelete?: (plan: Plan) => void;
    onToggleState?: (plan: Plan, state: boolean) => Promise<void> | void;

    showView?: boolean;
    showEdit?: boolean;
    showDelete?: boolean;
}

export default function PlanTable({
    data,
    loading = false,
    onView,
    onEdit,
    onDelete,
    onToggleState,
    showView = false,
    showEdit = true,
    showDelete = true,
}: Props) {
    const [updatingPlanUuid, setUpdatingPlanUuid] = useState<string | null>(
        null
    );

    const handleToggleState = async (plan: Plan, state: boolean) => {
        if (!onToggleState) return;

        try {
            setUpdatingPlanUuid(plan.uuid);

            await onToggleState(plan, state);
        } finally {
            setUpdatingPlanUuid(null);
        }
    };

    const columns: DataTableColumn<Plan>[] = [
        {
            key: "name",
            header: "Plan",
            render: (plan) => (
                <div>
                    <p className="font-medium text-gray-800 dark:text-white/90">
                        {plan.name || "-"}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {plan.slug || "Sin slug"}
                    </p>
                </div>
            ),
        },
        {
            key: "price",
            header: "Precio",
            render: (plan) => (
                <span className="font-medium text-gray-700 dark:text-gray-300">
                    S/ {formatPrice(plan.price)}
                </span>
            ),
        },
        {
            key: "max_organizations",
            header: "Organizaciones",
            render: (plan) => (
                <Badge size="sm" color="info">
                    {plan.max_organizations}
                </Badge>
            ),
        },
        {
            key: "max_cards",
            header: "Tarjetas",
            render: (plan) => (
                <Badge size="sm" color="success">
                    {plan.max_cards}
                </Badge>
            ),
        },
        {
            key: "active",
            header: "Habilitado",
            render: (plan) => (
                <Switch
                    checked={Boolean(plan.active)}
                    loading={updatingPlanUuid === plan.uuid}
                    disabled={
                        !onToggleState ||
                        (updatingPlanUuid !== null &&
                            updatingPlanUuid !== plan.uuid)
                    }
                    onChange={(checked) => handleToggleState(plan, checked)}
                />
            ),
        },
    ];

    return (
        <DataTable
            data={data}
            columns={columns}
            loading={loading}
            emptyMessage="No hay planes registrados."
            getRowKey={(plan) => plan.uuid}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            showView={showView}
            showEdit={showEdit}
            showDelete={showDelete}
        />
    );
}

function formatPrice(price: string | number) {
    const value = Number(price);

    if (Number.isNaN(value)) return price;

    return value.toFixed(2);
}