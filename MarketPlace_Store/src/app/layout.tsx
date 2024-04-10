import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import ModalProvider from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import PaypalProvider from '@/providers/paypal-provider';
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import ShoppingCartButton from '@/components/shopping-cart-button';

const urbanist = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Marketplace',
    description:
        'MarketPlace is an e-commerce platform with an unlimited variety of goods to browse and purchase  ',
    icons: { icon: '/favicon.ico', href: '/favicon.ico' },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang='en'>
                <body
                    className={cn('flex flex-col w-full', urbanist.className)}
                >
                    <PaypalProvider>
                        <ModalProvider />
                        <ToastProvider />
                        <Navbar />
                        {children}
                        <Footer />
                        <ShoppingCartButton />
                    </PaypalProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
