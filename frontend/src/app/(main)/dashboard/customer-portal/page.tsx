import CustomerPortalRedirect from "@/components/customer-portal-redirect";
import { Meta } from "@/components/meta";

export const generateMetadata = () => {
  return Meta({
    title: "Customer Portal",
    description: "Manage your account and settings for AI Music Generator",
  });
};

export default function CustomerPortal() {
  return <CustomerPortalRedirect />;
}
