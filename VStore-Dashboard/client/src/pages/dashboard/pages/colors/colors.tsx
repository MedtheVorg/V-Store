import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { ColorColumn } from './components/columns';
import ColorClient from './components/client';
import { useGetColorsQuery } from '@/redux/services/colorService';
import PageLoading from '@/components/ui/page-Loading';
import { useEffect } from 'react';

export default function ColorsPage() {
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: colors,
    isLoading,
    error,
  } = useGetColorsQuery({
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

  if (!colors) {
    return <PageLoading />;
  }
  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item._id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy hh:ss'),
  }));

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <ColorClient data={formattedColors} />
    </div>
  );
}
