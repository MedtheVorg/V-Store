import Image from 'next/image';
import heroImage from '@/public/images/all_in_one_marketplace.png';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className=' bg-hero-gradient '>
            <div className='mx-auto max-w-screen-xl px-8 xl:px-0  py-16 lg:flex  lg:items-center lg:gap-x-32'>
                <div className=' text-center'>
                    <Image
                        src={heroImage}
                        alt='hero section image'
                    />
                </div>
                <div className=' text-center'>
                    <h1 className='text-3xl font-extrabold sm:text-5xl'>
                        Shop with Ease, And{' '}
                        <strong className='font-extrabold text-brightBlue '>
                            Save Money.
                        </strong>
                    </h1>

                    <div className='mt-16 flex flex-wrap justify-center gap-4'>
                        <a
                            className='group relative inline-flex items-center overflow-hidden rounded bg-brightBlue px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500'
                            href='#featured'
                        >
                            <span className='absolute -end-full transition-all group-hover:end-4'>
                                <svg
                                    className='size-5 rtl:rotate-180'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M17 8l4 4m0 0l-4 4m4-4H3'
                                    />
                                </svg>
                            </span>

                            <span className='text-sm font-medium transition-all group-hover:me-4'>
                                Start Shopping
                            </span>
                        </a>

                        <Link
                            className='group relative inline-block text-sm font-medium text-brightBlue focus:outline-none focus:ring active:text-red-500'
                            href='/categories'
                        >
                            <span className='absolute inset-0 border border-current'></span>
                            <span className='block border border-current bg-white px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1'>
                                Browse Categories
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
