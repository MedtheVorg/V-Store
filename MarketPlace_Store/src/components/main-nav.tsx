'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MainNav() {
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
        <nav className='hidden mx-6 space-x-4 lg:space-x-6 md:flex'>
            {routes.map((route) => (
                <Link
                    href={route.href}
                    key={route.href}
                    className={cn(
                        'text-sm font-medium transition-colors hover:text-black',
                        route.active ? 'text-black' : 'text-neutral-500'
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
}
