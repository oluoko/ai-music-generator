import { Meta } from "@/components/meta";
import CreateSong from "@/components/create";

export const generateMetadata = () => {
  return Meta({
    title: "Create",
    description: "Generate a new song on an AI Music Generator site",
  });
};

export default function CreatePage() {
  return <div>Create</div>;
}
