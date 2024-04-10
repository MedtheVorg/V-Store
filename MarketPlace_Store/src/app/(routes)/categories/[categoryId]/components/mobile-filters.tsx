'use client';

import { useState } from 'react';

import { Color, Size } from '@/types';
import Button from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import IconButton from '@/components/ui/icon-button';
import Filter from './filter';

type MobileFiltersProps = {
    colors: Color[];
    sizes: Size[];
};

export default function MobileFilters({ colors, sizes }: MobileFiltersProps) {
    const [open, setOpen] = useState(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return (
        <>
            <Button
                onClick={onOpen}
                className='flex items-center gap-x-2 lg:hidden rounded-full '
            >
                Filters
                <Plus size={20} />
            </Button>

            <Dialog
                open={open}
                as='div'
                className='relative z-40 lg:hidden'
                onClose={onClose}
            >
                {/* Background */}
                <div className='fixed inset-0 bg-black bg-opacity-25 ' />

                {/* Dialog position */}
                <div className='fixed inset-0 z-40  flex'>
                    <Dialog.Panel className='relative ml-auto flex size-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl '>
                        {/* close button */}
                        <div className='flex items-center justify-end px-4'>
                            <IconButton
                                icon={<X size={15} />}
                                onClick={onClose}
                            />
                        </div>

                        {/* Render filters */}
                        <div className='p-4'>
                            <Filter
                                valueKey='sizeId'
                                name='Sizes'
                                data={sizes}
                            />
                            <Filter
                                valueKey='colorID'
                                name='Colors'
                                data={colors}
                            />
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}
