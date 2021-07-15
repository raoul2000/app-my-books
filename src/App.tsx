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
import useFetch from 'react-fetch-hook';
import { Book } from "./types";

function App() {
    const setBooks = useSetRecoilState(booksState);
    const {isLoading, data, error} = useFetch('http://localhost:3001/books');

    const [loading, setLoading] = useRecoilState(loadingState);

    useEffect(() => {
        if(!isLoading) {
            setBooks(data as Book[]);
        }
    },[isLoading])
    
    const renderMain = () => {
        if(error) {
            return <div>Eroor when loading book list</div>;
        } else if(isLoading) {
            return <div>loading books...</div>
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
            )
        } 
    }
    return (
        <div className="App">
            <Header />
            {renderMain()}
        </div>
    );
}

export default App;
