import { useNavigate, useParams } from 'react-router-dom';
import BillboardForm from './components/billboard-form';
import { useGetBillboardQuery } from '@/redux/services/billboardService';
import { useEffect } from 'react';
import { Billboard } from '@/types';
import PageLoading from '@/components/ui/page-Loading';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function BillboardsAddPage() {
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: billboard,
    isLoading,
    error,
  } = useGetBillboardQuery({
    billboardId: params.billboardId as string,
    storeId: params.storeId as string,
  });

  useEffect(() => {
    if (!isLoading) {
      if (error && params.billboardId !== 'new') {
        navigate(`/dashboard/${params.storeId}/billboards`);
      }
    }
  }, [isLoading, error]);

  if (!billboard && params.billboardId !== 'new') {
    return <PageLoading />;
  }
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7 mb-4"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Back</span>
      </Button>
      <BillboardForm
        initialData={
          params.billboardId === 'new' ? null : (billboard as Billboard)
        }
      />
    </div>
  );
}
