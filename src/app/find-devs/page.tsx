'use client';

import GlassNavbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from '@auth0/nextjs-auth0/client';
import { Github, Search } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Mock data for demonstration
const users = [
    { id: 1, name: "Alice Johnson", username: "alicej", avatar: "/placeholder.svg?height=50&width=50", mostUsedLanguage: "JavaScript", compatibilityScore: 95, githubUrl: "https://github.com/alicej" },
    { id: 2, name: "Bob Smith", username: "bobs", avatar: "/placeholder.svg?height=50&width=50", mostUsedLanguage: "Python", compatibilityScore: 88, githubUrl: "https://github.com/bobs" },
    { id: 3, name: "Carol Williams", username: "carolw", avatar: "/placeholder.svg?height=50&width=50", mostUsedLanguage: "Java", compatibilityScore: 82, githubUrl: "https://github.com/carolw" },
    { id: 4, name: "David Brown", username: "davidb", avatar: "/placeholder.svg?height=50&width=50", mostUsedLanguage: "TypeScript", compatibilityScore: 91, githubUrl: "https://github.com/davidb" },
    { id: 5, name: "Eva Davis", username: "evad", avatar: "/placeholder.svg?height=50&width=50", mostUsedLanguage: "C++", compatibilityScore: 79, githubUrl: "https://github.com/evad" },
    // Add more mock users as needed
]

export default function ExplorePage() {

    const router = useRouter();
    const { isLoading, user, error } = useUser();



    const [searchTerm, setSearchTerm] = useState('')

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    if (!user?.email) {
        return (
            <>
                <GlassNavbar />
                <div className="h-screen flex justify-center items-center">
                    Please Login to continue
                </div>
            </>
        )

    }

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mostUsedLanguage.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
            <GlassNavbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Explore Developers</h1>

                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search by name, username, or language"
                            className="pl-10 bg-white dark:bg-gray-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">Developers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[600px] w-full rounded-md border">
                            <div className="p-4">
                                {filteredUsers.map((user) => (
                                    <UserCard key={user.id} user={user} />
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function UserCard({ user }: any) {
    return (
        <Card className="mb-4 bg-white dark:bg-gray-700 overflow-hidden">
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white">{user.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                            {user.mostUsedLanguage}
                        </Badge>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            {user.compatibilityScore}% Match
                        </Badge>
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                        <a href={user.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            GitHub Profile
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
