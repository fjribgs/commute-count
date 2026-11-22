import { auth } from "@/server/better-auth";
import { headers } from "next/headers";
import { redirect } from 'next/navigation';
import TestSection from "@/app/_components/dashboard/test";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Dashboard Utama (Terlindungi)</h1>
      <br />
      <TestSection />
    </main>
  );
}