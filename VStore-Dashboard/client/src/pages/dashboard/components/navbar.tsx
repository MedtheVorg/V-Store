import UserButton from './user-button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import StoreSwitcher from './store-switcher';
import { useAppSelector } from '@/redux/hook';
import { useGetStoresQuery } from '@/redux/services/storeService';

export default function Navbar() {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const { data: stores, isLoading } = useGetStoresQuery(
    userInfo?._id as string
  );

  if (!stores) {
    return null;
  }
  return (
    <div className="flex items-center w-full">
      <StoreSwitcher items={stores} loading={isLoading} />
      <div className="ml-auto flex items-center space-x-4">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
}
