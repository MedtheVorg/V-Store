import { HomeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import fourOFour from '@/public/images/404-error.png';
import Container from '@/components/ui/container';

export default function NotFoundPage() {
    return (
        <div className='flex items-center justify-center grow py-16'>
            <Container className='space-y-4 text-center'>
                <Image
                    src={fourOFour}
                    alt='404 not found'
                    className='object-cover aspect-video'
                />
                <p className='flex items-center justify-center text-xl font-semibold gap-x-2'>
                    You seem to be lost let me take you back
                    <Link
                        href={'/'}
                        className='inline-flex items-center justify-center underline gap-x-2 text-brightBlue'
                    >
                        <HomeIcon
                            className='underline '
                            size={20}
                        />{' '}
                        Home
                    </Link>
                </p>
            </Container>
        </div>
    );
}
