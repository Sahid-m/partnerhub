import GlassNavbar from "@/components/Navbar"
import ProjectCard from "@/components/ProjectCard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { getGitHubUserInfo } from "@/lib/user.actions"
import { calculateLanguageUsage } from "@/lib/utilitys"
import { getSession } from "@auth0/nextjs-auth0"
import { Calendar, Github, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

// Mock data for demonstration
// const user = {
//     name: "Jane Doe",
//     username: "janedoe",
//     avatar: "/placeholder.svg?height=100&width=100",
//     bio: "Full-stack developer | Open source enthusiast",
//     location: "San Francisco, CA",
//     email: "jane@example.com",
//     joinDate: "January 2020",
//     projects: [
//         { name: "awesome-project", description: "A really cool project", language: "TypeScript" },
//         { name: "react-component-library", description: "Reusable React components", language: "JavaScript" },
//         { name: "python-data-analysis", description: "Data analysis tools", language: "Python" },
//         { name: "go-microservices", description: "Microservices in Go", language: "Go" },
//         { name: "rust-game-engine", description: "A game engine written in Rust", language: "Rust" },
//     ],
//     languages: [
//         { name: "TypeScript", percentage: 40, color: "bg-blue-500" },
//         { name: "JavaScript", percentage: 30, color: "bg-yellow-400" },
//         { name: "Python", percentage: 15, color: "bg-green-500" },
//         { name: "Go", percentage: 10, color: "bg-cyan-500" },
//         { name: "Rust", percentage: 5, color: "bg-orange-500" },
//     ],
//     potentialMatches: [
//         { name: "Alice Smith", username: "alicesmith", avatar: "/placeholder.svg?height=40&width=40", compatibility: 95 },
//         { name: "Bob Johnson", username: "bobjohnson", avatar: "/placeholder.svg?height=40&width=40", compatibility: 88 },
//         { name: "Carol Williams", username: "carolwilliams", avatar: "/placeholder.svg?height=40&width=40", compatibility: 82 },
//     ],
// }

export default async function UserProfile() {

    const session = await getSession();

    if (!session) {
        redirect('/');
    }
    console.log(session.user.nickname)
    const { repos, user } = await getGitHubUserInfo(session.user.nickname);
    console.log(user);
    const languageUsage = calculateLanguageUsage(repos);
    console.log(languageUsage);

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
                <GlassNavbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* User Info */}
                        <Card className="md:col-span-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg">
                            <CardHeader>
                                <Avatar className="w-24 h-24 mx-auto ring-4 ring-purple-700 dark:ring-purple-400">
                                    <AvatarImage src={session.user.picture} alt={session.user.name} />
                                    <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <CardTitle className="text-center mt-4 text-2xl font-bold text-gray-800 dark:text-white">{session.user.name}</CardTitle>
                                <CardDescription className="text-center text-purple-600 dark:text-purple-400">@{session.user.nickname}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center mb-4 text-gray-600 dark:text-gray-300">{user.bio}</p>
                                <div className="flex flex-col space-y-2 text-gray-600 dark:text-gray-300">
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-2 text-purple-500 dark:text-purple-400" />
                                        <span>{user.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="w-4 h-4 mr-2 text-purple-500 dark:text-purple-400" />
                                        <span>{session.user.email}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-purple-500 dark:text-purple-400" />
                                        <span>Joined {new Date(user.joinedAt).getFullYear()}</span>
                                    </div>
                                </div>
                                <Link href={user.profileUrl}>
                                    <Button className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white">
                                        <Github className="mr-2 h-4 w-4" /> View GitHub Profile
                                    </Button>
                                </Link>
                                <Button className="w-full mt-4 bg-purple-700 hover:bg-purple-800 dark:hover:bg-purple-950 dark:bg-purple-800 text-white">
                                    <Github className="mr-2 h-4 w-4" /> Refetch Your Current Github Details
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Main Content */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Projects */}
                            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Projects</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="w-full whitespace-nowrap rounded-md">
                                        <div className="flex space-x-4 pb-4">
                                            {repos.map((project) => (
                                                <ProjectCard key={project.name} project={project} />
                                            ))}
                                        </div>
                                        <ScrollBar orientation="horizontal" />
                                    </ScrollArea>
                                </CardContent>
                            </Card>

                            {/* Languages */}
                            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">Languages</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {languageUsage.map((language) => (
                                            <div key={language.name} className="space-y-1">
                                                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                                                    <span>{language.name}</span>
                                                    <span>{language.percentage}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-600">
                                                    <div
                                                        className={`${language.color} rounded-full h-2 transition-all duration-500 ease-in-out`}
                                                        style={{ width: `${language.percentage}%` }}
                                                    />

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Potential Matches */}
                            {/* <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">Potential Matches</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {user.potentialMatches.map((match) => (
                                            <li key={match.username} className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-lg">
                                                <div className="flex items-center space-x-4">
                                                    <Avatar>
                                                        <AvatarImage src={match.avatar} alt={match.name} />
                                                        <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium text-gray-800 dark:text-white">{match.name}</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">@{match.username}</p>
                                                    </div>
                                                </div>
                                                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                                    {match.compatibility}% Match
                                                </Badge>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}