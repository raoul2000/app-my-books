import { BookResult } from "../../types";
import { handleErrorJson } from "./response-handler";
import { apiBaseUrl, HEADER_NAME_API_KEY, getApiKey } from "./conf";
import { validateIsbnSearchResultType } from "./schema";
import { API_ISBN_SearchResult } from "./types";

export const searchBookByISBN = (isbn: string): Promise<BookResult> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/isbn-service/search",
            isbn,
        })}`,
        {
            headers: { [HEADER_NAME_API_KEY]: getApiKey() },
        }
    )
        .then(handleErrorJson)
        .then((jsonResponse) => {
            if(!validateIsbnSearchResultType(jsonResponse)) {
                console.error(validateIsbnSearchResultType.errors);
                throw new Error('data validation error');
            }
            return jsonResponse as unknown as API_ISBN_SearchResult;
        });
