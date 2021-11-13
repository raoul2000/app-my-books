import { TravelTicket } from "../../types";
import { handleErrorJson } from "./response-handler";
import { apiBaseUrl, HEADER_NAME_API_KEY, getApiKey } from "./conf";
import { validateBoardingType } from "./schema";
import { API_Boarding } from "./types";

export const boardingTicket = (bookId:string, ticket:TravelTicket ): Promise<TravelTicket> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/ticket/boarding",
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
        .then((jsonResp) => {
            if (!validateBoardingType(jsonResp)) {
                console.error(validateBoardingType.errors);
                throw new Error("data validation error");
            }
            const boarding = jsonResp as unknown as API_Boarding;
            return {
                id: boarding.ticket.id,
                departureDateTime: new Date(Date.parse(boarding.ticket.departure_at)),
                from: boarding.ticket.from,
                checkpointUrl: boarding.ticket.checkpoint_url,
                ...(boarding.ticket.qrcode_url && { qrCodeUrl: boarding.ticket.qrcode_url }),
            };
        });
