import { Repository } from "@/lib/types"
import { RepositoryCard } from "./RepositoryCard"
import { Skeleton } from "@/components/ui/skeleton"

interface RepositoryListProps {
    repositories: Repository[] | undefined
    isLoading: boolean
}

export function RepositoryList({ repositories, isLoading }: RepositoryListProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-64">
                        <Skeleton className="h-full w-full" />
                    </div>
                ))}
            </div>
        )
    }

    if (!repositories || repositories.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <div className="rounded-full bg-secondary/50 p-3 mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                    </svg>
                </div>
                <h3 className="text-md font-medium">No repositories found</h3>
                <p className="text-muted-foreground text-sm mt-1">Try adjusting your search terms</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repositories.map(repo => (
                <RepositoryCard
                    key={repo.id}
                    repository={repo}
                />
            ))}
        </div>
    )
}