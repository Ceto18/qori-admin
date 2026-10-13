"use client";

import { useEffect, useState } from "react";

import RoleGuard from "@/modules/auth/RoleGuard";

import DataTable, {
    DataTableColumn,
} from "@/shared/components/table/DataTable";

import TableToolbar from "@/shared/components/table/TableToolbar";
import TablePagination from "@/shared/components/table/TablePagination";
import { useAffiliateStore } from "@/modules/affiliates/store/useAffiliateStore";
import { AffiliateReferral } from "@/modules/affiliates/types";
;

function AffiliateUsagesPageContent() {
    const [search, setSearch] = useState("");

    const {
        affiliateReferrals,
        loadingReferrals,
        fetchAffiliateReferrals,
    } = useAffiliateStore();

    const referrals =
        affiliateReferrals?.data ?? [];

    const currentPage =
        affiliateReferrals?.current_page ?? 1;

    const totalPages =
        affiliateReferrals?.last_page ?? 1;

    const perPage =
        affiliateReferrals?.per_page ?? 10;

    useEffect(() => {
        fetchAffiliateReferrals({
            page: 1,
            perPage: 10,
        });
    }, [fetchAffiliateReferrals]);

    const columns: DataTableColumn<AffiliateReferral>[] = [
        {
            key: "full_name",
            header: "Usuario",
            render: (referral) => (
                <div>
                    <p className="font-medium text-gray-800 dark:text-white/90">
                        {referral.full_name || "-"}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {referral.document || "-"}
                    </p>
                </div>
            ),
        },
        {
            key: "subscription",
            header: "Plan",
            render: (referral) => (
                <div>
                    <p className="text-gray-700 dark:text-gray-300">
                        {referral.subscription?.name || "Sin plan"}
                    </p>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {getSubscriptionStatusLabel(
                            referral.subscription?.status
                        )}
                    </p>
                </div>
            ),
        },
        {
            key: "discount_amount",
            header: "Descuento",
            render: (referral) => (
                <span className="font-medium text-gray-700 dark:text-gray-300">
                    {formatCurrency(
                        referral.discount_amount
                    )}
                </span>
            ),
        },
        {
            key: "used_at",
            header: "Fecha de uso",
            render: (referral) => (
                <span className="text-gray-500 dark:text-gray-400">
                    {formatDate(referral.used_at)}
                </span>
            ),
        },
    ];

    const handleSearchChange = (
        value: string
    ) => {
        setSearch(value);
    };

    const handleSearchSubmit = () => {
    };

    const handlePageChange = (
        page: number
    ) => {
        fetchAffiliateReferrals({
            page,
            perPage,
        });
    };

    const handlePerPageChange = (
        newPerPage: number
    ) => {
        fetchAffiliateReferrals({
            page: 1,
            perPage: newPerPage,
        });
    };

    const filteredReferrals =
        search.trim()
            ? referrals.filter((referral) => {
                const query =
                    search
                        .toLowerCase()
                        .trim();

                return (
                    referral.full_name
                        ?.toLowerCase()
                        .includes(query) ||
                    referral.document
                        ?.toLowerCase()
                        .includes(query) ||
                    referral.subscription?.name
                        ?.toLowerCase()
                        .includes(query)
                );
            })
            : referrals;

    return (
        <div className="space-y-6">
            <TableToolbar
                title="Usos de mi código"
                description="Consulta los usuarios que utilizaron tu código de afiliado."
                searchValue={search}
                searchPlaceholder="Buscar usuario..."
                onSearchChange={
                    handleSearchChange
                }
                onSearchSubmit={
                    handleSearchSubmit
                }
            />

            <DataTable
                data={filteredReferrals}
                columns={columns}
                loading={loadingReferrals}
                emptyMessage="Todavía no se registraron usos de tu código."
                getRowKey={(referral) =>
                    referral.uuid
                }
                showView={false}
                showEdit={false}
                showDelete={false}
            />

            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                perPage={perPage}
                perPageOptions={[
                    10,
                    25,
                    50,
                    100,
                ]}
                onPageChange={
                    handlePageChange
                }
                onPerPageChange={
                    handlePerPageChange
                }
            />
        </div>
    );
}

function formatCurrency(
    value: string | number
) {
    const amount = Number(value);

    if (Number.isNaN(amount)) {
        return "S/ 0.00";
    }

    return new Intl.NumberFormat(
        "es-PE",
        {
            style: "currency",
            currency: "PEN",
        }
    ).format(amount);
}

function formatDate(
    value: string | null
) {
    if (!value) return "-";

    const date = new Date(value);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "-";
    }

    return new Intl.DateTimeFormat(
        "es-PE",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    ).format(date);
}

function getSubscriptionStatusLabel(
    status?: string
) {
    const labels: Record<
        string,
        string
    > = {
        active: "Activa",
        cancelled: "Cancelada",
        canceled: "Cancelada",
        pending: "Pendiente",
        expired: "Expirada",
    };

    if (!status) {
        return "-";
    }

    return labels[status] ?? status;
}

export default function AffiliateUsagesPage() {
    return (
        <RoleGuard roles={["affiliate"]}>
            <AffiliateUsagesPageContent />
        </RoleGuard>
    );
}