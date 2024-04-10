import { Navigate, useRoutes } from 'react-router-dom';
import HomePage from './pages/home/Home';
import SignInPage from './pages/Sign-in';
import SignUpPage from './pages/Sign-up';
import NotFoundPage from './pages/NotFound';
import AppLayout from './layout/Layout';
import ProtectedRoute from './components/protectedRoute';
import SetupStore from './pages/Setup-Store';
import DashboardPage from './pages/dashboard/Dashboard';
import { ThemeProvider } from './components/theme-provider';
import OverviewPage from './pages/dashboard/pages/overview/overview';
import CategoriesPage from './pages/dashboard/pages/categories/categories';
import SettingsPage from './pages/dashboard/pages/settings/settings';
import StoreModal from './pages/dashboard/components/modals/store-modal';
import BillboardsPage from './pages/dashboard/pages/billboards/billboards';
import BillboardsAddPage from './pages/dashboard/pages/billboards/billboards-add';
import CategoriesAddPage from './pages/dashboard/pages/categories/categories-add';
import SizesAddPage from './pages/dashboard/pages/sizes/sizes-add';
import SizesPage from './pages/dashboard/pages/sizes/sizes';
import ColorsAddPage from './pages/dashboard/pages/colors/colors-add';
import ColorsPage from './pages/dashboard/pages/colors/colors';
import ProductsAddPage from './pages/dashboard/pages/products/products-add';
import ProductsPage from './pages/dashboard/pages/products/products';
import OrdersPage from './pages/dashboard/pages/orders/orders';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProfilePage from './pages/dashboard/pages/profile/profile';
import { TooltipProvider } from './components/ui/tooltip';
import { useAppSelector } from './redux/hook';

function App() {
  useEffect(() => {
    AOS.init({
      once: false,
      disable: 'phone',
      duration: 1000,
      easing: 'ease-out-cubic',
    });
  });

  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const routes = useRoutes([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: '/signin',
          element: userInfo ? <Navigate to={'/dashboard'} /> : <SignInPage />,
        },
        {
          path: '/signup',
          element: userInfo ? <Navigate to={'/dashboard'} /> : <SignUpPage />,
        },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute children={<SetupStore />} redirectTo="/signin" />
      ),
    },

    {
      path: '/dashboard/:storeId',
      element: (
        <ThemeProvider storageKey="vite-ui-theme">
          <TooltipProvider delayDuration={300}>
            <ProtectedRoute children={<DashboardPage />} redirectTo="/signin" />
          </TooltipProvider>
        </ThemeProvider>
      ),
      children: [
        {
          index: true,
          element: <OverviewPage />,
        },
        {
          path: 'billboards',
          element: <BillboardsPage />,
        },
        {
          path: 'billboards/:billboardId',
          element: <BillboardsAddPage />,
        },
        {
          path: 'categories',
          element: <CategoriesPage />,
        },
        {
          path: 'categories/:categoryId',
          element: <CategoriesAddPage />,
        },
        {
          path: 'sizes',
          element: <SizesPage />,
        },
        {
          path: 'sizes/:sizeId',
          element: <SizesAddPage />,
        },
        {
          path: 'colors',
          element: <ColorsPage />,
        },
        {
          path: 'colors/:colorId',
          element: <ColorsAddPage />,
        },
        {
          path: 'products',
          element: <ProductsPage />,
        },
        {
          path: 'products/:productId',
          element: <ProductsAddPage />,
        },
        {
          path: 'orders',
          element: <OrdersPage />,
        },
        {
          path: 'settings',
          element: <SettingsPage />,
        },
        {
          path: 'profile',
          element: <ProfilePage />,
        },
      ],
    },
  ]);
  return (
    <>
      <StoreModal />
      {routes}
    </>
  );
}

export default App;
