import { Book } from "../../types";
import { nanoid } from "nanoid";

export const apiBaseUrl =
    "https://sheet.best/api/sheets/ec2f5fbe-35fc-4ecb-b221-5a14f8cdadb0";

export const deleteBookById = (id: string): Promise<Response> =>
    fetch(`${apiBaseUrl}/id/${id}`, {
        method: "DELETE",
    });

export const addBook = (book: Book): Promise<Book> =>
    fetch(apiBaseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...book, id: nanoid() }),
    })
        .then((resp) => resp.json())
        .then((jsonResp) => {
            // because sheet-best returns an array of books
            debugger;
            const books = jsonResp as unknown as Book[];
            return books[0];
        });

export const updateBook = (book: Book): Promise<Book> =>
    fetch(`${apiBaseUrl}/id/${book.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
    })
        .then((resp) => resp.json())
        .then((jsonResp) => {
            // because sheet-best returns an array of books
            const books = jsonResp as unknown as Book[];
            return books[0];
        });

export default {
    apiBaseUrl,
    deleteBookById,
    addBook,
    updateBook,
};
