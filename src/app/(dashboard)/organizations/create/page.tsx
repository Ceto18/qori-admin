"use client";

import { useRouter } from "next/navigation";

import OrganizationForm from "@/modules/organizations/components/OrganizationForm";
import { useOrganizationStore } from "@/modules/organizations/store/useOrganizationStore";

export default function CreateOrganizationPage() {
  const router = useRouter();

  const { loading, createOrganization } = useOrganizationStore();

  const handleSubmit = async (payload: FormData) => {
    try {
      await createOrganization(payload);

      router.push("/organizations");
    } catch {
    }
  };

  const handleCancel = () => {
    router.push("/organizations");
  };

  return (
    <div className="space-y-6">
      <OrganizationForm
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}