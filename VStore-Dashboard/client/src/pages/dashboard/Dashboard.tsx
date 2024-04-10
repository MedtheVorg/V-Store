import {
  AreaChart,
  LayoutGrid,
  Package,
  PaintBucket,
  PanelBottom,
  Ruler,
  Settings,
  ShoppingCart,
} from 'lucide-react';

import { Outlet, useParams } from 'react-router-dom';
import Aside from './components/aside';
import Navbar from './components/navbar';
import MobileMenu from './components/mobileMenu';

export default function Dashboard() {
  const params = useParams();

  const routes = [
    {
      href: `/dashboard/${params.storeId}`,
      label: 'Overview',
      icon: <AreaChart className="h-5 w-5" />,
    },
    {
      href: `/dashboard/${params.storeId}/orders`,
      label: 'Orders',
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      href: `/dashboard/${params.storeId}/billboards`,
      label: 'Billboards',
      icon: <PanelBottom className="h-5 w-5" />,
    },

    {
      href: `/dashboard/${params.storeId}/products`,
      label: 'Products',
      icon: <Package className="h-5 w-5" />,
    },
    {
      href: `/dashboard/${params.storeId}/categories`,
      label: 'Categories',
      icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
      href: `/dashboard/${params.storeId}/sizes`,
      label: 'Sizes',
      icon: <Ruler className="h-5 w-5" />,
    },
    {
      href: `/dashboard/${params.storeId}/colors`,
      label: 'Colors',
      icon: <PaintBucket className="h-5 w-5" />,
    },
    {
      href: `/dashboard/${params.storeId}/settings`,
      label: 'Settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];
  return (
    <div className="   w-full  ">
      <div className="hidden   sm:block fixed inset-0 left-0 w-0 sm:w-14 lg:w-40   text-white">
        <Aside routes={routes} />
      </div>
      <div className=" flex flex-col  pl-0 sm:pl-14 lg:pl-40">
        <header className="flex h-16 py-2 items-center gap-4 border-b bg-background px-2 sm:h-auto sm:px-6 ">
          <MobileMenu routes={routes} />
          <Navbar />
        </header>

        <main className=" p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
