import { BookTrack } from "../../types";
import { handleErrorJson } from "./response-handler";
import { apiBaseUrl, HEADER_NAME_API_KEY, getApiKey } from "./conf";
import { validateBookTrackType } from "./schema";
import { API_BookTrack } from "./types";

export const readBookTracks = (bookId: string): Promise<BookTrack[]> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/tracker",
            id: bookId,
        })}`,
        {
            headers: { [HEADER_NAME_API_KEY]: getApiKey() },
        }
    )
        .then(handleErrorJson)
        .then((jsonResp) => {
            if (!validateBookTrackType(jsonResp)) {
                console.error(validateBookTrackType.errors);
                throw new Error("data validation error");
            }
            const bookTrack = jsonResp as unknown as API_BookTrack;
            
            return bookTrack.track.map((trackItem) => ({
                id: trackItem.id,
                isBoarding: trackItem.is_boarding === 1,
                email: trackItem.email,
                rate: trackItem.rate,
                locationName: trackItem.location_name,
                text: trackItem.text,
                createdAt:  new Date(trackItem.created_at * 1000),
                updatedAt:  new Date(trackItem.updated_at * 1000)
            }));
        });
