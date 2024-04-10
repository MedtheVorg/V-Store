import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { SizeColumn } from './components/columns';
import { useGetSizesQuery } from '@/redux/services/sizeService';
import SizeClient from './components/client';
import PageLoading from '@/components/ui/page-Loading';
import { useEffect } from 'react';

export default function SizesPage() {
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: sizes,
    isLoading,
    error,
  } = useGetSizesQuery({
    storeId: params.storeId as string,
  });

  // safe guard  in case params are invalid
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        navigate('/dashboard');
      }
    }
  }, [isLoading, error]);

  if (!sizes) {
    return <PageLoading />;
  }
  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item._id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy hh:ss hh:ss'),
  }));

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <SizeClient data={formattedSizes} />
    </div>
  );
}
