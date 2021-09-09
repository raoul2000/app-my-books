import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import { Book, TravelTicket, createTravelTicket } from "@/types";
import { debug } from "console";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
        },
        button: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        actionsContainer: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        resetContainer: {
            padding: theme.spacing(3),
        },
        cardContainer: {
            marginTop: "2em",
            marginBottom: "2em",
        },
        title: {
            fontWeight: "bold",
        },
        subtitle: {
            fontSize: "1em",
        },
    })
);

type Props = {
    book: Book;
    onCreateTicket: (ticket: TravelTicket) => void;
};

export const FormTicket: React.FC<Props> = ({
    book,
    onCreateTicket,
}): JSX.Element => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [departureDate, setDepartureDate] = useState<Date>(new Date());
    const [departureTime, setDepartureTime] = useState<Date>(new Date());
    const [from, setFrom] = useState<string>("");

    const steps = ["Nom du Voyageur", "Date de Départ", "Lieu de Départ"];

    const handleNext = () =>
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const handleBack = () =>
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const handleReset = () => setActiveStep(0);
    const handleCreateTicket = () => {
        const ticket = createTravelTicket();
        ticket.departureDateTime = new Date(departureDate);
        ticket.departureDateTime.setHours(departureTime.getHours());
        ticket.departureDateTime.setMinutes(departureTime.getMinutes());
        ticket.from = from;
        onCreateTicket(ticket);
    };

    // TODO: validate form to prevent going to next step

    const handleDateChange = (
        date: Date | null,
        value?: string | null | undefined
    ) => {
        if (date && !isNaN(date.getTime())) {
            setDepartureDate(date);
        }
    };
    const handleTimeChange = (
        date: Date | null,
        value?: string | null | undefined
    ) => {
        if (date && !isNaN(date.getTime())) {
            setDepartureTime(date);
        }
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <Typography>
                            Vérifiez que les informations suivantes sont
                            correctes :
                        </Typography>
                        <Card
                            variant="outlined"
                            className={classes.cardContainer}
                        >
                            <CardContent>
                                <Typography className={classes.title}>
                                    {book.title}
                                </Typography>
                                {book.subtitle && (
                                    <Typography className={classes.subtitle}>
                                        {book.subtitle}
                                    </Typography>
                                )}
                                {book.author && (
                                    <Typography color="textSecondary">
                                        {book.author}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </>
                );
            case 1:
                // TODO: allow geolocation via device if user accepts it
                return (
                    <>
                        <Typography>
                            Entrez la date à laquelle le livre sera déposé pour
                            débuter son voyage.
                        </Typography>
                        <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={frLocale}
                        >
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date de départ"
                                format="dd/MM/yyyy"
                                onChange={handleDateChange}
                                value={departureDate}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                                fullWidth
                                required
                            />
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Heure de départ"
                                value={departureTime}
                                ampm={false}
                                onChange={handleTimeChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change time",
                                }}
                                fullWidth
                                required
                            />
                        </MuiPickersUtilsProvider>
                    </>
                );
            case 2:
                return (
                    <>
                        <Typography>
                            Entrez le lieu où le livre sera déposé pour débuter
                            son voyage.
                        </Typography>

                        <TextField
                            id="departure-location"
                            label="Lieu de départ"
                            margin="normal"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            fullWidth
                            required
                        />
                    </>
                );

            default:
                return <Typography></Typography>;
        }
    };

    return (
        <div className={classes.root}>
            {activeStep === steps.length ? (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>
                        <CheckCircleOutlineRoundedIcon /> Vous avez complété les
                        étapes :{" "}
                    </Typography>
                    <Typography component="div">
                        <ul>
                            <li>
                                Livre voyageur : <strong>{book.title}</strong>
                            </li>
                            <li>
                                Date de départ :
                                {departureDate.toLocaleDateString()} à{" "}
                                {departureTime
                                    .toLocaleTimeString()
                                    .replace(/:..$/, "")}
                            </li>
                            <li>Lieu de Départ : Paris</li>
                        </ul>
                    </Typography>
                    <Typography>
                        Si Les informations saisies sont exactes, vous pouvez
                        maintenant créer le ticket de voyage.
                    </Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Recommencer
                    </Button>
                    <Button
                        onClick={handleCreateTicket}
                        className={classes.button}
                        variant="contained"
                        color="primary"
                    >
                        Créer Ticket
                    </Button>
                </Paper>
            ) : (
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                {getStepContent(index)}
                                <div className={classes.actionsContainer}>
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            Précédent
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1
                                                ? "Terminer"
                                                : "Suivant"}
                                        </Button>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            )}
        </div>
    );
};
