export interface Repository {
    id: number;
    name: string;
    owner: {
        login: string;
    };
    html_url: string;
    description: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    language: string | null;
    topics: string[];
    updated_at: string;
}

export interface SearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: Repository[];
}

export interface SearchParams {
    q: string;
    per_page: number;
    page: number;
    language?: string;
}