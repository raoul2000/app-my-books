import React, { useState } from "react";
import "./App.less";
import { BookDetails } from "./component/BookDetails";
import { FormAddBook } from "./component/FormAddBook";
import { Header } from "./component/Header";
import { ListBooks } from "./component/ListBooks";
import { Toolbar } from "./component/Toolbar";
import { Book } from "./types";

let booksData: Book[] = [
    { id: "1", title: "book1", author: " author 1" },
    { id: "2", title: "book2", author: " author 2" },
    { id: "3", title: "book3", author: " author 3" },
    { id: "4", title: "book4", author: " author 4" },
    { id: "5", title: "book5", author: " author 5" },
    { id: "6", title: "book6", author: " author 6" },
    { id: "7", title: "book7", author: " author 7" }
];

function App() {
    const [listOfBooks, setListOfBooks] = useState<Book[]>(booksData);

    const [bookToShow, setBookToShow] = useState<Book | null>();
    const [actionAddBook, setActionAddBook] = useState<boolean>(false);

    const handleDeleteBookById = (bookId: string): void => {
      setListOfBooks(listOfBooks.filter(book => book.id !== bookId));
    };

    const handleUpdateBookById = (bookId: string): void => {
        alert('not implemented');
    }

    return (
        <div className="App">
            <Header />
            {!actionAddBook ? (
                <>
                    <Toolbar onAddBook={() => setActionAddBook(true)} />
                    <ListBooks
                        books={listOfBooks}
                        onViewBookDetails={setBookToShow}
                        onDeleteBookById={handleDeleteBookById}
                        onUpdateBookById={handleUpdateBookById}
                    />
                    {bookToShow && (
                        <BookDetails
                            book={bookToShow}
                            onHide={() => setBookToShow(null)}
                        />
                    )}
                </>
            ) : (
                <FormAddBook
                    onCancel={() => setActionAddBook(false)}
                    onSubmit={(book) => listOfBooks.push(book)}
                />
            )}
        </div>
    );
}

export default App;
