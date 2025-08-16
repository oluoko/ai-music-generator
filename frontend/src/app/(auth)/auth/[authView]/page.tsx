import { AuthView } from "@daveyplate/better-auth-ui";
import { authViewPaths } from "@daveyplate/better-auth-ui/server";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(authViewPaths).map((authView) => ({ authView }));
}

import { Meta } from "@/components/meta";
import { restructurePhrase } from "@/lib/utils";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ authView: string }>;
}) => {
  return Meta({
    title: restructurePhrase((await params).authView),
    description: "",
  });
};

export default async function AuthPage({
  params,
}: {
  params: Promise<{ authView: string }>;
}) {
  const { authView } = await params;

  return <AuthView pathname={authView} />;
}
