import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import PrintIcon from "@material-ui/icons/Print";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import { Book, TravelTicket } from "@/types";
import { TicketHelp } from "@/component/TicketHelp";

const useStyles = makeStyles((theme) => ({
    boardingButton: {
        marginLeft: "auto",
    },

    ticketMainInfoContainer: {
        backgroundColor: "#fafafa",
        padding: "1em",
        border: "1px dashed black",
        marginBottom: "2em",
    },
    highlightField: {
        borderLeft: "2px solid #d8d8d8",
        paddingLeft: "1em",
    },
    hideOnPrint: {
        display: "flex",
    },
    cutHereText: {
        display: "none",
    },
    [`@media print`]: {
        hideOnPrint: {
            display: "none",
        },
        cutHereText: {
            display: "block",
            position: "relative",
            top: "-25px",
            fontSize: "10px",
            color: "grey",
        },
    },
}));

type Props = {
    ticket: TravelTicket;
    book: Book;
    onDeleteTicket: (ticket: TravelTicket) => void;
    onPreBoarding: (ticket: TravelTicket) => void;
};
export const TicketView: React.FC<Props> = ({
    ticket,
    book,
    onDeleteTicket,
    onPreBoarding,
}): JSX.Element => {
    const classes = useStyles();
    const handleDeleteTicket = () => onDeleteTicket(ticket);
    const handleBoarding = () => onPreBoarding(ticket);
    const handlePrintTicket = () => window.print();

    return (
        <>
            {book.isTraveling && (
                <Box marginBottom="2em">
                    <Alert severity="info">
                        Ticket Utilisé : ce livre voyage...
                    </Alert>
                </Box>
            )}
            <Card elevation={2}>
                <CardHeader
                    avatar={
                        <Avatar>
                            <FlightTakeoffIcon />
                        </Avatar>
                    }
                    title="Ticket De Voyage"
                    subheader={`réservation : ${ticket?.id}`}
                />
                <CardContent>
                    <Box className={classes.ticketMainInfoContainer}>
                        <Grid container spacing={1}>
                            <Grid item sm={6}>
                                {ticket?.qrCodeUrl && (
                                    <Box>
                                        <img
                                            src={ticket?.qrCodeUrl}
                                            alt="qr code"
                                        />
                                    </Box>
                                )}
                            </Grid>
                            <Grid item sm={6}>
                                <Typography
                                    color="textSecondary"
                                    variant="button"
                                >
                                    Numéro de Réservation
                                </Typography>
                                <Typography variant="h5" gutterBottom={true}>
                                    {ticket?.id}
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    variant="button"
                                >
                                    Checkpoint
                                </Typography>
                                <Typography variant="h5" gutterBottom={true}>
                                    https://ping.mariola.fr
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <div className={classes.cutHereText}>
                        découpez suivant les pointillés ou seulement le QR-code
                        - coller sur le livre
                    </div>
                    <Typography color="textSecondary" variant="button">
                        Passager
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        gutterBottom={true}
                        className={classes.highlightField}
                    >
                        <strong>{book?.title}</strong>
                        {book?.author && (
                            <>
                                <br />
                                {book.author}
                            </>
                        )}
                    </Typography>
                    <Typography color="textSecondary" variant="button">
                        Date Départ
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        gutterBottom={true}
                        className={classes.highlightField}
                    >
                        12/02/2021 à 12h45
                    </Typography>
                    <Typography color="textSecondary" variant="button">
                        Lieu de Départ
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        gutterBottom={true}
                        className={classes.highlightField}
                    >
                        Paris
                    </Typography>
                </CardContent>
                <CardActions disableSpacing className={classes.hideOnPrint}>
                    {!book.isTraveling && (
                        <>
                            <IconButton
                                aria-label="share"
                                onClick={handleDeleteTicket}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton
                                aria-label="share"
                                onClick={handlePrintTicket}
                            >
                                <PrintIcon />
                            </IconButton>
                            <Button
                                className={classes.boardingButton}
                                color="primary"
                                variant="contained"
                                size="small"
                                onClick={handleBoarding}
                            >
                                Embarquement
                            </Button>
                        </>
                    )}
                </CardActions>
            </Card>
            <TicketHelp />
        </>
    );
};
