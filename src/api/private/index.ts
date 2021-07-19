import { Book } from "../../types";
import { nanoid } from "nanoid";

export const apiBaseUrl = import.meta.env.VITE_BOOK_API_BASE_URL;
const HEADER_NAME_API_KEY = 'X-Api-Key';

const getApiKey = () => localStorage.getItem('api-key') || '';

export const getAllBooks = () => {

    return fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/book",
        })}`,
        {
            headers : { [HEADER_NAME_API_KEY] : getApiKey() }
        }
    )
        .then((resp) => resp.json())
        .then((jsonResp) => jsonResp as unknown as Book[]);
};

export const addBook = (book: Book): Promise<Book> =>fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/book/create",
        })}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                [HEADER_NAME_API_KEY] : getApiKey()
            },
            body: JSON.stringify({
                id: nanoid(),
                title: book.title,
                author: book.author,
            }),
        }
    ).then((resp) => resp.json() as unknown as Book);


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
                [HEADER_NAME_API_KEY] : getApiKey()
            },
            body: JSON.stringify({
                title: book.title,
                author: book.author,
            }),
        }
    ).then((resp) => resp.json() as unknown as Book);


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
                [HEADER_NAME_API_KEY] : getApiKey()
            },
        }
    );

export default {
    getAllBooks,
    deleteBookById,
    addBook,
    updateBook,
};
