import { Book } from "../../types";
import { handleErrorJson } from "./response-handler";
import { apiBaseUrl, HEADER_NAME_API_KEY, getApiKey } from "./conf";
import { validateUserBookListType } from "./schema";
import {API_UserBook} from './types';

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
            if (!validateUserBookListType(jsonResp)) {
                console.log(validateUserBookListType.errors);
                throw new Error('data validation error');
            }

            return (jsonResp as unknown as API_UserBook[]).map<Book>((item) => ({
                ...item.book,
                isTraveling: item.book.is_traveling === 1,
                readStatus: item.read_status,
                readAt:
                    item.read_at && item.read_at.length > 0
                        ? new Date(item.read_at)
                        : undefined,                
                rate: item.rate,
                isTicketLoaded: false,
                pingCount: item.book.ping_count,
            }));
        });
