'use client';
import { ShoppingCartIcon } from 'lucide-react';
import Button from './ui/button';
import { useEffect, useState } from 'react';
import useCart from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ShoppingCartButton() {
    const [isMounted, setIsMounted] = useState(false);
    const cart = useCart();
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <div className='fixed z-50 flex items-center transition-all duration-200 gap-x-4 bottom-10 right-10 hover:scale-105'>
            <Link href={'/cart'}>
                <Button className='relative flex items-center rounded-full bg-brightBlue hover:opacity-95 size-14 p-4'>
                    <ShoppingCartIcon
                        size={40}
                        color='white'
                        fontWeight={800}
                    />
                    <span className='absolute flex items-center justify-center text-base font-bold text-white bg-red-500 rounded-full -top-2 -left-2 size-8'>
                        {cart.items.length}
                    </span>
                </Button>
            </Link>
        </div>
    );
}
