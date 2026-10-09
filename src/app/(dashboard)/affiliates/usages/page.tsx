"use client";

import { useMemo, useState } from "react";

import RoleGuard from "@/modules/auth/RoleGuard";

import DataTable, {
    DataTableColumn,
} from "@/shared/components/table/DataTable";

import TableToolbar from "@/shared/components/table/TableToolbar";
import TablePagination from "@/shared/components/table/TablePagination";

type AffiliateUsage = {
    uuid: string;
    name: string;
    email: string;
    code: string;
    plan: string | null;
    used_at: string;
};

function AffiliateUsagesPageContent() {
    const [search, setSearch] = useState("");

    // TODO:
    // Reemplazar por:
    //
    // const {
    //   usages,
    //   currentPage,
    //   totalPages,
    //   perPage,
    //   loading,
    //   fetchUsages,
    // } = useAffiliateDashboardStore();

    const usages: AffiliateUsage[] = [];

    const currentPage = 1;
    const totalPages = 1;
    const perPage = 10;
    const loading = false;

    const filteredUsages = useMemo(() => {
        if (!search.trim()) {
            return usages;
        }

        const query =
            search.toLowerCase().trim();

        return usages.filter((usage) => {
            return (
                usage.name
                    .toLowerCase()
                    .includes(query) ||
                usage.email
                    .toLowerCase()
                    .includes(query) ||
                usage.code
                    .toLowerCase()
                    .includes(query)
            );
        });
    }, [usages, search]);

    const columns: DataTableColumn<AffiliateUsage>[] =
        [
            {
                key: "name",
                header: "Usuario",
                render: (usage) => (
                    <div>
                        <p className="font-medium text-gray-800 dark:text-white/90">
                            {usage.name || "-"}
                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {usage.email || "-"}
                        </p>
                    </div>
                ),
            },
            {
                key: "code",
                header: "Código",
                render: (usage) => (
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                        {usage.code || "-"}
                    </span>
                ),
            },
            {
                key: "plan",
                header: "Plan",
                render: (usage) => (
                    <span className="text-gray-500 dark:text-gray-400">
                        {usage.plan || "Sin plan"}
                    </span>
                ),
            },
            {
                key: "used_at",
                header: "Fecha de uso",
                render: (usage) => (
                    <span className="text-gray-500 dark:text-gray-400">
                        {formatDate(usage.used_at)}
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
        // TODO:
        // Cuando tengamos el endpoint:
        //
        // fetchUsages({
        //   page: 1,
        //   perPage,
        //   search,
        // });
    };

    const handlePageChange = (
        page: number
    ) => {
        console.log(
            "Cambiar página:",
            page
        );

        // TODO:
        // fetchUsages({
        //   page,
        //   perPage,
        //   search,
        // });
    };

    const handlePerPageChange = (
        newPerPage: number
    ) => {
        console.log(
            "Cambiar registros por página:",
            newPerPage
        );

        // TODO:
        // fetchUsages({
        //   page: 1,
        //   perPage: newPerPage,
        //   search,
        // });
    };

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
                data={filteredUsages}
                columns={columns}
                loading={loading}
                emptyMessage="Todavía no se registraron usos de tu código."
                getRowKey={(usage) =>
                    usage.uuid
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

export default function AffiliateUsagesPage() {
    return (
        <RoleGuard roles={["affiliate"]}>
            <AffiliateUsagesPageContent />
        </RoleGuard>
    );
}