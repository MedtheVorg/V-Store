import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Size } from '@/types';
import { useGetSizeQuery } from '@/redux/services/sizeService';
import { SizeForm } from './components/size-form';
import PageLoading from '@/components/ui/page-Loading';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function SizesAddPage() {
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: size,
    isLoading,
    error,
  } = useGetSizeQuery({
    sizeId: params.sizeId as string,
    storeId: params.storeId as string,
  });

  useEffect(() => {
    if (!isLoading) {
      //size does not exist
      if (error && params.sizeId !== 'new') {
        navigate(`/dashboard/${params.storeId}/sizes`);
      }
    }
  }, [isLoading, error]);

  if (!size && params.sizeId !== 'new') {
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
      <SizeForm initialData={params.sizeId === 'new' ? null : (size as Size)} />
    </div>
  );
}
