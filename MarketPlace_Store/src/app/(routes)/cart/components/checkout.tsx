'use client';

import z from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PaypalPayment from '@/components/paypal-payment';
import Button from '@/components/ui/button';
import { useState } from 'react';
import useCart from '@/hooks/use-cart';

const checkoutFormSchema = z.object({
    phone: z
        .string()
        .min(1, 'phone number is required')
        .regex(
            /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
            'invalid phone number'
        ),
    address: z.string().min(1, 'shipping address is required'),
});

export default function Checkout() {
    const [customerAddress, setCustomerAddress] = useState<string | null>(null);
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState<
        string | null
    >(null);

    const { items } = useCart();
    const isCartEmpty = items.length == 0;

    const {
        formState: { errors, isValid },
        handleSubmit,
        register,
    } = useForm<z.infer<typeof checkoutFormSchema>>({
        defaultValues: {
            address: '',
            phone: '',
        },
        resolver: zodResolver(checkoutFormSchema),
    });

    const onSubmit: SubmitHandler<z.infer<typeof checkoutFormSchema>> = (
        formValues
    ) => {
        setCustomerAddress(formValues.address);
        setCustomerPhoneNumber(formValues.phone);
    };

    return (
        <>
            <h2 className='text-xl font-semibold text-gray-900 mb-8'>
                Checkout
            </h2>
            {customerAddress && customerPhoneNumber ? (
                <PaypalPayment
                    address={customerAddress}
                    phone={customerPhoneNumber}
                    disabled={isCartEmpty}
                />
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col gap-y-4 p-4 mt-6  border rounded-lg '
                >
                    <p className='text-gray-400'>
                        please provide your shipping address and phone number
                    </p>
                    <label
                        htmlFor='address'
                        className='flex flex-col gap-y-2 my-4'
                    >
                        Address
                        <input
                            type='text'
                            {...register('address')}
                            className='border p-2 px-4'
                            placeholder='shipping address...'
                            id='address'
                            disabled={isCartEmpty}
                        />
                        {errors.address?.message && (
                            <span className='text-red-500'>
                                {errors.address?.message}
                            </span>
                        )}
                    </label>
                    <label
                        htmlFor='phone'
                        className='flex flex-col gap-y-2 my-4'
                    >
                        Phone number
                        <input
                            type='tel'
                            {...register('phone')}
                            className='border p-2 px-4'
                            placeholder='phone number...'
                            id='phone'
                            disabled={isCartEmpty}
                        />
                        {errors.phone?.message && (
                            <span className='text-red-500'>
                                {errors.phone?.message}
                            </span>
                        )}
                    </label>

                    <Button
                        className='bg-brightBlue disabled:bg-gray-700'
                        disabled={isCartEmpty}
                        type='submit'
                    >
                        Proceed
                    </Button>
                </form>
            )}
        </>
    );
}
