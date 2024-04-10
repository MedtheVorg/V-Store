import { SignIn } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Marketplace | Sign Up',
};


export default function SignInPage() {
    return (
        <div className='grow flex items-center justify-center my-6'>
            <SignIn afterSignInUrl={'/cart'} />
        </div>
    );
}
