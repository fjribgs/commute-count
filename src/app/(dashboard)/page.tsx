import { auth } from "@/server/better-auth";
import { headers } from "next/headers";
import { redirect } from 'next/navigation';
import PageBreadcrumb from "@/components/page-breadcrumb";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <PageBreadcrumb
        items={[
          {
            title: "Overview & Simulator",
            href: "/",
          },
        ]}
      />
    </main>
  );
}