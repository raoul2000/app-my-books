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
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import clsx from "clsx";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import { TopBarActions } from "@/component/app-bar/TopBarActions";
import { TicketForm } from "@/component/TicketForm";
import { TravelTicket } from "@/types";
import { useRecoilValue } from "recoil";
import { bookByIdState } from "../state/book-list";
import BookApi from "../api/book";
import { useState } from "react";
import { Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { TicketView } from "@/component/TicketView";

const useStyles = makeStyles((theme) => ({
    ticketContainer: {
        padding: "1em",
    },
    createTicketButton: {
        width: "100%",
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    boardingButton: {
        marginLeft: "auto",
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    ticketMainInfoContainer: {
        backgroundColor: "#fafafa",
        padding: "1em",
        border: "1px dashed black",
        marginBottom: "2em",
    },
    checklistContainer: {
        padding: "1em",
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
    const [expanded, setExpanded] = useState(false);
    const [status, setStatus] = useState<
        | "loading"
        | "ticket_form"
        | "ticket_not_found"
        | "ticket_creating"
        | "ticket_deleting"
        | "ticket_ready"
        | "ticket_view"
        | "pre_boarding"
        | "boarding"
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

    const handleDeleteTicket = () => {
        if (book) {
            // TODO: ticket MUST NOT be used
            setStatus("ticket_deleting");
            BookApi.deleteBookTicket(book)
                .then(() => {
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
    const handleBoarding = () => {
        setStatus("boarding");
        if (ticket) {
            BookApi.boardingTicket(book.id, ticket)
                .then((updatedTicket) => {
                    setTicket(updatedTicket);
                    enqueueSnackbar("Embarquement Terminé : Bon voyage !", {
                        variant: "success",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center",
                        },
                    });
                    setStatus("ticket_ready");
                })
                .catch(console.error);
        }
    };

    const renderContent = () => {
        switch (status) {
            case "pre_boarding":
                return (
                    <Paper elevation={0} className={classes.checklistContainer}>
                        <Typography
                            variant="h5"
                            color="textSecondary"
                            gutterBottom={true}
                        >
                            Embarquement Immédiat
                        </Typography>
                        <FormControlLabel
                            control={<Switch />}
                            label={
                                <Typography
                                    color="textSecondary"
                                    gutterBottom={true}
                                >
                                    Le QR Code du ticket est collé sur la
                                    couverture du livre
                                </Typography>
                            }
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            control={<Switch />}
                            label="Le numéro de réservation est inscrit sur le livre "
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            control={<Switch />}
                            label="Le CHECKPOINT est inscrit sur le livre "
                            labelPlacement="start"
                        />
                        <Button variant="contained" onClick={handleBoarding}>
                            Checkin
                        </Button>
                    </Paper>
                );
            case "boarding":
                return (
                    <>
                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            gutterBottom={true}
                        >
                            <div>Embarquement en cours ...</div>
                        </Typography>
                        <Typography align="center">
                            <CircularProgress />
                        </Typography>
                    </>
                );
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
            case "ticket_deleting":
                return (
                    <>
                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            gutterBottom={true}
                        >
                            <div>Suppression du ticket ...</div>
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
                                    ou bien partir en voyage à la rencontre de
                                    nouveaux lecteurs.
                                    <br />
                                    Donnez-le à quelqu'un, déposez-le sur un
                                    banc public ou ailleurs, pour qu'il commence
                                    son voyage.
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
                        {ticket && (
                            <TicketView
                                ticket={ticket}
                                book={book}
                                onDeleteTicket={console.log}
                                onBoarding={console.log}
                            />
                        )}
                    </>
                );
            case "ticket_view":
                return (
                    <>
                        <Paper className={classes.ticketContainer}></Paper>
                    </>
                );
            default:
                return <div></div>;
        }
    };
    return (
        <div>
            <TopBarActions title="Livre en Voyage" backPath={`/detail/${id}`} />
            <main>
                <Container maxWidth="sm">{renderContent()}</Container>
            </main>
        </div>
    );
};
