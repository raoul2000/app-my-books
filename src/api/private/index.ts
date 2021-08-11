import { Book, LoginSuccessResponse, ApiKeyCheckResponse } from "../../types";
import { nanoid } from "nanoid";
import Storage from "@/utils/storage";

export const apiBaseUrl = import.meta.env.VITE_BOOK_API_BASE_URL;
const HEADER_NAME_API_KEY = "X-Api-Key";

const getApiKey = () => Storage.getApiKey() || "";

const handleErrorJson = (response: Response) => {
    if (!response.ok) {
        return response.json().then((data) => {
            throw data;
        });
    } else {
        return response.json();
    }
};

const handleErrorNoResponse = (response: Response) => {
    if (!response.ok) {
        throw response.statusText;
    } else {
        return true;
    }
};

export const getAllBooks = () =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/user-book",
        })}`,
        {
            headers: { [HEADER_NAME_API_KEY]: getApiKey() },
        }
    )
        .then(handleErrorJson)
        .then((jsonResp) => jsonResp as unknown as Book[]);

export const addBook = (book: Omit<Book, "id">): Promise<Book> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/user-book/create",
        })}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                [HEADER_NAME_API_KEY]: getApiKey(),
            },
            body: JSON.stringify({
                title: book.title,
                author: book.author,
            }),
        }
    )
        .then(handleErrorJson)
        .then((resp) => resp as unknown as Book);

export const updateBook = (book: Book): Promise<Book> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/user-book/update",
            id: book.id,
        })}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                [HEADER_NAME_API_KEY]: getApiKey(),
            },
            body: JSON.stringify({
                title: book.title,
                author: book.author,
            }),
        }
    )
        .then(handleErrorJson)
        .then((resp) => resp as unknown as Book);

export const deleteBookById = (id: string): Promise<boolean> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/user-book/delete",
            id,
        })}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                [HEADER_NAME_API_KEY]: getApiKey(),
            },
        }
    ).then(handleErrorNoResponse);

export const login = (username: string, password: string): Promise<string> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/auth/login",
        })}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        }
    )
        .then(handleErrorJson)
        .then((successResponse) => {
            const loginSuccess =
                successResponse as unknown as LoginSuccessResponse;
            return loginSuccess.api_key || "";
        });

export const logout = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 100);
    });

export const checkApiKey = (apiKey: string) =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/auth/check-api-key",
            token: apiKey,
        })}`
    )
        .then(handleErrorJson)
        .then((successResponse) => {
            const apiKeyCheck =
                successResponse as unknown as ApiKeyCheckResponse;
            return apiKeyCheck.isValid;
        });

export default {
    getAllBooks,
    deleteBookById,
    addBook,
    updateBook,
    login,
    logout,
    checkApiKey
};
