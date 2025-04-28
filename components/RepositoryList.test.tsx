import { render, screen } from "@testing-library/react"
import { RepositoryList } from "./RepositoryList"
import { Repository } from "@/lib/types"

jest.mock("./RepositoryCard", () => ({
	RepositoryCard: ({ repository }: { repository: Repository }) => (
		<div data-testid="repository-card">{repository.name}</div>
	),
}))

describe("RepositoryList", () => {
	it("renders skeletons when loading", () => {
		render(<RepositoryList repositories={undefined} isLoading={true} />)

		const skeletons = screen.getAllByRole("generic", { hidden: true })
		expect(skeletons.length).toBeGreaterThanOrEqual(6)
	})

	it("renders empty state when no repositories", () => {
		render(<RepositoryList repositories={[]} isLoading={false} />)

		expect(screen.getByText("No repositories found")).toBeInTheDocument()
		expect(screen.getByText("Try adjusting your search terms")).toBeInTheDocument()
	})

	it("renders a list of repositories", () => {
		const mockRepositories: Repository[] = [
			{
				id: 1,
				name: "repo-1",
				html_url: "https://github.com/example/repo-1",
				description: "First repo",
				language: "TypeScript",
				stargazers_count: 10,
				forks_count: 2,
				watchers_count: 5,
				updated_at: "2023-04-01T00:00:00Z",
				topics: ["react", "typescript"],
				owner: {
					login: "example",
				},
			},
			{
				id: 2,
				name: "repo-2",
				html_url: "https://github.com/example/repo-2",
				description: "Second repo",
				language: "JavaScript",
				stargazers_count: 20,
				forks_count: 3,
				watchers_count: 8,
				updated_at: "2023-05-01T00:00:00Z",
				topics: ["vue", "javascript"],
				owner: {
					login: "example",
				},
			},
		]

		render(<RepositoryList repositories={mockRepositories} isLoading={false} />)

		const repoCards = screen.getAllByTestId("repository-card")
		expect(repoCards).toHaveLength(2)

		expect(screen.getByText("repo-1")).toBeInTheDocument()
		expect(screen.getByText("repo-2")).toBeInTheDocument()
	})
})
