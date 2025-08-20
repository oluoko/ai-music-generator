import { AccountView } from "@daveyplate/better-auth-ui";
import { accountViewPaths } from "@daveyplate/better-auth-ui/server";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(accountViewPaths).map((path) => ({ path }));
}

import { Meta } from "@/components/meta";
import { restructurePhrase } from "@/lib/utils";
import BackButton from "@/components/back-button";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ path: string }>;
}) => {
  return Meta({
    title: restructurePhrase((await params).path),
    description: "",
  });
};

export default async function AccountPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  return (
    <main className="container p-4 md:p-6">
      {["settings", "security"].includes(path) && <BackButton />}
      <AccountView pathname={path} />
    </main>
  );
}
