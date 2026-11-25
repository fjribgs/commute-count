import AppLayout from "@/layouts/app-layout";
import { Toaster } from "@/components/ui/toast";
import { BreadcrumbProvider } from "@/hooks/use-breadcrumb";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <BreadcrumbProvider>
      <AppLayout>
        <Toaster />
        {children}
      </AppLayout>
    </BreadcrumbProvider>
  );
}
