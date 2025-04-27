import { SearchParams, SearchResponse } from './types';

export async function searchRepositories(params: SearchParams): Promise<SearchResponse> {
    try {
        const baseUrl = 'https://api.github.com/search/repositories';

        let queryString = `?q=${encodeURIComponent(params.q)}`;

        if (params.language) {
            queryString += `+language:${encodeURIComponent(params.language)}`;
        }

        queryString += `&per_page=${params.per_page}`;
        queryString += `&page=${params.page}`;

        const response = await fetch(`${baseUrl}${queryString}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            },
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch repositories');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        throw error;
    }
}

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}