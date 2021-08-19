import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { TopBarActions } from "@/component/app-bar/TopBarActions";
import { TicketForm } from "@/component/TicketForm";
import { TravelTicket } from "@/types";
import { useRecoilValue } from "recoil";
import {  bookByIdState } from "../state/book-list";

type Props = {
    /**
     * The book Id
     */
    id: string;
};

export const TravelPage: React.FC<Props> = ({ id }): JSX.Element => {
    const book = useRecoilValue(bookByIdState(id));
    if (!book) {
        return <div>book not found</div>;
    }
    const handleCreateTicket = (ticket:TravelTicket) => {
        console.log(ticket);
    };
    return (
        <div>
            <TopBarActions
                title="Ticket de Voyage"
                backPath={`/detail/fd3b79a1-a39b-4275-9fc1-0918671ade37`}
            />
            <main>
                <Container maxWidth="sm">
                    <TicketForm 
                        book={book}
                        onCreateTicket={handleCreateTicket}/>
                </Container>
            </main>
        </div>
    );
};
