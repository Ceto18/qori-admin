"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import OrganizationForm from "@/modules/organizations/components/OrganizationForm";
import { useOrganizationStore } from "@/modules/organizations/store/useOrganizationStore";

export default function EditOrganizationPage() {
  const router = useRouter();
  const params = useParams();

  const uuid = params.uuid as string;

  const {
    organization,
    loading,
    fetchOrganization,
    updateOrganization,
    clearOrganization,
  } = useOrganizationStore();

  useEffect(() => {
    if (uuid) {
      fetchOrganization(uuid);
    }

    return () => {
      clearOrganization();
    };
  }, [uuid, fetchOrganization, clearOrganization]);

  const handleSubmit = async (payload: FormData) => {
    await updateOrganization(uuid, payload);

    router.push("/organizations");
  };

  const handleCancel = () => {
    router.push("/organizations");
  };

  if (loading && !organization) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500 dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-gray-400">
          Cargando organización...
        </div>
      </div>
    );
  }

  if (!loading && !organization) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500 dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-gray-400">
          No se encontró la organización.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <OrganizationForm
        initialData={organization}
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}