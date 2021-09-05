import { TravelTicket } from "../../types";
import { handleErrorJson } from "./response-handler";
import { apiBaseUrl, HEADER_NAME_API_KEY, getApiKey } from "./conf";
import { validateTicketType } from "./schema";
import { API_Ticket } from "./types";

export const createBookTicket = (
    bookId: string,
    ticketInfo: TravelTicket
): Promise<TravelTicket> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/ticket/create",
            id: bookId,
        })}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                [HEADER_NAME_API_KEY]: getApiKey(),
            },
            body: JSON.stringify({
                departureDate: "DUMMY",
            }),
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
                departureDate: new Date(),
                departureTime: new Date(),
                from: "DUMMY LOCATION",
                ...(ticket.qrcode_url && { qrCodeUrl: ticket.qrcode_url }),
            };
        });
