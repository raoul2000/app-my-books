import { LoginSuccessResponse, ApiKeyCheckResponse } from "../../types";
import { handleErrorJson, handleErrorNoResponse } from "./response-handler";
import { apiBaseUrl, HEADER_NAME_API_KEY, getApiKey } from "./conf";
import { readAllBooks } from "./readAllBooks";
import { updateBook } from "./updateBook";
import { addBook } from "./addBook";
import { searchBookByISBN } from "./searchBookByISBN";
import { deleteBook } from "./deleteBook";
import { readBookTicket } from "./readBookTicket";
import { createBookTicket } from "./createBookTicket";
import { deleteBookTicket } from "./deleteBookTicket";
import { boardingTicket } from "./boardingTicket";
import { readBookTracks } from "./readBookTracks";

export const login = (username: string, password: string): Promise<string> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/auth/login",
        })}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        }
    )
        .then(handleErrorJson)
        .then((successResponse) => {
            const loginSuccess =
                successResponse as unknown as LoginSuccessResponse;
            return loginSuccess.api_key || "";
        });

export const logout = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 100);
    });

export const checkApiKey = (apiKey: string) =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/auth/check-api-key",
            token: apiKey,
        })}`
    )
        .then(handleErrorJson)
        .then((successResponse) => {
            const apiKeyCheck =
                successResponse as unknown as ApiKeyCheckResponse;
            return apiKeyCheck.isValid;
        });

type API_BookDescr = {
    description: string;
};
export const fetchBookDescriptionByIsbn = (isbn: string): Promise<string> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/isbn-service/description",
            isbn,
        })}`,
        {
            headers: { [HEADER_NAME_API_KEY]: getApiKey() },
        }
    )
        .then(handleErrorJson)
        .then((successResponse) => {
            return (successResponse as unknown as API_BookDescr).description;
        });

export default {
    readAllBooks,
    deleteBook,
    addBook,
    updateBook,
    login,
    logout,
    checkApiKey,
    searchBookByISBN,
    fetchBookDescriptionByIsbn,
    readBookTicket,
    createBookTicket,
    deleteBookTicket,
    boardingTicket,
    readBookTracks
};
