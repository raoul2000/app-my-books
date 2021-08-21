import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";
import { useSnackbar } from "notistack";

import { TopBarActions } from "@/component/app-bar/TopBarActions";
import { TicketForm } from "@/component/TicketForm";
import { TravelTicket } from "@/types";
import { useRecoilValue } from "recoil";
import { bookByIdState } from "../state/book-list";
import BookApi from "../api/book";
import { useState } from "react";
import { Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    ticketContainer: {
        padding: "1em",
    },
    createTicketButton: {
        width: "100%",
    },
}));

type Props = {
    /**
     * The book Id
     */
    id: string;
};

export const TravelPage: React.FC<Props> = ({ id }): JSX.Element => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const book = useRecoilValue(bookByIdState(id));
    const [ticket, setTicket] = useState<TravelTicket | undefined>();
    const [status, setStatus] = useState<
        | "loading"
        | "ticket_form"
        | "ticket_not_found"
        | "ticket_creating"
        | "ticket_ready"
        | "ticket_view"
    >("loading");

    if (!book) {
        return <div>book not found</div>;
    }
    useEffect(() => {
        if (book) {
            BookApi.readBookTicket(book)
                .then((newTicket) => {
                    console.log(newTicket);
                    setTicket(newTicket);
                    setStatus("ticket_ready");
                })
                .catch((error) => {
                    if (error.status === 404) {
                        setStatus("ticket_not_found");
                        /* enqueueSnackbar(
                            "Ticket introuvable : création d'un nouveau ticket",
                            {
                                variant: "info",
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "center",
                                },
                            }
                        ); */
                    }
                });
        }
    }, []);

    const handleCreateTicket = (ticketInfo: TravelTicket) => {
        console.log(ticketInfo);
        setStatus("ticket_creating");
        BookApi.createBookTicket(id, ticketInfo)
            .then((newTicket) => {
                console.log(newTicket);
                setTicket(newTicket);
                setStatus("ticket_ready");
                enqueueSnackbar("Ticket créé", {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center",
                    },
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const renderContent = () => {
        switch (status) {
            case "loading":
                return (
                    <>
                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            gutterBottom={true}
                        >
                            <div>Recherche du Ticket...</div>
                        </Typography>
                        <Typography align="center">
                            <CircularProgress />
                        </Typography>
                    </>
                );
            case "ticket_not_found":
                return (
                    <>
                        <Card elevation={0}>
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
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => setStatus("ticket_form")}
                                >
                                    Créer Ticket
                                </Button>
                            </CardActions>
                        </Card>
                        <Accordion elevation={0}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Comment ça marche ?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography paragraph={true}>
                                    Ce livre peut rester dans votre bibliothèque
                                    ou bien partir en voyage à la recherche de
                                    nouveaux lecteurs.
                                    <br />
                                    Donnez-le à quelqu'un, déposez-le sur un
                                    banc public etc. pour qu'il commence son
                                    voyage.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion elevation={0}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>
                                    Un ticket, pour quoi faire ?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography paragraph={true}>
                                    Pour voyager, ce livre a besoin d'un ticket.
                                    Chaque lecteur dont il croisera la route
                                    pourra grâce à ce ticket, signaler le
                                    passage de ce livre entre ses mains.
                                    <br />
                                    Vous pourrez voir ces signalements et ainsi{" "}
                                    suivre le voyage de ce livre .
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </>
                );
            case "ticket_creating":
                return (
                    <>
                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            gutterBottom={true}
                        >
                            Création du Ticket...
                        </Typography>
                        <Typography align="center">
                            <CircularProgress />
                        </Typography>
                    </>
                );
            case "ticket_form":
                return (
                    <TicketForm
                        book={book}
                        onCreateTicket={handleCreateTicket}
                    />
                );
            case "ticket_ready":
                return (
                    <>
                        <Card elevation={0}>
                            <CardHeader
                                avatar={
                                    <Avatar>
                                        <FlightTakeoffIcon />
                                    </Avatar>
                                }
                                title="Ticket De Voyage"
                                subheader={`réservation : ${ticket?.id}`}
                            />
                        </Card>
                    </>
                );
            case "ticket_view":
                return (
                    <>
                        <Paper className={classes.ticketContainer}>
                            {ticket?.qrCodeUrl && (
                                <Box textAlign="center">
                                    <img
                                        src={ticket?.qrCodeUrl}
                                        alt="qr code"
                                    />
                                </Box>
                            )}
                            <Typography color="textSecondary" variant="button">
                                Numéro de Réservation
                            </Typography>
                            <Typography variant="h5" gutterBottom={true}>
                                {ticket?.id}
                            </Typography>
                            <Typography color="textSecondary" variant="button">
                                Checkpoint
                            </Typography>
                            <Typography variant="h5" gutterBottom={true}>
                                https://ping.mariola.fr
                            </Typography>
                            <Typography color="textSecondary" variant="button">
                                Passager
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom={true}>
                                {book?.title}
                            </Typography>
                            <Typography color="textSecondary" variant="button">
                                Date Départ
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom={true}>
                                12/02/2021 à 12h45
                            </Typography>
                            <Typography color="textSecondary" variant="button">
                                Lieu de Départ
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom={true}>
                                Paris
                            </Typography>
                        </Paper>
                    </>
                );
            default:
                return <div></div>;
        }
    };
    return (
        <div>
            <TopBarActions
                title="Ticket de Voyage"
                backPath={`/detail/${id}`}
            />
            <main>
                <Container maxWidth="sm">{renderContent()}</Container>
            </main>
        </div>
    );
};
