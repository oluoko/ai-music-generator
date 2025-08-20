"use client";

import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import LoadingDots from "@/components/loading-dots";

export default function CustomerPortalRedirect() {
  useEffect(() => {
    const portal = async () => {
      await authClient.customer.portal();
    };
    portal();
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex items-center gap-2">
        <Loader2 className="size-5 animate-spin" />
        <LoadingDots
          text="Loading Customer Portal"
          className="text-muted-foreground"
        />
      </div>
    </div>
  );
}
