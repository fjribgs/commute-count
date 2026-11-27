import { auth } from "@/server/better-auth";
import { headers } from "next/headers";
import { redirect } from 'next/navigation';
import PageBreadcrumb from "@/components/page-breadcrumb";

import HeaderSection from "@/app/_components/overview/header-section";
import SimulationParameters from "../_components/overview/simulation-section";
import KPICardsSection from "../_components/overview/kpi-section";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="space-y-4">
      <PageBreadcrumb
        items={[
          {
            title: "Overview & Simulator",
            href: "/",
          }
        ]}
      />
      <HeaderSection />
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">
        <div className="w-full flex-1 lg:w-95 xl:w-105 shrink-0">
          <SimulationParameters />
        </div>
        <div className="w-full flex-2 min-w-0">
          <KPICardsSection />
        </div>
      </div>
    </div>
  );
}