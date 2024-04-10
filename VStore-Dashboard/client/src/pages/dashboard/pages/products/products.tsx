import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductColumn } from './components/columns';
import { useGetProductsQuery } from '@/redux/services/productService';
import PageLoading from '@/components/ui/page-Loading';
import { useEffect } from 'react';
import { Category, Color, Size } from '@/types';
import { formatter } from '@/lib/utils';
import { ProductClient } from './components/client';

export default function ProductsPage() {
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({
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

  if (!products) {
    return <PageLoading />;
  }
  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item._id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price),
    category: (item.category as Category)?.name,
    size: (item.size as Size)?.name,
    color: (item.color as Color)?.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy hh:ss'),
  }));

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <ProductClient data={formattedProducts} />
    </div>
  );
}
