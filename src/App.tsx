import React, { useEffect, useState } from "react";
import "./App.less";
import "@fontsource/roboto";

import { useSetRecoilState } from "recoil";

import { booksState } from "./state/books";
import BookApi from "./api/book";
import { WithNavigation } from "./component/WithNavigation";

function App() {
    const setBooks = useSetRecoilState(booksState);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();

    useEffect(() => {
        BookApi.getAllBooks()
            .then(setBooks)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    const renderMain = () => {
        if (error) {
            return <div>Error when loading book list</div>;
        } else if (loading) {
            return <div>loading books...</div>;
        } else {
            return <WithNavigation />;
        }
    };
    
    return <div className="App">{renderMain()}</div>;
}
export default App;
