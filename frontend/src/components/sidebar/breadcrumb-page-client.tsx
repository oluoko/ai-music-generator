"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { BreadcrumbPage } from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function BreadcrumbPageClient() {
  const pathName = usePathname();
  return (
    <BreadcrumbPage className="flex items-center">
      {pathName.startsWith("/dashboard") && (
        <BreadcrumbComponent path="dashboard" label="Dashboard" />
      )}
      {pathName === "/dashboard/create" && (
        <BreadcrumbComponent path="create" label="Create" />
      )}
      {pathName === "/dashboard/profile" && (
        <BreadcrumbComponent path="profile" label="Profile" />
      )}
      {pathName === "/dashboard/customer-portal" && (
        <BreadcrumbComponent path="customer-portal" label="Customer Portal" />
      )}
    </BreadcrumbPage>
  );
}

export function BreadcrumbComponent({
  path,
  label,
}: {
  path: string;
  label: string;
}) {
  return (
    <Link
      href={path === "dashboard" ? "/dashboard" : `/dashboard/${path}`}
      className="flex items-center"
    >
      <span className="mx-1 text-xl"> / </span>
      {label}
    </Link>
  );
}
