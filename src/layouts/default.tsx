import { Link } from "@heroui/link";

import { Navbar } from "@/components/navbar";
import { cn } from "@heroui/theme";

export default function DefaultLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col min-h-screen min-w-screen",
        className,
      )}
    >
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
    </div>
  );
}
