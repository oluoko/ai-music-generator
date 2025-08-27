"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { env } from "@/env";

export default function Upgrade() {
  const upgrade = async () => {
    await authClient.checkout({
      products: [env.LARGE_PACK_ID, env.MEDIUM_PACK_ID, env.SMALL_PACK_ID],
    });
  };
  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-2 cursor-pointer text-orange-400"
      onClick={upgrade}
    >
      Upgrade
    </Button>
  );
}
