"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { BreadcrumbPage } from "@/components/ui/breadcrumb";
import { IconSlash } from "@tabler/icons-react";

export default function BreadcrumbPageClient() {
  const pathName = usePathname();
  return (
    <BreadcrumbPage className="flex items-center">
      {pathName.startsWith("/dashboard") && (
        <BreadcrumbComponent path="Dashboard" />
      )}
      {pathName === "/dashboard/create" && (
        <BreadcrumbComponent path="Create" />
      )}
      {pathName === "/dashboard/profile" && (
        <BreadcrumbComponent path="Profile" />
      )}
      {pathName === "/dashboard/customer-portal" && (
        <BreadcrumbComponent path="Customer Portal" />
      )}
    </BreadcrumbPage>
  );
}

export function BreadcrumbComponent({ path }: { path: string }) {
  return (
    <span className="flex items-center">
      <IconSlash />
      {path}
    </span>
  );
}
