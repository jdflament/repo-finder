import {
	Pagination as UIPagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	PaginationEllipsis,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PaginationProps {
	currentPage: number
	totalPages: number
	perPage: number
	onPageChangeAction: (page: number) => void
	onPerPageChangeAction: (perPage: number) => void
}

export function Pagination({
	   currentPage,
	   totalPages,
	   perPage,
	   onPageChangeAction,
	   onPerPageChangeAction,
   }: PaginationProps) {
	const getPageNumbers = () => {
		const pageNumbers = [];

		pageNumbers.push(1);

		const startPage = Math.max(2, currentPage - 1);
		const endPage = Math.min(totalPages - 1, currentPage + 1);

		if (startPage > 2) {
			pageNumbers.push("ellipsis1");
		}

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}

		if (endPage < totalPages - 1) {
			pageNumbers.push("ellipsis2");
		}

		if (totalPages > 1) {
			pageNumbers.push(totalPages);
		}

		return pageNumbers;
	}

	const pageNumbers = getPageNumbers()

	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
			<div className="flex items-center space-x-2">
				<p className="text-sm text-muted-foreground">Showing</p>
				<Select
					value={perPage.toString()}
					onValueChange={(value) => onPerPageChangeAction(Number(value))}
				>
					<SelectTrigger className="h-8 w-24">
						<SelectValue placeholder={perPage.toString()} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="10">10</SelectItem>
						<SelectItem value="20">20</SelectItem>
						<SelectItem value="30">30</SelectItem>
						<SelectItem value="50">50</SelectItem>
					</SelectContent>
				</Select>
				<p className="text-sm text-muted-foreground">per page</p>
			</div>

			<UIPagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => onPageChangeAction(currentPage - 1)}
							aria-disabled={currentPage === 1}
							className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
						/>
					</PaginationItem>

					{pageNumbers.map((page, i) => {
						if (page === "ellipsis1" || page === "ellipsis2") {
							return (
								<PaginationItem key={`ellipsis-${i}`}>
									<PaginationEllipsis />
								</PaginationItem>
							)
						}

						return (
							<PaginationItem key={page}>
								<PaginationLink
									isActive={currentPage === page}
									onClick={() => onPageChangeAction(page as number)}
								>
									{page}
								</PaginationLink>
							</PaginationItem>
						)
					})}

					<PaginationItem>
						<PaginationNext
							onClick={() => onPageChangeAction(currentPage + 1)}
							aria-disabled={currentPage === totalPages || totalPages === 0}
							className={currentPage === totalPages || totalPages === 0 ? "pointer-events-none opacity-50" : ""}
						/>
					</PaginationItem>
				</PaginationContent>
			</UIPagination>
		</div>
	)
}
