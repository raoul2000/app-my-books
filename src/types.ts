export type Book = {
    id: string;
    title: string;
    author?: string;
}

export type LoadingState = {
    isLoading: boolean;
    infoMessage?: string;
}