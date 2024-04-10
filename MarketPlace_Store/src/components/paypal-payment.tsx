'use client';
import { createOrder, approveOrder } from '@/actions/paypal-actions';
import useCart from '@/hooks/use-cart';
import { PayPalButtons, PayPalMarks } from '@paypal/react-paypal-js';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type PaypalPaymentProps = {
    address: string;
    phone: string;
    disabled: boolean;
};

export default function PaypalPayment({
    address,
    phone,
    disabled,
}: PaypalPaymentProps) {
    const router = useRouter();
    const { items, removeAll } = useCart();

    const customerDetails = {
        address,
        phone,
    };

    const cartDetails = items.map((item) => ({
        _id: item._id,
        price: item.price,
    }));

    return (
        <div>
            <PayPalButtons
                className='w-full'
                style={{
                    color: 'blue',
                    height: 50,
                }}
                disabled={disabled}
                createOrder={() => createOrder(cartDetails, customerDetails)}
                onApprove={(data) =>
                    approveOrder(data)
                        .then((details) => {
                            toast.success(
                                'Payment was Successful, Thanks for you purchase'
                            );
                        })
                        .then(() => {
                            removeAll();
                        })
                }
                onError={(err: any) => {
                    toast.error(
                        'Something went wrong while processing payment.'
                    );

                    toast.error(err.message);
                }}
            />
        </div>
    );
}
