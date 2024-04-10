import getCategories from '@/actions/get-categories';
import Category from '@/components/category';
import Container from '@/components/ui/container';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Marketplace | Categories',
};

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <section className='grow  '>
            <Container className='prose mt-8 p-6'>
                <h1 className='text-center mt-16 mb-8'>
                    <span className='text-brightBlue'>MarketPlace </span> has a
                    wide variety of categories to choose from.
                </h1>
                <div className='grid gap-y-4 md:grid-cols-2 md:gap-6'>
                    {categories.map((category) => (
                        <Category
                            key={category._id}
                            id={category._id}
                            name={category.name}
                            imageUrl={category.billboardId?.imageUrl}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}
