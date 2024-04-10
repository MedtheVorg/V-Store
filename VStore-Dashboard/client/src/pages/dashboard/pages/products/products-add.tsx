import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Category, Color, Product, Size } from '@/types';
import { useGetProductQuery } from '@/redux/services/productService';
import { ProductForm } from './components/product-form';
import PageLoading from '@/components/ui/page-Loading';
import { useGetCategoriesQuery } from '@/redux/services/categoryService';
import { useGetSizesQuery } from '@/redux/services/sizeService';
import { useGetColorsQuery } from '@/redux/services/colorService';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductsAddPage() {
  const params = useParams();
  const navigate = useNavigate();

  // fetch product
  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
  } = useGetProductQuery({
    productId: params.productId as string,
    storeId: params.storeId as string,
  });

  // fetch categories
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery({
      storeId: params.storeId as string,
    });

  // fetch sizes
  const { data: sizes, isLoading: isSizesLoading } = useGetSizesQuery({
    storeId: params.storeId as string,
  });

  // fetch colors
  const { data: colors, isLoading: isColorsLoading } = useGetColorsQuery({
    storeId: params.storeId as string,
  });

  useEffect(() => {
    if (
      !isProductLoading &&
      !isCategoriesLoading &&
      !isColorsLoading &&
      !isSizesLoading
    ) {
      //Product does not exist or something went wrong
      if (productError && params.productId !== 'new') {
        navigate(`/dashboard/${params.storeId}/products`);
      }
    }
  }, [
    isProductLoading,
    isCategoriesLoading,
    isColorsLoading,
    isSizesLoading,
    productError,
  ]);

  if (!product && params.productId !== 'new') {
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
      <ProductForm
        initialData={params.productId === 'new' ? null : (product as Product)}
        categories={categories as Category[]}
        sizes={sizes as Size[]}
        colors={colors as Color[]}
      />
    </div>
  );
}
