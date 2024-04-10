import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { PanelLeft } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type Route = {
  href: string;
  label: string;
  icon: any;
};
type MobileMenuProps = {
  routes: Route[];
};

export default function MobileMenu({ routes }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="md:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="flex flex-col gap-6 text-lg font-medium h-full">
          <Logo className="size-10 mb-6 fill-primary" />

          {routes.map((route, idx) => (
            <Link
              to={route.href}
              className={cn(
                'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground',
                idx === routes.length - 1 && 'mt-auto'
              )}
              onClick={() => setIsOpen(false)}
              key={route.href}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
