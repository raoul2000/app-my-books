import { BookFormState } from "@/types";
import { atom } from "recoil";

export const bookFormState = atom<BookFormState>({
    key: 'bookForm',
    default: {
        title: '',
        author: '',
        validation: {
            title:true
        }
    }
});