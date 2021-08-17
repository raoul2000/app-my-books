import { Book } from "../../types";
import { handleErrorJson } from "./response-handler";
import { apiBaseUrl, HEADER_NAME_API_KEY, getApiKey } from "./conf";

export const updateBook = (book: Book): Promise<boolean> =>
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
                book: {
                    title: book.title,
                    subtitle: book.subtitle,
                    author: book.author,
                    isbn: book.isbn,
                },
                userBook: {
                    read_status: book.readStatus,
                    rate: book.rate
                },
            }),
        }
    )
        .then(handleErrorJson)
        .then((resp) => true);
