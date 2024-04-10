import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { BillboardColumn } from './components/columns';
import BillboardClient from './components/client';
import { useGetBillboardsQuery } from '@/redux/services/billboardService';
import { Billboard } from '@/types';
import PageLoading from '@/components/ui/page-Loading';
import { useEffect } from 'react';

export default function BillboardsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const {
    data: billboards,
    isLoading,
    error,
  } = useGetBillboardsQuery({
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

  if (!billboards) {
    return <PageLoading />;
  }

  const formattedBillboards: BillboardColumn[] = billboards.map(
    (item: Billboard) => ({
      id: item._id,
      label: item.label,
      imageUrl: item.imageUrl,
      storeId: item.storeId,
      createdAt: format(item.createdAt, 'MMMM do, yyyy hh:ss'),
    })
  );
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-2 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
}
