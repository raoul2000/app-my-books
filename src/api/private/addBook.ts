import { Book } from "../../types";
import { handleErrorJson } from "./response-handler";
import { apiBaseUrl, HEADER_NAME_API_KEY, getApiKey } from "./conf";
import { validateUserBookType } from "./schema";
import { API_UserBook } from "./types";

export const addBook = (book: Omit<Book, "id">): Promise<Book> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/user-book/create",
            expand: "book"
        })}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                [HEADER_NAME_API_KEY]: getApiKey(),
            },
            body: JSON.stringify({
                book: {
                    title: book.title,
                    subtitle: book.subtitle,
                    author: book.author,
                    isbn: book.isbn,
                },
                userBook: {
                    read_status: book.readStatus,
                    read_at: book.readAt && book.readAt.toISOString().split('T')[0],
                    rate: book.rate,
                },
            }),
        }
    )
        .then(handleErrorJson)
        .then((jsonResponse) => {
            if (!validateUserBookType(jsonResponse)) {
                console.error(validateUserBookType.errors);
                throw new Error("data validation error");
            }

            const resp = jsonResponse as unknown as API_UserBook;

            return {
                ...resp.book,
                isTraveling: resp.book.is_traveling === 1,
                readStatus: resp.read_status,
                readAt:
                    resp.read_at && resp.read_at.length > 0
                        ? new Date(resp.read_at)
                        : undefined,
                rate: resp.rate,
                isTicketLoaded: false,
                pingCount: resp.book.ping_count,
            };
        });
