
export interface Book {
    title: string;
    authors: string[];
    description?: string;
    publishedDate?: string;
}
export interface FetchBooksResponse {
    books: Book[];
    totalResults: number;
}

export interface Statistics {
    totalResults: number;
    mostCommonAuthor: string | null;
    earliestPublication: string | null;
    latestPublication: string | null;
}