import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;

  if (!token) {
    redirect('/login');
  }

  return (
    <main>
      <h1>Dashboard Utama (Terlindungi)</h1>
    </main>
  );
}