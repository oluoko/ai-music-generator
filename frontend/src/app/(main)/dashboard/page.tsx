import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Meta } from "@/components/meta";
import CreateSong from "@/components/create";

export const generateMetadata = () => {
  return Meta({
    title: "Dashboard",
    description: "",
  });
};

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/sign-in");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      Dashboard
      <CreateSong />
    </div>
  );
}
