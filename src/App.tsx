import React, { useEffect } from "react";
import "./App.less";
import { Route, Switch } from "wouter";
import { BookListPage } from "./page/BookListPage";
import { BookDetailsPage } from "./page/BookDetailsPage";
import { AboutPage } from "./page/AboutPage";
import { AddBookPage } from "./page/AddBookPage";
import { useRecoilState, useSetRecoilState } from "recoil";
import { booksState } from "./state/books";
import { booksData } from "./bookData";
import { UpdateBookPage } from "./page/UpdateBookPage";
import { Header } from "./component/Header";
import { loadingState } from "./state/loading";

function App() {
    const [, setBooks] = useRecoilState(booksState);
    const [loading, setLoading] = useRecoilState(loadingState);

    useEffect(() => {
        setLoading({ isLoading: true, infoMessage: "loading Book List ..." });
        // simulate API call to fetch book list
        setTimeout(() => {
            console.log(booksData);
            setBooks(booksData);
            setLoading({ isLoading: false });
        }, 2000);
    }, []);

    return (
        <div className="App">
            <Header />
            {loading.isLoading ? (
                <div>loading books list ...</div>
            ) : (
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
            )}
        </div>
    );
}

export default App;
