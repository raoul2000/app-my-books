import { Book, TravelTicket } from "../../types";
import { handleErrorJson } from "./response-handler";
import { apiBaseUrl, HEADER_NAME_API_KEY, getApiKey } from "./conf";

type API_CreateBookTicket = {
    id: string;
    book_id: string;
    created_at: string;
    updated_at: string;
};

export const createBookTicket = (bookId:string, ticket:TravelTicket ): Promise<TravelTicket> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/ticket/create",
            id: bookId
        })}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                [HEADER_NAME_API_KEY]: getApiKey(),
            },
            body: JSON.stringify({
                departureDate : 'DUMMY'
            }),
        }
    )
        .then(handleErrorJson)
        .then((jsonResponse) => {
            const resp = jsonResponse as unknown as API_CreateBookTicket;
            return {
                id: resp.id,
                departureDate: new Date(),
                departureTime: new Date(),
                from: "DUMMY LOCATION"
            };
        });
