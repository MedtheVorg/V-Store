import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import PageLoading from '@/components/ui/page-Loading';
import { Separator } from '@/components/ui/separator';
import { formatter } from '@/lib/utils';
import { useGetOrdersQuery } from '@/redux/services/orderService';
import { useGetProductsQuery } from '@/redux/services/productService';
import { CreditCard, DollarSign, Package } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { OverviewChart } from './components/overview-chart';
import { getGraphRevenue } from './utils/get-graph-revenue';
import { useEffect } from 'react';

export default function OverviewPage() {
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: products,
    isLoading: productsLoading,
    error: fetchProductsError,
  } = useGetProductsQuery({
    storeId: params.storeId as string,
  });

  const {
    data: orders,
    isLoading: ordersLoading,
    error: fetchOrdersError,
  } = useGetOrdersQuery({
    storeId: params.storeId as string,
  });

  useEffect(() => {
    if (!ordersLoading && !productsLoading) {
      if (fetchOrdersError || fetchProductsError) {
        navigate('/dashboard');
      }
    }
  }, [productsLoading, ordersLoading]);

  if (!orders || !products) {
    return <PageLoading />;
  }

  const totalRevenue = orders.reduce((total, order) => {
    if (order.isPaid) {
      const orderTotal = order.orderItems.reduce(
        (orderSum, product) => orderSum + product.price,
        0
      );
      return total + orderTotal;
    } else {
      return total;
    }
  }, 0);

  const salesCount = orders.reduce((total, order) => {
    if (order.isPaid) {
      return total + 1;
    } else {
      return total;
    }
  }, 0);
  const stockCount = products.reduce((total, product) => {
    if (!product.isArchived) {
      return total + 1;
    } else {
      return total;
    }
  }, 0);

  const paidOrders = orders.filter((order) => order.isPaid);

  const graphRevenue = getGraphRevenue(paidOrders);

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total revenue
              </CardTitle>
              <DollarSign className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>

          <Card className="sm:col-span-2 md:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Products in Stock
              </CardTitle>
              <Package className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
