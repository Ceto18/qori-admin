"use client";

import DashboardHero from "./DashboardHero";
import MembershipStatusCard from "./MembershipStatusCard";
import AvailableCardsSection from "./AvailableCardsSection";

import { availableCards } from "../data/dashboardCards";
import { useAuthStore } from "@/store/useAuthStore";

export default function DashboardHome() {
  const user = useAuthStore((state) => state.user);

  const hasActiveMembership =
    user?.role === "admin" || user?.role === "superadmin";

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

      <AvailableCardsSection
        cards={availableCards}
        hasActiveMembership={hasActiveMembership}
      />
    </div>
  );
}