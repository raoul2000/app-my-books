export type TravelTicket = {
    id: string;
    departureDateTime: Date;
    /**
     * Departure location
     */
    from: string;
    qrCodeUrl?: string;
    checkpointUrl:string;
};
export const createTravelTicket = (): TravelTicket => ({
    id: "",
    departureDateTime: new Date(),
    from: "",
    checkpointUrl: ""
});
export type BookTrack = {
    id: number;
    isBoarding: boolean;
    email: string | null;
    rate: number | null;
    locationName: string | null;
    text: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type Book = {
    id: string;
    title: string;
    subtitle?: string;
    author?: string;
    isbn?: string;
    readStatus?: number;
    rate?: number;
    isTraveling: boolean;
    isTicketLoaded: boolean;
    ticket?: TravelTicket;
    tracks?: BookTrack[];
    pingCount: number;
};
/**
 * ISBN Book search result
 */
export type BookResult = {
    title: string;
    subtitle?: string;
    author: string;
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
    readDate?: Date;
    rate?: number;
    validation: {
        title: boolean;
    };
    isbnSearch: AsyncOperationStatus;
    readonly isTraveling:boolean;
};

export const createBookFormState = (book?: Book): BookFormState => ({
    title: book?.title || "",
    subtitle: book?.subtitle,
    author: book?.author,
    isbn: book?.isbn,
    readStatus: book?.readStatus,
    rate: book?.rate,
    validation: {
        title: true,
    },
    isbnSearch: "success",
    isTraveling: book?.isTraveling || false
});

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
    isTraveling: false
});

export const getReadStatusLabel = (readStatus?: number) => {
    switch (readStatus) {
        case 1:
            return "A Lire";
        case 2:
            return "Lu";
        case 3:
            return "En Lecture";
        case 4:
            return "A Relire";
        default:
            return "Sélectionner";
    }
};
export const getReadStatusColor = (readStatus?: number) => {
    switch (readStatus) {
        case 1:
            return "primary";
        case 2:
            return "success";
        case 3:
            return "error";
        case 4:
            return "warning";
        default:
            return "default";
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
