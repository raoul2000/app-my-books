import { Book } from "../../types";

const apiBaseUrl = 'http://localhost:3001/books';

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
    }).then((resp) => resp.json() as unknown as Book);;
