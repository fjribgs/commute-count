"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavigationLoader } from "@/components/navigation-loader";

export default function TestSection() {
  const { startLoading } = useNavigationLoader();
  const pathname = usePathname();

  return (
    <Link
      href="/"
      onClick={() => {
        if (pathname != "/") {
          startLoading();
        }
      }}
    >
      back
    </Link>
  )
}