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

export type BookFormState = {
    title: string;
    author?: string;
    validation: {
        title:boolean;
    }
};

export type LoginSuccessResponse = {
    success: boolean;
    /**
     * user may not have an api_key (ex: admin user or
     * api key revoked)
     */
    api_key?: string;
}

export type ErrorResponse = {
    name: string;
    message: string;
    code: number;
    status: number;
    type: string;
}