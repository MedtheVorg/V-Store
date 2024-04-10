'use client';

import { useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';
import Summary from './components/Summary';
import ItemsContainer from './components/items-container';
import Checkout from './components/checkout';

export default function CartPage() {
    const [isMounted, setIsMounted] = useState(false);
    const cart = useCart();

    const items = useCart((state) => state.items);
    const totalPrice = items.reduce(
        (total, item) => total + parseInt(item.price),
        0
    );

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className='bg-white grow'>
            <Container>
                <div className='px-4 py-16 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl font-bold text-black'>
                        Shopping Cart
                    </h1>
                    <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12 '>
                        <div className='lg:col-span-7 '>
                            <ItemsContainer cartItems={cart.items} />
                            <Summary
                                totalPrice={totalPrice}
                                cartItems={cart.items}
                            />
                        </div>
                        <div className='lg:col-span-5'>
                            <Checkout />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
