import { TravelTicket } from "../../types";
import { handleErrorJson } from "./response-handler";
import { apiBaseUrl, HEADER_NAME_API_KEY, getApiKey } from "./conf";
import { validateTicketType } from "./schema";
import { API_Ticket } from "./types";

export const readBookTicket = (bookId: string): Promise<TravelTicket> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/ticket",
            id: bookId,
        })}`,
        {
            headers: { [HEADER_NAME_API_KEY]: getApiKey() },
        }
    )
        .then(handleErrorJson)
        .then((jsonResp) => {
            if (!validateTicketType(jsonResp)) {
                console.error(validateTicketType.errors);
                throw new Error("data validation error");
            }
            const ticket = jsonResp as unknown as API_Ticket;
            return {
                id: ticket.id,
                departureDateTime: new Date(Date.parse(ticket.departure_at)),
                from: ticket.from,
                checkpointUrl: ticket.checkpoint_url,
                ...(ticket.qrcode_url && { qrCodeUrl: ticket.qrcode_url }),
            };
        });
