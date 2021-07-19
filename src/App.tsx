import React, { useEffect, useState } from "react";
import "./App.less";
import "@fontsource/roboto";
import Container from "@material-ui/core/Container";

import { Route, Switch } from "wouter";
import { BookListPage } from "./page/BookListPage";
import { BookDetailsPage } from "./page/BookDetailsPage";
import { AboutPage } from "./page/AboutPage";
import { AddBookPage } from "./page/AddBookPage";
import { useSetRecoilState } from "recoil";
import { booksState } from "./state/books";
import { UpdateBookPage } from "./page/UpdateBookPage";
import BookApi from "./api/book";
import { SettingsPage } from "./page/SettingsPage";
import { TopBar } from "./component/TopBar";



function App() {

    const setBooks = useSetRecoilState(booksState);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();

    useEffect(() => {
        BookApi.getAllBooks()
            .then(setBooks)
            .then(() => setLoading(false))
            .catch(setError);
    }, []);

    const renderMain = () => {
        if (error) {
            return <div>Eroor when loading book list</div>;
        } else if (loading) {
            return <div>loading books...</div>;
        } else {
            return (
                <Switch>
                    <Route path="/about" component={AboutPage} />
                    <Route path="/add" component={AddBookPage} />
                    <Route path="/settings" component={SettingsPage} />
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
            <TopBar/>
            <main>
                <Container maxWidth="sm">{renderMain()}</Container>
            </main>
        </div>
    );
}

export default App;
