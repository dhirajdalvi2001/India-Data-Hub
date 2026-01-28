import { cn } from '@heroui/theme';
import { Navbar } from '@/components/navbar';

export default function DefaultLayout({
  children,
  className,
  childrenClassName,
}: {
  children: React.ReactNode;
  className?: string;
  childrenClassName?: string;
}) {
  return (
    <div
      className={cn('relative flex flex-col min-h-full min-w-full', className)}
    >
      <Navbar />
      <main
        className={cn(
          'w-full mx-auto px-3 sm:px-6 flex-grow min-h-screen pt-[86px]',
          childrenClassName,
        )}
      >
        {children}
      </main>
    </div>
  );
}
