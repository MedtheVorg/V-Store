import { format } from 'date-fns';

import { OrderClient } from './components/client';
import { OrderColumn } from './components/columns';
import { formatter } from '@/lib/utils';
import { useGetOrdersQuery } from '@/redux/services/orderService';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import PageLoading from '@/components/ui/page-Loading';

export default function OrdersPage() {
  const params = useParams();
  const navigate = useNavigate();
  const {
    data: orders,
    isLoading,
    error,
  } = useGetOrdersQuery({
    storeId: params.storeId as string,
  });

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        navigate('/dashboard');
      }
    }
  }, [isLoading, error]);

  if (!orders) {
    return <PageLoading />;
  }

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item._id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map((orderItem) => orderItem.name).join(', '),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + item.price;
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, 'MMMM do, yyyy hh:ss'),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
}
