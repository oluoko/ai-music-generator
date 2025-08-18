import { Meta } from "@/components/meta";
import CreateSong from "@/components/create";

export const generateMetadata = () => {
  return Meta({
    title: "Dashboard",
    description: "",
  });
};

export default async function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      Dashboard
      <CreateSong />
    </div>
  );
}
