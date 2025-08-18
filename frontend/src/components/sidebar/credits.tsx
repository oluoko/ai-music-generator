import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";

export default async function Credits() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/sign-in");

  const user = await db.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: { credits: true },
  });

  return (
    <div className="flex items-center gap-1">
      <p className="font-semibold">{user.credits}</p>
      <p className="text-muted-foreground text-sm">Credits</p>
    </div>
  );
}
