import { render, screen } from "@testing-library/react";
import { Pagination } from "./Pagination";
import userEvent from "@testing-library/user-event";

describe("Pagination component", () => {
	const onPageChangeAction = jest.fn();
	const onPerPageChangeAction = jest.fn();

	const setup = (props = {}) => {
		return render(
			<Pagination
				currentPage={2}
				totalPages={5}
				perPage={10}
				onPageChangeAction={onPageChangeAction}
				onPerPageChangeAction={onPerPageChangeAction}
				{...props}
			/>
		);
	};

	beforeAll(() => {
		Element.prototype.hasPointerCapture = () => false;
		Element.prototype.scrollIntoView = () => {};
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders pagination buttons", () => {
		setup();
		expect(screen.getByText("1")).toBeInTheDocument();
		expect(screen.getByText("2")).toBeInTheDocument();
		expect(screen.getByText("3")).toBeInTheDocument();
		expect(screen.getByText("5")).toBeInTheDocument();
	});

	it("calls onPageChangeAction when clicking next", async () => {
		setup();
		const nextButton = screen.getByLabelText("Go to next page");
		await userEvent.click(nextButton);
		expect(onPageChangeAction).toHaveBeenCalledWith(3);
	});

	it("calls onPageChangeAction when clicking previous", async () => {
		setup();
		const previousButton = screen.getByLabelText("Go to previous page");
		await userEvent.click(previousButton);
		expect(onPageChangeAction).toHaveBeenCalledWith(1);
	});

	it("calls onPageChangeAction when clicking a page number", async () => {
		setup();
		const pageButton = screen.getByText("3");
		await userEvent.click(pageButton);
		expect(onPageChangeAction).toHaveBeenCalledWith(3);
	});

	it("calls onPerPageChangeAction when changing perPage value", async () => {
		setup();
		const select = screen.getByRole('combobox');
		await userEvent.click(select);

		const option = await screen.findByText('20');
		await userEvent.click(option);

		expect(onPerPageChangeAction).toHaveBeenCalledWith(20);
	});

	it("disables previous button on first page", () => {
		setup({ currentPage: 1 });
		const previousButton = screen.getByLabelText("Go to previous page");
		expect(previousButton).toHaveAttribute("aria-disabled", "true");
	});

	it("disables next button on last page", () => {
		setup({ currentPage: 5, totalPages: 5 });
		const nextButton = screen.getByLabelText("Go to next page");
		expect(nextButton).toHaveAttribute("aria-disabled", "true");
	});
});
