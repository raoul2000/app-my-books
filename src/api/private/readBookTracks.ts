import { BookTrack } from "../../types";
import { handleErrorJson } from "./response-handler";
import { apiBaseUrl, HEADER_NAME_API_KEY, getApiKey } from "./conf";
import { validateBookTrackType } from "./schema";
import { API_BookTrack } from "./types";

type ResponseSuccess = {
    book: {
        id: string;
        title: string;
        subtitle?: string;
        author?: string;
        isbn?: string;
        is_traveling: number;
        ping_count: number;
    };
    track: Array<{
        id: string;
        book_id: string;
        email: string;
        rate: string;
        location_name: string;
        text: string;
    }>;
};

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
                email: trackItem.email,
                rate: trackItem.rate ? parseInt(trackItem.rate, 10) : 0,
                locationName: trackItem.location_name,
                text: trackItem.text,
            }));
        });
