'use client';

import Container from '@/components/ui/container';
import Link from 'next/link';
import MainNav from './main-nav';
import Image from 'next/image';

import marketPlace_logo from '@/public/images/marketplace_logo.png';
import marketPlace_logoV2 from '@/public/images/marketplace_logoV2.png';
import { UserButton, useAuth } from '@clerk/nextjs';
import Button from './ui/button';
import { useState } from 'react';
import MainNavMobile from './main-nav-mobile';

export default function Navbar() {
    const { userId } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header>
            <div className='border-b '>
                <Container>
                    <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between'>
                        <Link
                            href={'/'}
                            className='-ml-6 '
                        >
                            <Image
                                src={marketPlace_logo}
                                alt='market place logo'
                                className='w-36 h-10 object-cover hidden md:block'
                            />
                            <Image
                                src={marketPlace_logoV2}
                                alt='market place logo'
                                className='w-36 h-20 mt-2  object-cover md:hidden'
                            />
                        </Link>
                        <MainNav />
                        {isOpen && (
                            <MainNavMobile
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                            />
                        )}

                        <div className='flex gap-x-4'>
                            <div className='block md:hidden'>
                                <Button
                                    className='rounded bg-gray-100  p-2 text-brightBlue transition hover:text-brightBlue/75'
                                    onClick={() => setIsOpen(true)}
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-5 w-5'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M4 6h16M4 12h16M4 18h16'
                                        />
                                    </svg>
                                </Button>
                            </div>
                            {userId ? (
                                <UserButton afterSignOutUrl='/' />
                            ) : (
                                <div className='flex items-center gap-4'>
                                    <div className='sm:flex sm:gap-4'>
                                        <Link
                                            className='rounded-md bg-brightBlue px-5 py-2.5 text-sm font-medium text-white shadow'
                                            href='/sign-in'
                                        >
                                            Login
                                        </Link>

                                        <div className='hidden sm:flex'>
                                            <Link
                                                className='rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-brightBlue'
                                                href='/sign-up'
                                            >
                                                Register
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </header>
    );
}
