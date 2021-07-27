import { Book, LoginSuccessResponse } from "../../types";
import { nanoid } from "nanoid";
import Storage from "@/utils/storage";

export const apiBaseUrl = import.meta.env.VITE_BOOK_API_BASE_URL;
const HEADER_NAME_API_KEY = "X-Api-Key";

const getApiKey = () => Storage.getApiKey() || "";

const errorHandler = (response: Response) => {
    if (!response.ok) {
        return response.json().then((data) => {
            throw data
        });
    } else {
        return response.json();
    }
};

export const getAllBooks = () =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/book",
        })}`,
        {
            headers: { [HEADER_NAME_API_KEY]: getApiKey() },
        }
    )
        .then(errorHandler)
        .then((jsonResp) => jsonResp as unknown as Book[]);

export const addBook = (book: Book): Promise<Book> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/book/create",
        })}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                [HEADER_NAME_API_KEY]: getApiKey(),
            },
            body: JSON.stringify({
                id: nanoid(),
                title: book.title,
                author: book.author,
            }),
        }
    )
        .then(errorHandler)
        .then((resp) => resp as unknown as Book);

export const updateBook = (book: Book): Promise<Book> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/book/update",
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
        .then(errorHandler)
        .then((resp) => resp as unknown as Book);

export const deleteBookById = (id: string): Promise<Response> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/book/delete",
            id,
        })}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                [HEADER_NAME_API_KEY]: getApiKey(),
            },
        }
    ).then(errorHandler);

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
        .then(errorHandler)
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

export default {
    getAllBooks,
    deleteBookById,
    addBook,
    updateBook,
    login,
    logout,
};
