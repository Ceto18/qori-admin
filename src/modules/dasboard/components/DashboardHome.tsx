"use client";

import { useEffect, useState } from "react";

import DashboardHero from "./DashboardHero";
import MembershipStatusCard from "./MembershipStatusCard";
import AvailableCardsSection from "./AvailableCardsSection";

import { useAuthStore } from "@/store/useAuthStore";
import { useCardStore } from "@/modules/cards/store/useCardStore";
import { organizationService } from "@/modules/organizations/services/organizationService";
import type { Organization } from "@/modules/organizations/types";
import { handleApiError } from "@/shared/utils/handleApiError";

export default function DashboardHome() {
  const user = useAuthStore((state) => state.user);

  const { cards, loading, fetchCards, clearCards } = useCardStore();

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [organizationUuid, setOrganizationUuid] = useState("");
  const [loadingOrganizations, setLoadingOrganizations] = useState(false);

  const hasActiveMembership =
    user?.role === "admin" || user?.role === "superadmin";

  const canViewCards =
    user?.role === "admin" || user?.role === "superadmin";

  useEffect(() => {
    const loadOrganizations = async () => {
      if (!canViewCards) {
        setOrganizations([]);
        setOrganizationUuid("");
        clearCards();
        return;
      }

      try {
        setLoadingOrganizations(true);

        const response = await organizationService.getOrganizations({
          page: 1,
          per_page: 100,
        });

        const organizationsData: Organization[] =
          response.data?.data ?? response.data ?? [];

        setOrganizations(organizationsData);

        if (organizationsData.length > 0) {
          setOrganizationUuid((currentUuid) => {
            if (currentUuid) return currentUuid;

            return organizationsData[0].uuid;
          });
        }
      } catch (error) {
        console.error("Error al cargar organizaciones:", error);
        handleApiError(error);
      } finally {
        setLoadingOrganizations(false);
      }
    };

    loadOrganizations();
  }, [canViewCards, clearCards]);

  useEffect(() => {
    if (!canViewCards) {
      clearCards();
      return;
    }

    if (!organizationUuid) {
      clearCards();
      return;
    }

    fetchCards(organizationUuid, {
      page: 1,
      perPage: 5,
      search: "",
    });
  }, [canViewCards, organizationUuid, fetchCards, clearCards]);

  const handleOrganizationChange = (newOrganizationUuid: string) => {
    setOrganizationUuid(newOrganizationUuid);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-8">
          <DashboardHero hasActiveMembership={hasActiveMembership} />
        </div>

        <div className="col-span-12 xl:col-span-4">
          <MembershipStatusCard hasActiveMembership={hasActiveMembership} />
        </div>
      </div>

      {!canViewCards ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            Aún no tienes tarjetas disponibles
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Para crear y administrar tarjetas necesitas una membresía activa.
          </p>
        </div>
      ) : loadingOrganizations ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Cargando organizaciones...
          </p>
        </div>
      ) : loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Cargando tarjetas...
          </p>
        </div>
      ) : (
        <AvailableCardsSection
          cards={cards}
          organizations={organizations}
          organizationUuid={organizationUuid}
          hasActiveMembership={hasActiveMembership}
          loadingOrganizations={loadingOrganizations}
          onOrganizationChange={handleOrganizationChange}
        />
      )}
    </div>
  );
}