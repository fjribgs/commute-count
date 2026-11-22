import { auth } from "@/server/better-auth";
import { headers } from "next/headers";
import { redirect } from 'next/navigation';

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
    </main>
  );
}