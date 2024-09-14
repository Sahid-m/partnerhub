'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { Code, Github } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import ThemeToggle from './theme-toggle';
import { Button } from './ui/button';
import ShimmerButton from './ui/shimmerButton';

export default function NavbarLanding() {

    const { isLoading, user, error } = useUser();
    const router = useRouter();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <>
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link className="flex items-center justify-center" href="#">
                    <Code className="h-6 w-6 mr-2" />
                    <span className="font-bold">Partnerhub</span>
                </Link>

                <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
                    <ThemeToggle />
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
                        Features
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
                        How It Works
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#testimonials">
                        Testimonials
                    </Link>
                </nav>
                {
                    user ? <>
                        <Button className='mx-5' onClick={() => { router.push('/api/auth/logout') }}>Logout</Button>
                    </> : <Button className='mx-5' onClick={() => { router.push('/api/auth/login') }}>
                        <Github className="mr-2 h-3 w-3" />
                        Login
                    </Button>
                }
            </header>
        </>
    )
}
