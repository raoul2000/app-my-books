import { Book } from "../../types";
import { handleErrorJson } from "./response-handler";
import { apiBaseUrl, HEADER_NAME_API_KEY, getApiKey } from "./conf";
import { validateUserBookType } from "./schema";
import { API_UserBook } from "./types";

export const updateBook = (book: Book): Promise<Book> => {
    let payload:any = {
        userBook: {
            read_status: book.readStatus,
            rate: book.rate,
        }
    };
    // it is forbidden to update a traveling book (only useBook can be modified)
    if(!book.isTraveling) {
        payload.book = {
            title: book.title,
            subtitle: book.subtitle,
            author: book.author,
            isbn: book.isbn,
        };
    }
    return fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/user-book/update",
            id: book.id,
            expand: "book",
        })}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                [HEADER_NAME_API_KEY]: getApiKey(),
            },
            body: JSON.stringify(payload),
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
                rate: resp.rate,
                isTicketLoaded: false,
                pingCount: resp.book.ping_count,
            };
        });
};
