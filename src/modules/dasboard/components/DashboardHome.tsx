"use client";

import { useEffect } from "react";

import DashboardHero from "./DashboardHero";
import MembershipStatusCard from "./MembershipStatusCard";
import AvailableCardsSection from "./AvailableCardsSection";

import { useAuthStore } from "@/store/useAuthStore";
import { useCardStore } from "@/modules/cards/store/useCardStore";

export default function DashboardHome() {
  const user = useAuthStore((state) => state.user);

  const { cards, loading, fetchCards, clearCards } = useCardStore();

  const hasActiveMembership =
    user?.role === "admin" || user?.role === "superadmin";

  const canViewCards =
    user?.role === "admin" || user?.role === "superadmin";

  /**
   * IMPORTANTE:
   * Aquí necesitas el UUID real de la organización.
   *
   * Por ahora lo dejo quemado para probar.
   * Luego debe venir desde tu organizationStore,
   * una organización seleccionada, o el usuario logueado.
   */
  const organizationUuid = "d2e78b0f-3d8a-47d7-a4c3-170b7ced1c86";

  useEffect(() => {
    if (!canViewCards) {
      clearCards();
      return;
    }

    if (!organizationUuid) return;

    fetchCards(organizationUuid, {
      page: 1,
      perPage: 5,
    });
  }, [canViewCards, organizationUuid, fetchCards, clearCards]);

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
      ) : loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Cargando tarjetas...
          </p>
        </div>
      ) : (
        <AvailableCardsSection
          cards={cards}
          organizationUuid={organizationUuid}
          hasActiveMembership={hasActiveMembership}
        />
      )}
    </div>
  );
}