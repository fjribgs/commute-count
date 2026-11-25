import {
  SidebarProvider,
  SidebarInset
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-layout/app-sidebar";
import { AppHeader } from "@/components/app-layout/app-header";
import { NavigationLoaderProvider } from "@/components/navigation-loader";

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface AppLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <NavigationLoaderProvider>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset className="min-w-0 overflow-x-hidden">
            <AppHeader />
            <main className="p-4 sm:p-6 bg-[#F8FAFC] min-h-[92vh]">
              {children}
            </main>
        </SidebarInset>
      </SidebarProvider>
    </NavigationLoaderProvider>
  );
}