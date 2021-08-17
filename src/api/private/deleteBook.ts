import { Book } from "../../types";
import { handleErrorNoResponse } from "./response-handler";
import { apiBaseUrl, HEADER_NAME_API_KEY, getApiKey } from "./conf";

export const deleteBook = (book: Book): Promise<boolean> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/user-book/delete",
            id: book.id,
        })}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                [HEADER_NAME_API_KEY]: getApiKey(),
            },
        }
    ).then(handleErrorNoResponse);
