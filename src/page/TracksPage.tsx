import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { useRecoilValue, useSetRecoilState } from "recoil";
import IconButton from "@mui/material/IconButton";
import { useLocation } from "wouter";
import SyncIcon from "@mui/icons-material/Sync";
import { ProgressSpinner } from "@/component/ProgressSpinner";
import { ListTracks } from "@/component/ListTracks";
import { TopBarActions } from "@/component/app-bar/TopBarActions";
import { bookByIdState, bookListState } from "@/state/book-list";
import BookApi from "@/api/book";

type Props = {
    bookId: string;
};

export const TracksPage: React.FC<Props> = ({ bookId }): JSX.Element | null => {
    const [loading, setLoading] = useState<boolean>(false);
    const setBook = useSetRecoilState(bookListState);
    const book = useRecoilValue(bookByIdState(bookId));
    const [, setLocation] = useLocation();

    if (!book) {
        setLocation("/");
        return null;
    }

    const loadTracks = () => {
        setLoading(true);
        BookApi.readBookTracks(book.id).then((tracks) => {
            setBook((old) =>
                old.map((oBook) => {
                    if (oBook.id === book.id) {
                        return {
                            ...oBook,
                            pingCount: tracks.length - 1, //always one track is for boarding (is_boarding = 1)
                            tracks,
                        };
                    } else {
                        return oBook;
                    }
                })
            );
            setLoading(false); // TODO: handle error
        });
    };

    useEffect(() => {
        // TODO: Ticket may not be loaded when this component renders but component ListTracks
        // requires ticket to display departure datetime
        if (!book.tracks) {
            loadTracks();
        }
    }, []);

    return (
        <div>
            <TopBarActions
                title="Itinéraire"
                backPath={`/detail/${bookId}`}
                actions={
                    <IconButton
                        aria-label="refresh tracks"
                        color="inherit"
                        onClick={() => loadTracks()}
                        disabled={loading}
                    >
                        <SyncIcon />
                    </IconButton>
                }
            />
            <main>
                <Container maxWidth="sm">
                    {loading ? (
                        <ProgressSpinner message="Recherche de l'itinéraire ..." />
                    ) : (
                        <ListTracks tracks={book.tracks} ticket={book.ticket} />
                    )}
                </Container>
            </main>
        </div>
    );
};
