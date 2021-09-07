import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { useSnackbar } from "notistack";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useLocation } from "wouter";

import { bookByIdState, bookListState } from "../state/book-list";
import { TopBarActions } from "@/component/app-bar/TopBarActions";
import { FormTicket } from "@/component/form/FormTicket";
import { TravelTicket } from "@/types";
import BookApi from "../api/book";
import { ProgressSpinner } from "@/component/ProgressSpinner";

type Props = {
    bookId: string;
};
export const TicketFormPage: React.FC<Props> = ({ bookId }): JSX.Element | null => {
    const [progress, setProgress] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();
    const book = useRecoilValue(bookByIdState(bookId));
    const setBook = useSetRecoilState(bookListState);
    const [, setLocation] = useLocation();

    if (!book) {
        setLocation('/');
        return null;
    }

    const handleCreateTicket = (ticketInfo: TravelTicket) => {
        setProgress(true);
        BookApi.createBookTicket(book.id, ticketInfo)
            .then((newTicket) => {
                setBook((old) => {
                    return old.map((oBook) => {
                        if (oBook.id === book.id) {
                            return {
                                ...oBook,
                                ticket: newTicket,
                            };
                        } else {
                            return oBook;
                        }
                    });
                });
                enqueueSnackbar("Ticket créé", {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center",
                    },
                });
                setLocation(`/travel/${book.id}`);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => setProgress(false));
    };

    return (
        <div>
            <TopBarActions title="Création Ticket" backPath={`/travel/${bookId}`} />
            <main>
                <Container maxWidth="sm">
                    {progress ? (
                        <ProgressSpinner message="Création du Ticket..." />
                    ) : (
                        <FormTicket
                            book={book}
                            onCreateTicket={handleCreateTicket}
                        />
                    )}
                </Container>
            </main>
        </div>
    );
};
