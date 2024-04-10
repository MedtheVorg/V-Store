import Container from '@/components/ui/container';
import getProduct from '../../../../actions/get-product';
import getProducts from '../../../../actions/get-products';
import ProductList from '@/components/product-list';
import Gallery from '@/components/gallery';
import Info from '@/components/info';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Marketplace | product',
};

type ProductPageProps = {
    params: {
        productId: string;
    };
};

export default async function ProductPage({ params }: ProductPageProps) {
    const product = await getProduct(params.productId);

    if (!product?._id) {
        redirect('/');
    }

    const suggestedProducts = await getProducts({
        categoryId: product.category._id,
    });

    return (
        <div className='bg-gray-50 '>
            <Container>
                <div className='px-4 py-10  sm:px-6 lg:px-8'>
                    <div className='md:grid md:grid-cols-2 md:items-start md:gap-x-8'>
                        {/* Gallery */}
                        <Gallery images={product.images} />
                        <div className='mt-10 px-4 sm:mt-16 sm:px-8  '>
                            {/* info */}
                            <Info data={product} />
                        </div>
                    </div>
                    <hr className='my-10' />
                    <ProductList
                        title='Related Items'
                        items={suggestedProducts}
                    />
                </div>
            </Container>
        </div>
    );
}
