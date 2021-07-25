export type Book = {
    id: string;
    title: string;
    author?: string;
}

export type LoadingState = {
    isLoading: boolean;
    infoMessage?: string;
}

export type LoadingBooksState = {
    status: 'init' | 'loading' | 'success' | 'error';
    errorMessage?: string;
}