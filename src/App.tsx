import React from "react";
import "./App.less";
import { Route, Switch } from "wouter";
import { BookListPage } from "./page/BookListPage";
import { BookDetailsPage } from "./page/BookDetailsPage";
import { AboutPage } from "./page/AboutPage";
import { AddBookPage } from "./page/AddBookPage";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/about" component={AboutPage} />
                <Route path="/add" component={AddBookPage} />
                <Route path="/detail/:id">
                    {(params) => <BookDetailsPage id={params.id} />}
                </Route>
                <Route>
                    <BookListPage />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
