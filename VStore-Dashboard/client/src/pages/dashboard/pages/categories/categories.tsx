import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryColumn } from './components/columns';
import { Billboard, Category } from '@/types';
import { useGetCategoriesQuery } from '@/redux/services/categoryService';
import CategoryClient from './components/client';
import PageLoading from '@/components/ui/page-Loading';
import { useEffect } from 'react';

export default function CategoriesPage() {
  const params = useParams();
  const navigate = useNavigate();
  const {
    data: categories,
    isLoading,
    error,
  } = useGetCategoriesQuery({
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

  if (!categories) {
    return <PageLoading />;
  }

  const formattedCategories: CategoryColumn[] = categories.map(
    (item: Category) => ({
      id: item._id,
      name: item.name,
      billboardLabel: (item.billboardId as Billboard).label,
      storeId: item.storeId,
      createdAt: format(item.createdAt, 'MMMM do, yyyy hh:ss'),
    })
  );
  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
}
