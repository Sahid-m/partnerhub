import { ExternalLink, GitFork, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

export default function ProjectCard({ project }: {
    project: {
        name: string;
        description: string;
        languages: string[];
        stars: number | undefined;
        forks: number | undefined;
        url: string;
    }
}) {
    return (
        <Card className="w-[300px] md:w-[350px] shrink-0 bg-white dark:bg-gray-700 overflow-hidden">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold text-gray-800 dark:text-white truncate">
                        {project.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                        {project.forks && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                <GitFork className="w-3 h-3 mr-1" />
                                Fork
                            </Badge>
                        )}
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                            <Star className="w-3 h-3 mr-1" />
                            {project.stars}
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pb-3">
                <CardDescription className="text-gray-600 dark:text-gray-300 h-12 overflow-hidden text-ellipsis">
                    {project.description}
                </CardDescription>
                <div className="mt-3 flex flex-wrap gap-2">
                    {project.languages.length > 0 ? (
                        project.languages.map((lang) => (
                            <Badge key={lang} variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                                {lang}
                            </Badge>
                        ))
                    ) : (
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
                            No language specified
                        </Badge>
                    )}
                </div>
                <Button className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white" asChild>
                    <Link href={project.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Repository
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}
