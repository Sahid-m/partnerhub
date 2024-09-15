'use client';


import GlassNavbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Calendar, Plus, Search, Users } from "lucide-react";
import { useState } from 'react';

// Mock data for demonstration
const projects = [
    { id: 1, title: "AI-powered Recipe Generator", description: "Looking for a partner to help build an AI model that generates unique recipes based on available ingredients.", author: "Alice Johnson", authorAvatar: "/placeholder.svg?height=50&width=50", category: "AI/ML", skillsNeeded: ["Python", "Machine Learning", "NLP"], datePosted: "2023-06-15", type: "Project" },
    { id: 2, title: "Blockchain-based Voting System", description: "Seeking collaborators to develop a secure and transparent voting system using blockchain technology.", author: "Bob Smith", authorAvatar: "/placeholder.svg?height=50&width=50", category: "Blockchain", skillsNeeded: ["Solidity", "Web3.js", "React"], datePosted: "2023-06-14", type: "Project" },
    { id: 3, title: "Global Game Jam 2023", description: "Join our team for the upcoming Global Game Jam! We're looking for game developers, artists, and sound designers.", author: "Carol Williams", authorAvatar: "/placeholder.svg?height=50&width=50", category: "Game Development", skillsNeeded: ["Unity", "C#", "3D Modeling", "Sound Design"], datePosted: "2023-06-13", type: "Hackathon" },
    { id: 4, title: "Eco-friendly IoT Smart Home System", description: "Developing an IoT-based smart home system focused on energy efficiency and sustainability. Need hardware and software engineers.", author: "David Brown", authorAvatar: "/placeholder.svg?height=50&width=50", category: "IoT", skillsNeeded: ["Arduino", "Raspberry Pi", "MQTT", "React Native"], datePosted: "2023-06-12", type: "Project" },
    { id: 5, title: "NASA Space Apps Challenge", description: "Forming a team for NASA's annual Space Apps Challenge. Looking for space enthusiasts with coding skills!", author: "Eva Davis", authorAvatar: "/placeholder.svg?height=50&width=50", category: "Space Technology", skillsNeeded: ["Data Analysis", "Machine Learning", "Visualization"], datePosted: "2023-06-11", type: "Hackathon" },
]

export default function ExploreProjectsPage() {

    const { isLoading, user, error } = useUser();

    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('All')
    const [typeFilter, setTypeFilter] = useState('All')

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



    const filteredProjects = projects.filter(project =>
        (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (categoryFilter === 'All' || project.category === categoryFilter) &&
        (typeFilter === 'All' || project.type === typeFilter)
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
            <GlassNavbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Explore Projects & Hackathons</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Post New Project
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Post a New Project</DialogTitle>
                                <DialogDescription>
                                    Share your project idea or hackathon to find collaborators.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">
                                        Title
                                    </Label>
                                    <Input id="title" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">
                                        Description
                                    </Label>
                                    <Textarea id="description" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right">
                                        Category
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="AI/ML">AI/ML</SelectItem>
                                            <SelectItem value="Blockchain">Blockchain</SelectItem>
                                            <SelectItem value="Game Development">Game Development</SelectItem>
                                            <SelectItem value="IoT">IoT</SelectItem>
                                            <SelectItem value="Space Technology">Space Technology</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="type" className="text-right">
                                        Type
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Project">Project</SelectItem>
                                            <SelectItem value="Hackathon">Hackathon</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Post Project</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="col-span-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search projects..."
                                className="pl-10 bg-white dark:bg-gray-700"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Categories</SelectItem>
                                <SelectItem value="AI/ML">AI/ML</SelectItem>
                                <SelectItem value="Blockchain">Blockchain</SelectItem>
                                <SelectItem value="Game Development">Game Development</SelectItem>
                                <SelectItem value="IoT">IoT</SelectItem>
                                <SelectItem value="Space Technology">Space Technology</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Types</SelectItem>
                                <SelectItem value="Project">Projects</SelectItem>
                                <SelectItem value="Hackathon">Hackathons</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <ScrollArea className="h-[600px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

function ProjectCard({ project }: any) {
    return (
        <Card className="bg-white dark:bg-gray-800 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">{project.title}</CardTitle>
                        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">{project.category}</CardDescription>
                    </div>
                    <Badge variant={project.type === "Project" ? "default" : "secondary"}>
                        {project.type}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.skillsNeeded.map((skill: any, index: any) => (
                        <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {project.datePosted}
                    </div>
                    <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        Looking for partners
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center space-x-2">
                    <Avatar>
                        <AvatarImage src={project.authorAvatar} alt={project.author} />
                        <AvatarFallback>{project.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{project.author}</span>
                </div>
                <Button size="sm">Apply</Button>
            </CardFooter>
        </Card>
    )
}