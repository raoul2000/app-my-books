import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";
import { useSnackbar } from "notistack";
import { useLocation } from "wouter";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { TopBarActions } from "@/component/app-bar/TopBarActions";
import { Book, TravelTicket } from "@/types";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookByIdState, bookListState } from "../state/book-list";
import BookApi from "../api/book";
import { TicketView } from "@/component/TicketView";
import { TicketHelp } from "@/component/TicketHelp";
import { ProgressSpinner } from "@/component/ProgressSpinner";

type Props = {
    book: Book;
    onCreateTicket: () => void
};

export const TicketNotFoundView: React.FC<Props> = ({book, onCreateTicket}):JSX.Element => {

    return (
        <>
        <TicketHelp />
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
    </>
    );
}