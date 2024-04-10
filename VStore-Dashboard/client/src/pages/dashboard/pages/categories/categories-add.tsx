import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Billboard, Category } from '@/types';
import { useGetCategoryQuery } from '@/redux/services/categoryService';
import { CategoryForm } from './components/category-form';
import { useGetBillboardsQuery } from '@/redux/services/billboardService';
import PageLoading from '@/components/ui/page-Loading';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function CategoriesAddPage() {
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: category,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useGetCategoryQuery({
    categoryId: params.categoryId as string,
    storeId: params.storeId as string,
  });
  const { data: billboards, isLoading: isBillboardLoading } =
    useGetBillboardsQuery({
      storeId: params.storeId as string,
    });

  useEffect(() => {
    if (!isCategoryLoading && !isBillboardLoading) {
      //category does not exist
      if (categoryError && params.categoryId !== 'new') {
        navigate(`/dashboard/${params.storeId}/categories`);
      }
    }
  }, [isCategoryLoading, isBillboardLoading, categoryError]);

  if (
    (!category && params.categoryId !== 'new') ||
    (!billboards && params.categoryId !== 'new')
  ) {
    return <PageLoading />;
  }
  return (
    <div className="flex-1 p-8 pt-6 space-y-4">
      <Button
        variant="outline"
        size="icon"
        className="mb-4 h-7 w-7"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="sr-only">Back</span>
      </Button>
      <CategoryForm
        initialData={
          params.categoryId === 'new' ? null : (category as Category)
        }
        billboards={billboards as Billboard[]}
      />
    </div>
  );
}
