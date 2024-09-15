'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from '@auth0/nextjs-auth0';
import { useUser } from "@auth0/nextjs-auth0/client";
import { CheckCircle, Code, Github, MessageSquare, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GlassNavbar from "./Navbar";
import NavbarLanding from "./Navbar-landing";
import Footer from "./footer";

export default function LandingPage() {

    const router = useRouter();
    const { isLoading, user, error } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;


    return (
        <div className="flex flex-col min-h-screen">
            <NavbarLanding />
            {/* <GlassNavbar /> */}
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Find Your Perfect Coding Partner
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Partnerhub connects you with like-minded developers for side projects and hackathons, leveraging GitHub stats for trust and compatibility.
                                </p>
                            </div>
                            <div className="space-x-4">
                                {user ? <>
                                    <Button onClick={() => router.push('/profile')}>
                                        Profile
                                    </Button></> : <>
                                    <Button onClick={() => router.push('/api/auth/login')}>
                                        <Github className="mr-2 h-4 w-4" />
                                        Sign Up with GitHub
                                    </Button>
                                </>}

                                {
                                    user ? <>
                                        <Button onClick={() => router.push('/explore-projects')}>
                                            Explore Projects
                                        </Button>
                                    </> : ""
                                }
                            </div>
                        </div>
                    </div>
                </section>
                <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
                        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                            <Card>
                                <CardHeader>
                                    <Github className="h-8 w-8 mb-2" />
                                    <CardTitle>GitHub Integration</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    Sign up effortlessly using your GitHub account and showcase your coding skills and project history.
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <Users className="h-8 w-8 mb-2" />
                                    <CardTitle>Smart Matching</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    Our algorithm pairs you with partners based on complementary skills, interests, and GitHub activity.
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <MessageSquare className="h-8 w-8 mb-2" />
                                    <CardTitle>In-App Chat</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    Communicate seamlessly with potential partners through our built-in messaging system.
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
                        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                            <div className="flex flex-col items-center text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">1</div>
                                <h3 className="text-xl font-bold mb-2">Sign Up</h3>
                                <p className="text-gray-500 dark:text-gray-400">Connect your GitHub account to create your Partnerhub profile.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">2</div>
                                <h3 className="text-xl font-bold mb-2">Find Partners</h3>
                                <p className="text-gray-500 dark:text-gray-400">Browse potential partners or let our algorithm suggest matches.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">3</div>
                                <h3 className="text-xl font-bold mb-2">Collaborate</h3>
                                <p className="text-gray-500 dark:text-gray-400">Start chatting and begin your coding journey together!</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Developers Say</h2>
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-start space-x-4">
                                        <img
                                            alt="User avatar"
                                            className="rounded-full"
                                            height="40"
                                            src="https://avatars.githubusercontent.com/u/96366284?v=4"
                                            style={{
                                                aspectRatio: "40/40",
                                                objectFit: "cover",
                                            }}
                                            width="40"
                                        />
                                        <div className="space-y-1">
                                            <h3 className="font-bold">Sahid M</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Full Stack Developer</p>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                                        Partnerhub helped me find the perfect teammate for my hackathon project. We won first place!
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-start space-x-4">

                                        <img
                                            alt="User avatar"
                                            className="rounded-full"
                                            height="40"
                                            src="https://avatars.githubusercontent.com/u/85573908?v=4"
                                            style={{
                                                aspectRatio: "40/40",
                                                objectFit: "cover",
                                            }}
                                            width="40"
                                        />
                                        <div className="space-y-1">
                                            <h3 className="font-bold">Alan K.</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Rust Enthusiast</p>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                                        Ive met amazing developers and launched two successful side projects thanks to Partnerhub!
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Find Your Coding Partner?</h2>
                                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Join Partnerhub today and start collaborating on exciting projects with talented developers.
                                </p>
                            </div>
                            {user ? <>
                                <Button onClick={() => router.push('/profile')}>
                                    Profile
                                </Button></> : <>
                                <Button onClick={() => router.push('/api/auth/login')}>
                                    <Github className="mr-2 h-4 w-4" />
                                    Sign Up with GitHub
                                </Button>
                            </>}

                            {
                                user ? <>
                                    <Button onClick={() => router.push('/explore-projects')}>
                                        Explore Projects
                                    </Button>
                                </> : ""
                            }
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}