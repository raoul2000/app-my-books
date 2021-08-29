import { Book } from "../../types";
import { handleErrorJson } from "./response-handler";
import { apiBaseUrl, HEADER_NAME_API_KEY, getApiKey } from "./conf";

type API_addBooks = {
    book: {
        id: string;
        title: string;
        subtitle?: string;
        author?: string;
        isbn?: string;
        is_traveling:boolean;
        ping_count: number;
    }
    userBook: {
        read_status? : number
        rate?: number
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
                    subtitle: book.subtitle,
                    author: book.author,
                    isbn: book.isbn
                },
                userBook : {
                    read_status: book.readStatus,
                    rate: book.rate
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
                subtitle: resp.book.subtitle,
                author: resp.book.author,
                isbn: resp.book.isbn,
                isTraveling: resp.book.is_traveling,
                isTicketLoaded:false,
                readStatus: resp.userBook.read_status,
                rate:resp.userBook.rate,
                tracks: [],
                pingCount: resp.book.ping_count
            }
        });
