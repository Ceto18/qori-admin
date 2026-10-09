"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";

import RoleGuard from "@/modules/auth/RoleGuard";

import TableToolbar from "@/shared/components/table/TableToolbar";
import TablePagination from "@/shared/components/table/TablePagination";
import ConfirmModal from "@/shared/components/ui/modal/ConfirmModal";

import AffiliateTable from "@/modules/affiliates/components/AffiliateTable";
import { useAffiliateStore } from "@/modules/affiliates/store/useAffiliateStore";
import { Affiliate } from "@/modules/affiliates/types";

function TableAntLoading() {
    return (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-white/70 dark:bg-gray-950/70">
            <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm dark:border-white/[0.08] dark:bg-gray-900">
                <Spin size="large" />

                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Cargando afiliados...
                </span>
            </div>
        </div>
    );
}

function AffiliatesPageContent() {
    const router = useRouter();

    const {
        affiliates,
        currentPage,
        totalPages,
        perPage,
        loading,
        fetchAffiliates,
        deleteAffiliate,
    } = useAffiliateStore();

    const [search, setSearch] = useState("");

    const [
        affiliateToDelete,
        setAffiliateToDelete,
    ] = useState<Affiliate | null>(null);

    useEffect(() => {
        fetchAffiliates({
            page: 1,
            perPage,
            search: "",
        });
    }, [fetchAffiliates, perPage]);

    const handleSearchChange = (
        value: string
    ) => {
        setSearch(value);
    };

    const handleSearchSubmit = () => {
        fetchAffiliates({
            page: 1,
            perPage,
            search,
        });
    };

    const handlePageChange = (
        page: number
    ) => {
        fetchAffiliates({
            page,
            perPage,
            search,
        });
    };

    const handlePerPageChange = (
        newPerPage: number
    ) => {
        fetchAffiliates({
            page: 1,
            perPage: newPerPage,
            search,
        });
    };

    const handleView = (
        affiliate: Affiliate
    ) => {
        router.push(
            `/affiliates/${affiliate.uuid}`
        );
    };

    const handleEdit = (
        affiliate: Affiliate
    ) => {
        router.push(
            `/affiliates/${affiliate.uuid}/edit`
        );
    };

    const handleDelete = (
        affiliate: Affiliate
    ) => {
        setAffiliateToDelete(affiliate);
    };

    const handleConfirmDelete =
        async () => {
            if (!affiliateToDelete) return;

            try {
                await deleteAffiliate(
                    affiliateToDelete.uuid
                );

                setAffiliateToDelete(null);

                await fetchAffiliates({
                    page: currentPage,
                    perPage,
                    search,
                });
            } catch {
                // El error ya se maneja en el store.
            }
        };

    const handleCancelDelete = () => {
        if (loading) return;

        setAffiliateToDelete(null);
    };

    const affiliateName =
        affiliateToDelete
            ? `${affiliateToDelete.profile?.name ?? ""} ${affiliateToDelete.profile
                    ?.last_name ?? ""
                }`.trim()
            : "";

    return (
        <div className="space-y-6">
            <TableToolbar
                title="Afiliados"
                description="Administra los afiliados registrados en la plataforma."
                addLabel="Nuevo afiliado"
                onAdd={() =>
                    router.push(
                        "/affiliates/create"
                    )
                }
                searchValue={search}
                searchPlaceholder="Buscar afiliado..."
                onSearchChange={
                    handleSearchChange
                }
                onSearchSubmit={
                    handleSearchSubmit
                }
            />

            <div className="relative">
                {loading && (
                    <TableAntLoading />
                )}

                <AffiliateTable
                    data={affiliates}
                    loading={false}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

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

            <ConfirmModal
                open={Boolean(
                    affiliateToDelete
                )}
                title="Eliminar afiliado"
                message={`¿Seguro que deseas eliminar al afiliado "${affiliateName}"? Esta acción no se puede deshacer.`}
                confirmText="Eliminar"
                cancelText="Cancelar"
                loading={loading}
                onConfirm={
                    handleConfirmDelete
                }
                onCancel={
                    handleCancelDelete
                }
            />
        </div>
    );
}

export default function AffiliatesPage() {
    return (
        <RoleGuard
            roles={[
                "admin",
                "superadmin",
            ]}
        >
            <AffiliatesPageContent />
        </RoleGuard>
    );
}