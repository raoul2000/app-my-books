import { atom } from "recoil";
import { Book } from "../types";

export const booksState = atom<Book[]>({
    key: 'books',
    default: []
});