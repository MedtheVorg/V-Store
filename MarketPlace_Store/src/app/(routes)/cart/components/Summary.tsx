'use client';

import PaypalPayment from '@/components/paypal-payment';
import Button from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';
import { Product } from '@/types';
import { Loader, LoaderCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

type SummaryProps = {
    totalPrice: number;
    cartItems: Product[];
};

export default function Summary({ totalPrice, cartItems }: SummaryProps) {
    const searchParams = useSearchParams();
    const [succeeded, setSucceeded] = useState(false);
    const [paypalErrorMessage, setPaypalErrorMessage] = useState('');
    const [orderID, setOrderID] = useState(false);
    const [billingDetails, setBillingDetails] = useState('');

    return (
        <div className='mt-16  rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
            <h2 className='text-lg font-medium text-gray-900'>Order Summary</h2>
            {cartItems && (
                <ul className='space-y-6 mt-4'>
                    {cartItems.map((item) => (
                        <li
                            key={item._id}
                            className='flex items-center justify-between '
                        >
                            <div>{item.name}</div>
                            <Currency value={item.price} />
                        </li>
                    ))}
                </ul>
            )}
            <div className='mt-6 space-y-4'>
                <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                    <div className='text-base font-medium text-gray-900'>
                        Order total
                    </div>
                    <Currency value={totalPrice} />
                </div>
            </div>
        </div>
    );
}
