import React from "react";
import Button from "@mui/material/Button";

import { TicketHelp } from "@/component/TicketHelp";

type Props = {
    onCreateTicket: () => void;
};

export const TicketNotFoundView: React.FC<Props> = ({
    onCreateTicket,
}): JSX.Element => {
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={onCreateTicket}
            >
                Créer Ticket
            </Button>
            <TicketHelp />
        </>
    );
};
