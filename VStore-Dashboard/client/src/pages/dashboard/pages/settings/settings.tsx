import { useNavigate, useParams } from 'react-router-dom';
import SettingsForm from './components/settings-form';
import { useAppSelector } from '@/redux/hook';
import { useGetStoreQuery } from '@/redux/services/storeService';
import { useEffect } from 'react';
import PageLoading from '@/components/ui/page-Loading';

export default function SettingsPage() {
  const params = useParams<{ storeId: string }>();
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const {
    data: currentStore,
    isLoading,
    error,
  } = useGetStoreQuery({
    storeId: params.storeId as string,
    userId: userInfo?._id as string,
  });

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        navigate(`/dashboard`);
      }
    }
  }, [isLoading, error]);

  if (!currentStore) {
    return <PageLoading />;
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={currentStore} />
      </div>
    </div>
  );
}
