import { render, screen } from '@testing-library/react';
import { RepositoryCard } from './RepositoryCard';
import { Repository } from '@/lib/types';

describe('RepositoryCard', () => {
	const repository: Repository = {
		id: 1,
		name: 'repo1',
		description: 'A test repository',
		owner: { login: 'user1' },
		html_url: 'https://github.com/user1/repo1',
		language: 'JavaScript',
		topics: ['react', 'web'],
		stargazers_count: 100,
		forks_count: 50,
		watchers_count: 30,
		updated_at: '2023-01-01T00:00:00Z',
	};

	it('renders repository name and link', () => {
		render(<RepositoryCard repository={repository} />);

		const linkElement = screen.getByRole('link', { name: /repo1/i });
		expect(linkElement).toHaveAttribute('href', repository.html_url);
		expect(linkElement).toBeInTheDocument();
	});

	it('renders owner login', () => {
		render(<RepositoryCard repository={repository} />);

		const ownerElement = screen.getByText(repository.owner.login);
		expect(ownerElement).toBeInTheDocument();
	});

	it('renders description', () => {
		render(<RepositoryCard repository={repository} />);

		const descriptionElement = screen.getByText(repository.description);
		expect(descriptionElement).toBeInTheDocument();
	});

	it('renders "No description provided" if description is empty', () => {
		const noDescriptionRepository = { ...repository, description: '' };
		render(<RepositoryCard repository={noDescriptionRepository} />);

		const noDescriptionElement = screen.getByText(/No description provided/i);
		expect(noDescriptionElement).toBeInTheDocument();
	});

	it('renders language badge', () => {
		render(<RepositoryCard repository={repository} />);

		const languageBadge = screen.getByText(repository.language || '');
		expect(languageBadge).toBeInTheDocument();
	});

	it('renders topics badges', () => {
		render(<RepositoryCard repository={repository} />);

		repository.topics?.forEach(topic => {
			const topicBadge = screen.getByText(topic);
			expect(topicBadge).toBeInTheDocument();
		});
	});

	it('renders star count', () => {
		render(<RepositoryCard repository={repository} />);

		const starCount = screen.getByText(repository.stargazers_count.toLocaleString());
		expect(starCount).toBeInTheDocument();
	});

	it('renders fork count', () => {
		render(<RepositoryCard repository={repository} />);

		const forkCount = screen.getByText(repository.forks_count.toLocaleString());
		expect(forkCount).toBeInTheDocument();
	});

	it('renders watcher count', () => {
		render(<RepositoryCard repository={repository} />);

		const watcherCount = screen.getByText(repository.watchers_count.toLocaleString());
		expect(watcherCount).toBeInTheDocument();
	});

	it('renders updated date', () => {
		render(<RepositoryCard repository={repository} />);

		const updatedDate = screen.getByText(`Updated Jan 1, 2023`);
		expect(updatedDate).toBeInTheDocument();
	});
});
