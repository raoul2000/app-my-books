import { Book } from "../../types";

export const apiBaseUrl = import.meta.env.VITE_BOOK_API_BASE_URL;

export const getAllBooks = () => {
    return fetch(apiBaseUrl)
        .then(resp => resp.json())
        .then(jsonResp => (jsonResp as unknown) as Book[]);
}

export const deleteBookById = (id: string): Promise<Response> =>
    fetch(`${apiBaseUrl}/${id}`, {
        method: "DELETE",
    });

export const addBook = (book: Book): Promise<Book> =>
    fetch(apiBaseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: book.title, author: book.author }),
    }).then((resp) => resp.json() as unknown as Book);

export const updateBook = (book: Book): Promise<Book> =>
    fetch(`${apiBaseUrl}/${book.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: book.title,
            author: book.author,
        }),
    }).then((resp) => resp.json() as unknown as Book);

export default {
    getAllBooks,
    deleteBookById,
    addBook,
    updateBook
};
