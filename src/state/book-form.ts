import { atom } from "recoil";
import { BookFormState } from "@/types";

export const bookFormState = atom<BookFormState>({
    key: 'bookForm',
    default: {
        title: '',
        author: '',
        isbn: '',
        validation: {
            title:true
        },
        isbnSearch: 'success',
        isTraveling: false
    }
});