'use client';

import Image from 'next/image';
import { Tab } from '@headlessui/react';

import { Image as ImageType } from '@/types';
import GalleryTab from './gallery-tab';

type GalleryProps = {
    images: ImageType[];
};

export default function Gallery({ images }: GalleryProps) {
    return (
        <Tab.Group
            as={'div'}
            className='flex flex-col'
        >
            <Tab.Panels className={'aspect-square w-full'}>
                {images.map((image) => (
                    <Tab.Panel
                        key={image._id}
                        className={'size-full '}
                    >
                        <div className='relative aspect-square size-full sm:rounded-lg overflow-hidden'>
                            <Image
                                fill
                                src={image.url}
                                alt='image'
                                className='object-cover size-full object-center'
                            />
                        </div>
                    </Tab.Panel>
                ))}
            </Tab.Panels>
            <div className='mx-auto mt-6  w-full max-w-2xl sm:block lg:max-w-none'>
                <Tab.List className='grid grid-cols-4 gap-6'>
                    {images.map((image) => (
                        <GalleryTab
                            key={image._id}
                            image={image}
                        />
                    ))}
                </Tab.List>
            </div>
        </Tab.Group>
    );
}
