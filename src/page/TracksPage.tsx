import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ProgressSpinner } from "@/component/ProgressSpinner";
import { ListTracks } from "@/component/ListTracks";

import { TopBarActions } from "@/component/app-bar/TopBarActions";
import { bookByIdState, bookListState } from "../state/book-list";
import BookApi from "../api/book";

type Props = {
    bookId: string;
};

export const TracksPage: React.FC<Props> = ({ bookId }): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false);
    const setBook = useSetRecoilState(bookListState);
    const book = useRecoilValue(bookByIdState(bookId));
    if (!book) {
        return <div>book not found</div>;
    }

    useEffect(() => {
        if (!book.tracks) {
            setLoading(true);
            BookApi.readBookTracks(book.id).then((tracks) => {
                setBook((old) =>
                    old.map((oBook) => {
                        if (oBook.id === book.id) {
                            return {
                                ...oBook,
                                tracks,
                            };
                        } else {
                            return oBook;
                        }
                    })
                );
                setLoading(false); // TODO: handle error
            });
        }
    }, []);

    return (
        <div>
            <TopBarActions title="Itinéraire" backPath={`/detail/${bookId}`} />
            <main>
                <Container maxWidth="sm">
                    {loading ? (
                        <ProgressSpinner message="Recherche du Ticket..." />
                    ) : (
                        <ListTracks tracks={book.tracks} />
                    )}
                </Container>
            </main>
        </div>
    );
};
