'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { CircleX } from 'lucide-react';

type MainNavMobileProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function MainNavMobile({
    isOpen,
    setIsOpen,
}: MainNavMobileProps) {
    const pathName = usePathname();

    const routes = [
        {
            href: `/`,
            label: 'Home',
            active: pathName === `/`,
        },
        {
            href: `/categories`,
            label: 'Categories',
            active: pathName === `/categories`,
        },
        {
            href: `/about`,
            label: 'About',
            active: pathName === `/about`,
        },
    ];

    return (
        <div className='fixed  inset-0 z-30  h-full w-full bg-neutral-900/50  md:hidden'>
            <nav className=' flex flex-col gap-y-8 h-full w-[60%] p-6 text-lg    bg-white relative '>
                {routes.map((route) => (
                    <Link
                        href={route.href}
                        key={route.href}
                        className={cn(
                            ' font-medium transition-colors hover:text-black',
                            route.active ? 'text-black' : 'text-neutral-500'
                        )}
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className=' w-full text-left'
                        >
                            {route.label}
                        </button>
                    </Link>
                ))}
                <CircleX
                    className='absolute top-4 right-4'
                    size={30}
                    onClick={() => setIsOpen(false)}
                />
            </nav>
        </div>
    );
}
