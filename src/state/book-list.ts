import { atom, selectorFamily } from "recoil";
import { Book } from "../types";

export const bookListState = atom<Book[]>({
    key: 'bookListState',
    default: []
});

export const bookByIdState = selectorFamily<Book | undefined, string>({
    key: 'bookByIdState',
    get: (bookId:string) => ({get}) => {
        const books = get(bookListState);
        return books.find( (book) => book.id === bookId);
    }
});