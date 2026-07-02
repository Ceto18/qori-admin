"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";

import TableToolbar from "@/shared/components/table/TableToolbar";
import TablePagination from "@/shared/components/table/TablePagination";
import ConfirmModal from "@/shared/components/ui/modal/ConfirmModal";
import { ComplaintBookEntry } from "@/modules/complaintManagement/types";
import ComplaintBookEntryTable from "@/modules/complaintManagement/components/ComplaintBookEntryTable";
import { useComplaintBookStore } from "@/modules/complaintManagement/store/useComplaintBookStore";


function TableAntLoading() {
    return (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-white/70 dark:bg-gray-950/70">
            <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm dark:border-white/[0.08] dark:bg-gray-900">
                <Spin size="large" />

                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Cargando reclamos y quejas...
                </span>
            </div>
        </div>
    );
}

export default function ComplaintBookEntriesPage() {
    const router = useRouter();

    const {
        complaintBookEntries,
        currentPage,
        totalPages,
        perPage,
        loading,
        fetchComplaintBookEntries,
        deleteComplaintBookEntry,
    } = useComplaintBookStore();

    const [search, setSearch] = useState("");
    const [entryToDelete, setEntryToDelete] =
        useState<ComplaintBookEntry | null>(null);

    useEffect(() => {
        fetchComplaintBookEntries({
            page: 1,
            perPage,
            search: "",
        });
    }, [fetchComplaintBookEntries, perPage]);

    const handleSearchChange = (value: string) => {
        setSearch(value);
    };

    const handleSearchSubmit = () => {
        fetchComplaintBookEntries({
            page: 1,
            perPage,
            search,
        });
    };

    const handlePageChange = (page: number) => {
        fetchComplaintBookEntries({
            page,
            perPage,
            search,
        });
    };

    const handlePerPageChange = (newPerPage: number) => {
        fetchComplaintBookEntries({
            page: 1,
            perPage: newPerPage,
            search,
        });
    };

    const handleView = (entry: ComplaintBookEntry) => {
        router.push(`/complaint-book-entries/${entry.uuid}`);
    };

    const handleDelete = (entry: ComplaintBookEntry) => {
        setEntryToDelete(entry);
    };

    const handleConfirmDelete = async () => {
        if (!entryToDelete?.uuid) return;

        try {
            await deleteComplaintBookEntry(entryToDelete.uuid);

            setEntryToDelete(null);

            await fetchComplaintBookEntries({
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

        setEntryToDelete(null);
    };

    return (
        <div className="space-y-6">
            <TableToolbar
                title="Libro de reclamaciones"
                description="Consulta los reclamos y quejas registrados por los usuarios."
                searchValue={search}
                searchPlaceholder="Buscar por consumidor, documento o correo..."
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
            />

            <div className="relative">
                {loading && <TableAntLoading />}

                <ComplaintBookEntryTable
                    data={complaintBookEntries}
                    loading={false}
                    onView={handleView}
                    onDelete={handleDelete}
                    showView={true}
                    showEdit={false}
                    showDelete={true}
                />
            </div>

            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                perPage={perPage}
                perPageOptions={[10, 25, 50, 100]}
                onPageChange={handlePageChange}
                onPerPageChange={handlePerPageChange}
            />

            <ConfirmModal
                open={Boolean(entryToDelete)}
                title="Eliminar registro"
                message={`¿Seguro que deseas eliminar el registro de "${
                    entryToDelete?.consumer_name ?? ""
                }"? Esta acción no se puede deshacer.`}
                confirmText="Eliminar"
                cancelText="Cancelar"
                loading={loading}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
}