'use client';

import {
    PayPalScriptProvider,
    ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js';
import { useEffect, useState } from 'react';

export default function PaypalProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    // paypal js SDK options
    const initialOptions: ReactPayPalScriptOptions = {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT as string,
        currency: 'USD',
        intent: 'capture',
    };
    return (
        <PayPalScriptProvider options={initialOptions}>
            {children}
        </PayPalScriptProvider>
    );
}
