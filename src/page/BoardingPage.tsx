import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { ProgressSpinner } from "@/component/ProgressSpinner";
import { useSnackbar } from "notistack";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useLocation } from "wouter";

import { TopBarActions } from "@/component/app-bar/TopBarActions";
import BookApi from "../api/book";
import { bookByIdState, bookListState } from "../state/book-list";
import { FormChecklist } from "@/component/form/FormChecklist";

type Props = {
    bookId: string;
};
export const BoardingPage: React.FC<Props> = ({ bookId }): JSX.Element => {
    const book = useRecoilValue(bookByIdState(bookId));
    const setBook = useSetRecoilState(bookListState);
    const { enqueueSnackbar } = useSnackbar();
    const [, setLocation] = useLocation();
    const [progress, setProgress] = useState<boolean>(false);

    if (!book || !book.ticket) {
        return <div>book not found</div>;
    }

    const handleBoarding = () => {
        if (book?.ticket) {
            setProgress(true);
            BookApi.boardingTicket(book.id, book.ticket)
                .then((updatedTicket) => {
                    setBook((curBookList) =>
                        curBookList.map((oBook) => {
                            if (oBook.id === book.id) {
                                return {
                                    ...oBook,
                                    ticket: updatedTicket,
                                };
                            } else {
                                return oBook;
                            }
                        })
                    );
                    enqueueSnackbar("Embarquement Terminé : Bon voyage !", {
                        variant: "success",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center",
                        },
                    });
                    setLocation(`/travel/${book.id}`);
                })
                .catch(console.error);
        }
    };

    return (
        <div>
            <TopBarActions
                title="Embarquement"
                backPath={`/travel/${book.id}`}
            />
            <main>
                <Container maxWidth="sm">
                    {progress ? (
                        <ProgressSpinner message="Fin d'embarquement..." />
                    ) : (
                        <FormChecklist
                            bookingId={book.ticket.id}
                            checkpoint="https://ping.mariola.fr"
                            onConfirm={handleBoarding}
                        />
                    )}
                </Container>
            </main>
        </div>
    );
};
