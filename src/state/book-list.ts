import { atom, selector, selectorFamily } from "recoil";
import { Book } from "@/types";

// Book List //////////////////////////////////////////////////////////////////////////////////

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


// Book List filter /////////////////////////////////////////////////////////////////////////////

export type BookListFilter = {
    input: string;
    visible: boolean;
};

export const bookListFilterState = atom<BookListFilter>({
    key: 'bookListFilterState',
    default: {
        input: "",
        visible: false
    }
});

export const filteredBookListState = selector<Book[]>({
    key: 'filteredBookListState',
    get: ({get}) => {
        const filter = get(bookListFilterState);
        const bookList = get(bookListState);
        if(!filter.input || filter.input.length < 3) {
            return bookList;
        } else {
            const rx = new RegExp(filter.input, "i")
            return bookList.filter((item) => `${item.title} ${item.author}`.search(rx) !== -1);
        }
    }
})
