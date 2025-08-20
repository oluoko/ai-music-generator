"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Upgrade() {
  const upgrade = async () => {
    await authClient.checkout({
      products: [
        "c37323eb-9d27-4851-aefc-801936feec3e",
        "c6d7906e-95eb-44f1-a3bd-3eaa4df381d7",
        "101652b9-9daa-4288-ad2d-76f23125adc5",
      ],
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
