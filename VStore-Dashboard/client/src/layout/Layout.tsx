import { Outlet, useLocation } from 'react-router-dom';
import LayoutNav from './components/layout-nav';
import Footer from '@/pages/home/components/footer';

export default function AppLayout() {
  const location = useLocation();
  return (
    <>
      <div className="h-full flex flex-col">
        <header>
          <LayoutNav />
        </header>

        <div className="grow  ">
          <Outlet />
        </div>

        {!location.pathname.includes('/signin') &&
          !location.pathname.includes('/signup') && <Footer />}
      </div>
    </>
  );
}
