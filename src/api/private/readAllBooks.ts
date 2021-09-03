import { Book } from "../../types";
import { handleErrorJson } from "./response-handler";
import { apiBaseUrl, HEADER_NAME_API_KEY, getApiKey } from "./conf";

type API_GetUserBooks = {
    book_id: string;
    read_status?: number;
    rate?:number;
    book: {
        id: string;
        title: string;
        subtitle?: string;
        author?: string;
        isbn?: string;
        is_traveling:number;
        ping_count:number;
    };
};

export const readAllBooks = (): Promise<Book[]> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/user-book",
            expand: "book",
        })}`,
        {
            headers: { [HEADER_NAME_API_KEY]: getApiKey() },
        }
    )
        .then(handleErrorJson)
        .then((jsonResp) => {
            return (jsonResp as unknown as API_GetUserBooks[]).map((item) => ({
                ...item.book,
                isTraveling: item.book.is_traveling === 1,
                readStatus: item.read_status,
                rate: item.rate,
                isTicketLoaded:false,
                pingCount: item.book.ping_count
            }));
        });
