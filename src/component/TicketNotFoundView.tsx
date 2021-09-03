import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";

import { Book } from "@/types";
import { TicketHelp } from "@/component/TicketHelp";

type Props = {
    book: Book;
    onCreateTicket: () => void;
};

export const TicketNotFoundView: React.FC<Props> = ({
    book,
    onCreateTicket,
}): JSX.Element => {
    return (
        <>
            <Card elevation={2}>
                <CardHeader
                    avatar={
                        <Avatar>
                            <CloseIcon />
                        </Avatar>
                    }
                    subheader="Aucun ticket pour ce livre"
                />
                <CardActions>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={onCreateTicket}
                    >
                        Créer Ticket
                    </Button>
                </CardActions>
            </Card>
            <TicketHelp />
        </>
    );
};
