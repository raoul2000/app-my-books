import React from 'react';
import { Link } from "wouter"

type Props = {
    id: string;
};

export const BookDetailsPage: React.FC<Props> = ({id}):JSX.Element => {
    
    return (
        <div className="detail-book">
            <Link href="/" className="active">&lt; home</Link>
            <ul>
                <li>ID : {id}</li>
                <li>Title : {id}</li>
                <li>Author : {id}</li>
            </ul>
        </div>
    );
}