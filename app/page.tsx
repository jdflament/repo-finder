"use client"

import { GitForkIcon } from "lucide-react"
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchResponse } from "@/lib/types";
import { searchRepositories } from "@/lib/github";
import { SearchForm } from "@/components/SearchForm";
import { RepositoryList } from "@/components/RepositoryList";
import { Separator } from "@/components/ui/separator";
import { Pagination } from "@/components/Pagination";

export default function Home() {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const query = searchParams.get("q") || "";
	const page = Number(searchParams.get("page") || "1");
	const perPage = Number(searchParams.get("per_page") || "10");

	const [isLoading, setIsLoading] = useState(false);
	const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);

	useEffect(() => {
		if (!query) {
			setSearchResults(null)
			return
		}

		const fetchResults = async () => {
			setIsLoading(true)
			try {
				const results = await searchRepositories({
					q: query,
					page,
					per_page: perPage,
				})

				setSearchResults(results)
			} catch (error) {
				console.error("Error fetching results:", error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchResults();
	}, [query, page, perPage]);

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set("page", newPage.toString())
		replace(`${pathname}?${params.toString()}`)

		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	const handlePerPageChange = (newPerPage: number) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set("per_page", newPerPage.toString())
		params.set("page", "1");
		replace(`${pathname}?${params.toString()}`);
	}

	const totalPages = searchResults ? Math.min(Math.ceil(searchResults.total_count / perPage), 100) : 0

	return (
		<>
			<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-white p-6 md:p-10">
				<div className="flex w-full max-w-sm flex-col gap-6">
					<Link href="/" className="flex items-center gap-2 self-center font-medium">
						<div
							className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
							<GitForkIcon className="size-4"/>
						</div>
						Repo Finder
					</Link>
				</div>
				<div className={"max-w-md w-full"}>
					<SearchForm initialQuery={query} isLoading={isLoading} />

					{searchResults && (
						<div className="text-sm text-muted-foreground mt-2">
							<strong>{searchResults.total_count.toLocaleString()}</strong>{" "}
							{searchResults.total_count === 1 ? 'repository' : 'repositories'} found
							{searchResults.incomplete_results && (
								<span className="ml-1">(results may be incomplete)</span>
							)}
						</div>
					)}
				</div>
				<div className={"w-full"}>
					<RepositoryList
						repositories={searchResults?.items}
						isLoading={isLoading}
					/>

					{searchResults && searchResults.items.length > 0 && (
						<>
							<Separator className="my-4" />
							<Pagination
								currentPage={page}
								totalPages={totalPages}
								perPage={perPage}
								onPageChangeAction={handlePageChange}
								onPerPageChangeAction={handlePerPageChange}
							/>
						</>
					)}
				</div>
			</div>
		</>
	);
}
