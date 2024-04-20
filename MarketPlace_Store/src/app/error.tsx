'use client'; // Error components must be Client Components

import Button from '@/components/ui/button';
import { Frown } from 'lucide-react';
import Link from 'next/link';
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
        <div className='grow flex items-center justify-center flex-col bg-zinc-100 min-h-screen p-4 '>
            <div className='max-w-screen-xl mx-auto text-center space-y-8'>
                <h2 className='text-5xl font-semibold text-brightBlue'>
                    Something went wrong!{' '}
                    <Frown
                        size={50}
                        className='inline ml-4'
                    />
                </h2>
                <p className='text-xl leading-relaxed'>
                    Please take not that the server which the backend is hosted
                    on (
                    <Link
                        href={'https://render.com'}
                        className='underline underline-offset-4 font-bold'
                        target='_blank'
                    >
                        Render
                    </Link>
                    ) is quite slow because a free tier was used ,
                    <Link
                        href={
                            'https://v-store-ely5.onrender.com/api/v1/healthcheck'
                        }
                        className='underline underline-offset-4 font-bold'
                        target='_blank'
                    >
                        visit the server url
                    </Link>{' '}
                    and check that server is actually running then come back and
                    try again. sorry for the inconvenience{' '}
                </p>
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
        </div>
    );
}
