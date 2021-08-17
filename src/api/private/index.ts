import { Book, LoginSuccessResponse, ApiKeyCheckResponse } from "../../types";
import { handleErrorJson, handleErrorNoResponse } from "./response-handler";
import { apiBaseUrl, HEADER_NAME_API_KEY, getApiKey } from "./conf";
import { getAllBooks } from "./getAllBooks";
import { updateBook } from "./updateBook";
import { addBook } from "./addBook";

export const deleteBookById = (id: string): Promise<boolean> =>
    fetch(
        `${apiBaseUrl}?${new URLSearchParams({
            r: "api/user-book/delete",
            id,
        })}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                [HEADER_NAME_API_KEY]: getApiKey(),
            },
        }
    ).then(handleErrorNoResponse);

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

export const fetchIsbnData = (isbn: string) =>
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
        .then((successResponse) => {
            return successResponse as unknown as Book;
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
    getAllBooks,
    deleteBookById,
    addBook,
    updateBook,
    login,
    logout,
    checkApiKey,
    fetchIsbnData,
    fetchBookDescriptionByIsbn
};
