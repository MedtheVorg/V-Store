import Logo from '@/components/Logo';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

type Route = {
  href: string;
  label: string;
  icon: any;
};
type AsideProps = {
  routes: Route[];
};

export default function Aside({ routes }: AsideProps) {
  return (
    <aside className="  border-r   h-full ">
      <nav className="flex flex-col text-base font-medium h-full">
        <Link to={'/'} className="flex items-center justify-center mt-2">
          <Logo className="size-10 fill-primary" />
        </Link>
        <div className="py-8 gap-y-6 px-2 h-full  flex flex-col ">
          {routes.map((route, idx) => (
            <div
              className={cn(
                idx === routes.length - 1 && 'mt-auto',
                route.label.includes('Colors') && 'lg:ml-3',
                route.label.includes('Sizes') && 'lg:ml-3 ',
                route.label.includes('Categories') && 'lg:ml-3'
              )}
              key={route.href}
            >
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    to={route.href}
                    className={cn(
                      'flex items-center justify-start  xl:justify-normal gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {route.icon}
                    <span className="hidden lg:block">{route.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{route.label}</TooltipContent>
              </Tooltip>
            </div>
          ))}
        </div>
      </nav>

      {/* <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5 ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={`/dashboard/${params.storeId}/settings`}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav> */}
    </aside>
  );
}
