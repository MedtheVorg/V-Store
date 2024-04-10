import Container from '@/components/ui/container';
import getProducts from '../../actions/get-products';
import HeroSection from '@/components/hero';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Marketplace | Home',
};

export default async function HomePage() {
    const products = await getProducts({ isFeatured: true });

    return (
        <>
            <HeroSection />

            <Container className='mt-16'>
                <section id='featured'>
                    <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
                        <header className='text-left'>
                            <h2 className='text-xl font-bold text-gray-900 sm:text-3xl'>
                                Featured Products
                            </h2>
                        </header>

                        <ul className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                            {products.slice(0, 6).map((product) => (
                                <li key={product._id}>
                                    <a
                                        href={`/product/${product._id}`}
                                        className='group relative block overflow-hidden'
                                    >
                                        <Image
                                            src={product.images[0].url}
                                            alt=''
                                            width={'1000'}
                                            height={'1000'}
                                            className='aspect-square w-full object-cover transition duration-500 group-hover:opacity-90 group-hover:scale-105'
                                            quality={100}
                                        />

                                        <div className='absolute inset-0 flex flex-col items-start justify-end p-6 bg-neutral-950/40'>
                                            <h3 className='text-xl font-medium text-white'>
                                                {product.name}
                                            </h3>

                                            <span className='mt-1.5 inline-block bg-neutral-900 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'>
                                                Shop Now
                                            </span>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </Container>

            <Container className='mt-16'>
                <section className='bg-white'>
                    <div className='mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8'>
                        <div className='mx-auto max-w-3xl text-center'>
                            <h2 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
                                Trusted by eCommerce Businesses
                            </h2>

                            <p className='mt-4 text-gray-500 sm:text-xl'>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Ratione dolores laborum labore
                                provident impedit esse recusandae facere libero
                                harum sequi.
                            </p>
                        </div>

                        <div className='mt-8 sm:mt-12'>
                            <dl className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                                <div className='flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center'>
                                    <dt className='order-last text-lg font-medium text-gray-500'>
                                        Total Sales
                                    </dt>

                                    <dd className='text-4xl font-extrabold text-blue-600 md:text-5xl'>
                                        $4.8m
                                    </dd>
                                </div>

                                <div className='flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center'>
                                    <dt className='order-last text-lg font-medium text-gray-500'>
                                        Official Addons
                                    </dt>

                                    <dd className='text-4xl font-extrabold text-blue-600 md:text-5xl'>
                                        24
                                    </dd>
                                </div>

                                <div className='flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center'>
                                    <dt className='order-last text-lg font-medium text-gray-500'>
                                        Total Addons
                                    </dt>

                                    <dd className='text-4xl font-extrabold text-blue-600 md:text-5xl'>
                                        86
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </section>
            </Container>
        </>
    );
}
