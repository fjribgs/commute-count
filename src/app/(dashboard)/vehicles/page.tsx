import ComparisonSection from "@/app/_components/vehicles/comparison-section";
import HeaderSection from "@/app/_components/vehicles/header-section";
import RoutesSection from "@/app/_components/vehicles/routes-section";
import VehiclesSection from "@/app/_components/vehicles/vehicles-section";
import PageBreadcrumb from "@/components/page-breadcrumb";

export default function VehiclesPage() {
  return (
    <div className="space-y-4">
      <PageBreadcrumb
        items={[
          {
            title: "Rute & Kendaraan",
            href: "/vehicles",
          }
        ]}
      />
      <HeaderSection />
      <VehiclesSection />
      <RoutesSection />
      <ComparisonSection />
    </div>
  )
}