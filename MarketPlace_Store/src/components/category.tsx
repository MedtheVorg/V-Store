import Image from 'next/image';
import testingImage from '@/public/images/testingImage.jpg';
import Link from 'next/link';

type CategoryProps = {
    id: string;
    name: string;
    imageUrl: string;
};

export default function Category({ id, name, imageUrl }: CategoryProps) {
    return (
        <Link
            href={`/categories/${id}`}
            className='no-underline'
        >
            <article className='relative h-56 overflow-hidden text-white transition border-2 rounded-lg cursor-pointer  hover:shadow-xl group'>
                <Image
                    alt='image'
                    src={imageUrl}
                    width={'1920'}
                    height={'1080'}
                    className='absolute inset-0 object-cover m-0 transition-all duration-500  size-full group-hover:scale-105'
                />

                <div className='relative flex items-center justify-center transition-all duration-500 size-full bg-gradient-to-t from-white/25 to-white/5 group-hover:bg-opacity-80 '>
                    <h1 className='text-white capitalize transition-all duration-500 group-hover:text-5xl '>
                        {name}
                    </h1>
                </div>
            </article>
        </Link>
    );
}
