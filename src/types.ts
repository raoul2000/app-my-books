export type Book = {
    id: string;
    title: string;
    subtitle?: string;
    author?: string;
    isbn?: string;
    readStatus?: number;
    rate?: number;
};

export type LoadingState = {
    isLoading: boolean;
    infoMessage?: string;
};

export type LoadingBooksState = {
    status: "init" | "loading" | "success" | "error";
    errorMessage?: string;
};

export type AsyncOperationStatus = "progress" | "success" | "error";
export type BookFormState = {
    title: string;
    subtitle?: string;
    author?: string;
    isbn?: string;
    readStatus?: number;
    rate?: number;
    validation: {
        title: boolean;
    };
    isbnSearch: AsyncOperationStatus;
};

export const createBookForm = (): BookFormState => ({
    title: "",
    subtitle: "",
    author: "",
    isbn: "",
    readStatus: 2,
    validation: {
        title: true,
    },
    isbnSearch: "success",
});

export const getReadStatusLabel = (readStatus: number) => {
    switch (readStatus) {
        case 1:
            return "To read";
        case 2:
            return "Read";
        case 3:
            return "Reading";
        default:
            return "";
    }
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
};
