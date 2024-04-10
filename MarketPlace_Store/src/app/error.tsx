'use client'; // Error components must be Client Components

import Button from '@/components/ui/button';
import { Frown, Sandwich } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className='grow flex items-center justify-center flex-col bg-zinc-100 min-h-96'>
            <h2 className='text-6xl font-semibold text-brightBlue'>
                Something went wrong!{' '}
                <Frown
                    size={50}
                    className='inline ml-4'
                />
            </h2>
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className='py-4 px-8 text-white bg-brightBlue  mt-8 rounded-lg'
            >
                Try Again
            </Button>
        </div>
    );
}
