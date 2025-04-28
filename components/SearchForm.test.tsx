import { render, screen, fireEvent, act } from "@testing-library/react"
import { SearchForm } from "./SearchForm"
import { useRouter, useSearchParams } from "next/navigation"

jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
	useSearchParams: jest.fn(),
}))

describe("SearchForm", () => {
	const pushMock = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks();

		(useRouter as jest.Mock).mockReturnValue({
			push: pushMock,
		});

		(useSearchParams as jest.Mock).mockReturnValue({
			toString: () => "",
		})
	})

	it("renders with initial query", () => {
		render(<SearchForm initialQuery="react" isLoading={false} />)

		expect(screen.getByPlaceholderText("Search GitHub repositories...")).toHaveValue("react")
		expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument()
	})

	it("submits the form and navigates with query", async () => {
		render(<SearchForm isLoading={false} />)

		const input = screen.getByPlaceholderText("Search GitHub repositories...")
		const submitButton = screen.getByRole("button", { name: /search/i })

		await act(async () => {
			fireEvent.change(input, { target: { value: "nextjs" } })
			fireEvent.click(submitButton)
		})

		expect(pushMock).toHaveBeenCalledWith("/?q=nextjs&page=1")
	})

	it("shows 'Searching...' when loading", () => {
		render(<SearchForm isLoading={true} />)

		expect(screen.getByRole("button", { name: /searching/i })).toBeDisabled()
	})

	it("clears the input when clicking clear button", async () => {
		render(<SearchForm initialQuery="vue" isLoading={false} />)

		const input = screen.getByPlaceholderText("Search GitHub repositories...")
		const clearButton = screen.getByRole("button", { name: /clear/i })

		await act(async () => {
			fireEvent.click(clearButton)
		})

		expect(input).toHaveValue("")
		expect(pushMock).toHaveBeenCalledWith("/?")
	})

	it("does not submit when input is empty", async () => {
		render(<SearchForm isLoading={false} />)

		const submitButton = screen.getByRole("button", { name: /search/i })

		await act(async () => {
			fireEvent.click(submitButton)
		})

		expect(pushMock).not.toHaveBeenCalled()
	})
})
