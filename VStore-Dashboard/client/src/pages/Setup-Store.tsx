import StoreModal from './dashboard/components/modals/store-modal';
import { useStoreModal } from '@/hooks/use-store-modal';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/redux/hook';
import { useGetStoresQuery } from '@/redux/services/storeService';
import toast from 'react-hot-toast';
import { Store } from '@/types';

// this page serves as a mean to  display the store-modal to create a new store
// as well as check if the current user already has a store if yes redirect to it
export default function SetupStore() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const navigate = useNavigate();

  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const {
    data: stores,
    error,
    isLoading,
  } = useGetStoresQuery(userInfo?._id as string);

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        toast.error('something went wrong');
      } else if (stores && stores.length > 0) {
        navigate(`/dashboard/${stores[0]._id}`);
      } else {
        onOpen();
      }
    }
  }, [isLoading, error, stores]);
  return (
    <div className="flex flex-col h-full">
      <StoreModal stores={stores as Store[]} />
    </div>
  );
}
