import { Repository } from "@/lib/types"
import { formatDate } from "@/lib/github"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, GitFork, Eye, Calendar, Code } from "lucide-react"
import { cn } from "@/lib/utils"

interface RepositoryCardProps {
    repository: Repository
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
    return (
        <Card
            className={cn(
                "h-full transition-all duration-300 hover:shadow-md",
            )}
        >
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg font-medium hover:text-primary transition-colors">
                            <a href={repository.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                {repository.name}
                            </a>
                        </CardTitle>
                        <CardDescription className="truncate max-w-xs mt-1">
                            {repository.owner.login}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pb-3 mb-auto">
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {repository.description || "No description provided"}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                    {repository.language && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Code className="w-3 h-3" />
                            {repository.language}
                        </Badge>
                    )}

                    {repository.topics?.slice(0, 3).map(topic => (
                        <Badge key={topic} variant="outline" className="bg-secondary/50">
                            {topic}
                        </Badge>
                    ))}
                </div>
            </CardContent>

            <Separator />

            <CardFooter className="pt-3 flex justify-between text-xs text-muted-foreground">
                <div className="flex space-x-3">
                    <div className="flex items-center">
                        <Star className="w-3.5 h-3.5 mr-1" />
                        <span>{repository.stargazers_count.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                        <GitFork className="w-3.5 h-3.5 mr-1" />
                        <span>{repository.forks_count.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        <span>{repository.watchers_count.toLocaleString()}</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    <span>Updated {formatDate(repository.updated_at)}</span>
                </div>
            </CardFooter>
        </Card>
    )
}