"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useBreadcrumb } from "@/hooks/use-breadcrumb";

export function AppHeader() {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <header className="sticky top-0 z-30 flex h-[7vh] items-center border-b border-zinc-200 bg-white px-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-start">
          <SidebarTrigger className="cursor-pointer" />

          <div className="ml-2">
            {breadcrumbs.length > 0 && (
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;

                    return (
                      <div
                        key={`${item.title}-${index}`}
                        className="flex items-center"
                      >
                        <BreadcrumbItem>
                          {isLast || !item.href ? (
                            <BreadcrumbPage className="pt-0.5 font-medium">
                              {item.title}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink className="pe-1 pb-0.5">
                              <Link href={item.href}>{item.title}</Link>
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>

                        {!isLast && <BreadcrumbSeparator />}
                      </div>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>
        </div>
        <div className="flex h-[5vh] items-center gap-6">
          <div className="bg-accent text-orange-2xl rounded-full border border-gray-400 flex justify-center items-center h-full px-6 py-4 font-medium hover:cursor-default gap-2">
            Honda Beat
            <span>
              |
            </span>
            Kampus Route
          </div>
          <Button className="text-orange-2xl bg-orange-lg text-medium hover:bg-orange-lg/90 flex h-full cursor-pointer items-center justify-center gap-2 px-4 font-semibold">
            <Plus className="pb-0.5 font-semibold" />
            <span>New Simulation</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
