import { searchRepositories } from "@/lib/github";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const page = Number(searchParams.get("page")) || 1;
    const per_page = Number(searchParams.get("per_page")) || 10;
    const language = searchParams.get("language") || undefined;

    if (!query) {
        return new Response("Missing query", { status: 400 });
    }

    try {
        const data = await searchRepositories({
            q: query,
            page,
            per_page,
            language,
        });
        return Response.json(data);
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }
        return new Response("An unexpected error occurred", { status: 500 });
    }
}