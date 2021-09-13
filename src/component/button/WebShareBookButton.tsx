import React from "react";

import { Book } from "@/types";
import { WebShareButton } from "./WebShareButton";

type Props = {
    book: Book;
};

export const WebShareBookButton: React.FC<Props> = ({ book }): JSX.Element => {
    let text = book.title + "\n";
    if (book.subtitle) {
        text += book.subtitle + "\n";
    }
    if (book.author) {
        text += `par ${book.author}\n`;
    }
    
    return (
        <WebShareButton
            config={{
                params: {
                    title: book.title,
                    text,
                    url: `https://www.google.com/search?q=${book.title}+${book.author}`,
                    // TODO: add a book url
                },
                /* tslint:disable-next-line:no-console */
                onShareSuccess: () => console.log("Success"),
                /* tslint:disable-next-line:no-console */
                onShareError: (error: Error) => console.log("error", error),
            }}
        />
    );
};
