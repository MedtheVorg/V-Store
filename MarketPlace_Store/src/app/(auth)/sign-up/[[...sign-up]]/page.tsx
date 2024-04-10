import { SignUp } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Marketplace | Sign in',
};
export default function SignUpPage() {
    return (
        <div className='grow flex items-center justify-center my-6'>
            <SignUp afterSignUpUrl={'/cart'} />;
        </div>
    );
}
