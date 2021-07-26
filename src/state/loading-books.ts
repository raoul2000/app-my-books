import { atom } from "recoil";
import { LoadingBooksState } from "../types";

export const loadingBooksState = atom<LoadingBooksState>({
    key: 'loadingBooks',
    default: {
        status: 'init',
        errorMessage: ''
    }
});