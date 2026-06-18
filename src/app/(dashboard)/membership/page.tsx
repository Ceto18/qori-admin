import MembershipPlans from "@/modules/membership/components/MembershipPlans";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membresías | Qori ID",
  description: "Lista de membresías disponibles en Qori ID",
};

export default function MembershipsPage() {
  return <MembershipPlans />;
}