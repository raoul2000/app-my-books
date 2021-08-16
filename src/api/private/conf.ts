import Storage from "@/utils/storage";

export const apiBaseUrl = import.meta.env.VITE_BOOK_API_BASE_URL;
export const HEADER_NAME_API_KEY = "X-Api-Key";
export const getApiKey = () => Storage.getApiKey() || "";