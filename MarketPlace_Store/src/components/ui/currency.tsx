'use client';

import { formatter } from '@/lib/utils';
import { useEffect, useState } from 'react';

type CurrencyProps = {
    value?: string | number;
};

export default function Currency({ value }: CurrencyProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
    return <p className='font-semibold'>{formatter.format(Number(value))}</p>;
}
