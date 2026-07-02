import type { Metadata } from "next";

import DashboardHome from "@/modules/dasboard/components/DashboardHome";

export const metadata: Metadata = {
  title: "Dashboard | Qori ID",
  description: "Panel principal de Qori ID",
};

export default function DashboardPage() {
  return <DashboardHome />;
}