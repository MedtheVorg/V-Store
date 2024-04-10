import { Product } from '@/types';
import CartItem from './cart-item';
import emptyCart from '@/public/images/empty-cart.png';
import Image from 'next/image';

type ItemsContainerProps = {
    cartItems: Product[];
};

export default function ItemsContainer({ cartItems }: ItemsContainerProps) {
    return (
        <div className='max-h-96 overflow-y-auto'>
            {cartItems.length === 0 && (
                <div className='flex items-center justify-center gap-x-4 p-6 border'>
                    <Image
                        src={emptyCart}
                        alt='empty cart'
                        height={60}
                        width={60}
                    />
                    <p className='text-neutral-500 '>No items added to cart.</p>
                </div>
            )}
            <ul className=' grid sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-2 p-2'>
                {cartItems.map((item) => (
                    <CartItem
                        key={item._id}
                        data={item}
                    />
                ))}
            </ul>
        </div>
    );
}
