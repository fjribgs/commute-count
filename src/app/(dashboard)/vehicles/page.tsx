import PageBreadcrumb from "@/components/page-breadcrumb";

export default function VehiclesPage() {
  return (
    <div>
      <PageBreadcrumb
        items={[
          {
            title: "Routes & Vehicles",
            href: "/vehicles",
          }
        ]}
      />
      route and vehicle page
    </div>
  )
}