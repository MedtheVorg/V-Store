import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Color } from '@/types';
import { useGetColorQuery } from '@/redux/services/colorService';
import { ColorForm } from './components/color-form';
import PageLoading from '@/components/ui/page-Loading';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function ColorsAddPage() {
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: color,
    isLoading,
    error,
  } = useGetColorQuery({
    colorId: params.colorId as string,
    storeId: params.storeId as string,
  });

  useEffect(() => {
    if (!isLoading) {
      //Color does not exist
      if (error && params.colorId !== 'new') {
        navigate(`/dashboard/${params.storeId}/colors`);
      }
    }
  }, [isLoading, error]);

  if (!color && params.colorId !== 'new') {
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
      <ColorForm
        initialData={params.colorId === 'new' ? null : (color as Color)}
      />
    </div>
  );
}
