import React, { useEffect } from "react";
import "./App.less";
import { Route, Switch } from "wouter";
import { BookListPage } from "./page/BookListPage";
import { BookDetailsPage } from "./page/BookDetailsPage";
import { AboutPage } from "./page/AboutPage";
import { AddBookPage } from "./page/AddBookPage";
import { useSetRecoilState } from "recoil";
import { booksState } from "./state/books";
import { UpdateBookPage } from "./page/UpdateBookPage";
import { Header } from "./component/Header";
import useFetch from "react-fetch-hook";
import { Book } from "./types";
import BookApi from './api/book';

function App() {
    const setBooks = useSetRecoilState(booksState);
    const { isLoading, data, error } = useFetch(BookApi.apiBaseUrl);

    useEffect(() => {
        if (!isLoading) {
            setBooks(data as Book[]);
        }
    }, [isLoading]);

    const renderMain = () => {
        if (error) {
            return <div>Eroor when loading book list</div>;
        } else if (isLoading) {
            return <div>loading books...</div>;
        } else {
            return (
                <Switch>
                    <Route path="/about" component={AboutPage} />
                    <Route path="/add" component={AddBookPage} />
                    <Route path="/update/:id">
                        {(params) => <UpdateBookPage id={params.id} />}
                    </Route>
                    <Route path="/detail/:id">
                        {(params) => <BookDetailsPage id={params.id} />}
                    </Route>
                    <Route>
                        <BookListPage />
                    </Route>
                </Switch>
            );
        }
    };
    return (
        <div className="App">
            <Header />
            {renderMain()}
        </div>
    );
}

export default App;
