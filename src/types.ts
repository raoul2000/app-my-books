export type Book = {
    id: string;
    title: string;
    author?: string;
    isbn?:string;
}

export type LoadingState = {
    isLoading: boolean;
    infoMessage?: string;
}

export type LoadingBooksState = {
    status: 'init' | 'loading' | 'success' | 'error';
    errorMessage?: string;
}

export type AsyncOperationStatus = 'progress' | 'success' | 'error';
export type BookFormState = {
    title: string;
    author?: string;
    isbn?:string;
    validation: {
        title:boolean;
    }
    isbnSearch : AsyncOperationStatus
};

export type LoginSuccessResponse = {
    success: boolean;
    /**
     * user may not have an api_key (ex: admin user or
     * api key revoked)
     */
    api_key?: string;
};

export type ApiKeyCheckResponse = {
    isValid: boolean;
};

export type ErrorResponse = {
    name: string;
    message: string;
    code: number;
    status: number;
    type: string;
}