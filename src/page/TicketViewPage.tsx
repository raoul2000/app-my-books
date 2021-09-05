import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { useSnackbar } from "notistack";
import { useLocation } from "wouter";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { TopBarActions } from "@/component/app-bar/TopBarActions";
import { bookByIdState, bookListState } from "../state/book-list";
import BookApi from "../api/book";
import { TicketView } from "@/component/TicketView";
import { ProgressSpinner } from "@/component/ProgressSpinner";
import { TicketNotFoundView } from "@/component/TicketNotFoundView";

type Props = {
    bookId: string;
};

export const TicketViewPage: React.FC<Props> = ({ bookId }): JSX.Element => {
    const { enqueueSnackbar } = useSnackbar();
    const setBook = useSetRecoilState(bookListState);
    const book = useRecoilValue(bookByIdState(bookId));
    const [, setLocation] = useLocation();
    const [status, setStatus] = useState<
        "loading" | "ticket_not_found" | "ticket_deleting" | "ticket_ready"
    >("loading");

    if (!book) {
        return <div>book not found</div>;
    }
    useEffect(() => {
        if (!book.isTicketLoaded) {
            BookApi.readBookTicket(book.id)
                .then((newTicket) => {
                    setBook((old) =>
                        old.map((oBook) => {
                            if (oBook.id === book.id) {
                                return {
                                    ...oBook,
                                    isTicketLoaded: true,
                                    ticket: newTicket,
                                };
                            } else {
                                return oBook;
                            }
                        })
                    );
                    setStatus("ticket_ready");
                })
                .catch((error) => {
                    if (error.status === 404) {
                        setBook((old) =>
                            old.map((oBook) => {
                                if (oBook.id === book.id) {
                                    return {
                                        ...oBook,
                                        isTicketLoaded: true,
                                    };
                                } else {
                                    return oBook;
                                }
                            })
                        );
                        setStatus("ticket_not_found");
                    }
                });
        } else {
            setStatus(book.ticket ? "ticket_ready" : "ticket_not_found");
        }
    }, []);

    const handleDeleteTicket = () => {
        if (book && confirm("Etes-vous sûr de vouloir effacer ce ticket ?")) {
            // TODO: ticket MUST NOT be used
            setStatus("ticket_deleting");
            BookApi.deleteBookTicket(book)
                .then(() => {
                    setBook((old) =>
                        old.map((oBook) => {
                            if (oBook.id === book.id) {
                                return {
                                    ...oBook,
                                    ticket: undefined,
                                };
                            } else {
                                return oBook;
                            }
                        })
                    );
                    enqueueSnackbar("Ticket supprimé", {
                        variant: "success",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center",
                        },
                    });
                    setStatus("ticket_not_found");
                })
                .catch(console.error);
        }
    };

    const renderContent = () => {
        switch (status) {
            case "loading":
                return <ProgressSpinner message="Recherche du Ticket..." />;
            case "ticket_deleting":
                return <ProgressSpinner message="Suppression du Ticket ..." />;
            case "ticket_not_found":
                return (
                    <TicketNotFoundView
                        book={book}
                        onCreateTicket={() =>
                            setLocation(`/ticket-edit/${book.id}`)
                        }
                    />
                );
            case "ticket_ready":
                return book.ticket ? (
                    <TicketView
                        ticket={book.ticket}
                        book={book}
                        onDeleteTicket={handleDeleteTicket}
                        onPreBoarding={() =>
                            setLocation(`/boarding/${book.id}`)
                        }
                    />
                ) : (
                    <div>ticket not found</div>
                );
            default:
                return <div></div>;
        }
    };
    return (
        <div>
            <TopBarActions
                title="Livre en Voyage"
                backPath={`/detail/${book.id}`}
            />
            <main>
                <Container maxWidth="sm">{renderContent()}</Container>
            </main>
        </div>
    );
};
