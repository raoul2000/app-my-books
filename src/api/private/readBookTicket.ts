import { Book, TravelTicket } from "../../types";
import { handleErrorJson } from "./response-handler";
import { apiBaseUrl, HEADER_NAME_API_KEY, getApiKey } from "./conf";

type API_ReadTicket = {
    id: string;
};

export const readBookTicket = (book: Book): Promise<TravelTicket> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/ticket",
            id: book.id,
        })}`,
        {
            headers: { [HEADER_NAME_API_KEY]: getApiKey() },
        }
    )
        .then(handleErrorJson)
        .then((jsonResp) => {
            const ticket = jsonResp as unknown as API_ReadTicket;
            return {
                id: ticket.id,
                departureDate: new Date(),
                departureTime: new Date(),
                from: "location",
            };
        });
