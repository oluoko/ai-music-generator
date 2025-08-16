import Logo from "@/components/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function HomePage() {
  return (
    <nav className="flex items-center justify-between p-4">
      <Logo />
      <ThemeToggle />
    </nav>
  );
}
