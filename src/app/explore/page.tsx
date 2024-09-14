import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Explore() {

    const session = await getSession();


    if (!session) {
        redirect('/');
    }

    return (
        <div className='h-screen bg-neutral-100 dark:bg-slate-900 justify-center items-center flex'>
            <h1 className='text-3xl text-black dark:text-white'>
                Welcome to Explore Page
            </h1>
        </div>
    )
}
