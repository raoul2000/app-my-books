import { Book } from "../../types";
import { handleErrorJson } from "./response-handler";
import { apiBaseUrl, HEADER_NAME_API_KEY, getApiKey } from "./conf";

type API_addBooks = {
    book: {
        id: string;
        title: string;
        author?: string;
        isbn?: string
    }
    userBook: {
        read_status? : number
    }
};

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
                book : {
                    title: book.title,
                    author: book.author,
                    isbn: book.isbn
                },
                userBook : {
                    read_status: book.readStatus
                }
            }),
        }
    )
        .then(handleErrorJson)
        .then((jsonResponse) => {
            const resp = jsonResponse as unknown as API_addBooks;
            return {
                id: resp.book.id,
                title: resp.book.title,
                author: resp.book.author,
                isbn: resp.book.isbn,
                readStatus: resp.userBook.read_status
            }
        });
