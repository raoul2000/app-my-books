import React from "react";
import bookIconUrl from '../asset/book-icon.png';

export const Header: React.FC<{}> = (): JSX.Element => {
    return (
        <header>
            <img src={bookIconUrl}/>
            <h2>My Books</h2>
        </header>
    )
};
