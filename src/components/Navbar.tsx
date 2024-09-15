'use client';

import { Button } from "@/components/ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Code, Github } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeToggle from "./theme-toggle";

export default function GlassNavbar() {

    const { isLoading, user, error } = useUser();
    const router = useRouter();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <nav className="sticky top-0 z-50 flex justify-center w-full">
            <div className="flex items-center justify-between px-4 py-2 mt-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-full shadow-lg max-w-3xl w-full">
                <Link href="/" className="flex items-center text-foreground">
                    <Code className="mr-2 h-4 w-4" />
                    <span className="font-bold">Partnerhub</span>
                </Link>
                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    <Link href="/explore-projects" className="text-foreground hover:text-primary">
                        Explore Projects
                    </Link>
                    <Link href="/find-devs" className="text-foreground hover:text-primary">
                        Partners
                    </Link>
                    <Link href="/profile" className="text-foreground hover:text-primary">
                        Profile
                    </Link>
                    {
                        user ? <>
                            <Button variant="outline" size="sm" className="bg-white bg-opacity-50" onClick={() => { router.push('/api/auth/logout') }}>Logout</Button>
                        </> : <Button variant="outline" size="sm" className="bg-white bg-opacity-50" onClick={() => { router.push('/api/auth/login') }}>
                            <Github className="mr-2 h-4 w-4" />
                            Login
                        </Button>
                    }
                </div>
            </div>
        </nav>
    )
}