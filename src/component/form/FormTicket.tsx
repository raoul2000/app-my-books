import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TimePicker from "@mui/lab/TimePicker";

import TextField from "@mui/material/TextField";
import { Book, TravelTicket, createTravelTicket } from "@/types";

type Props = {
    book: Book;
    onCreateTicket: (ticket: TravelTicket) => void;
};
const steps = ["Nom du Voyageur", "Date de Départ", "Lieu de Départ"];

export const FormTicket: React.FC<Props> = ({
    book,
    onCreateTicket,
}): JSX.Element => {
    const [activeStep, setActiveStep] = useState(0);
    const [departureDate, setDepartureDate] = useState<Date>(new Date());
    const [departureDateError, setDepartureDateError] =
        useState<boolean>(false);

    const [departureTime, setDepartureTime] = useState<Date>(new Date());
    const [departureTimeError, setDepartureTimeError] =
        useState<boolean>(false);

    const [from, setFrom] = useState<string>("");
    const [fromError, setFromError] = useState<boolean>(false);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => {
            if (prevActiveStep == 2 && (fromError || !from)) {
                setFromError(true);
                return prevActiveStep;
            } else {
                return prevActiveStep + 1;
            }
        });
    };

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

    const handleDateChange = (
        date: Date | null,
        value?: string | null | undefined
    ) => {
        if (date && !isNaN(date.getTime())) {
            setDepartureDate(date);
            setDepartureDateError(false);
        } else {
            setDepartureDateError(true);
        }
    };
    const handleTimeChange = (
        date: Date | null,
        value?: string | null | undefined
    ) => {
        if (date && !isNaN(date.getTime())) {
            setDepartureTime(date);
            setDepartureTimeError(false);
        } else {
            setDepartureTimeError(true);
        }
    };
    const handleFromChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const val: string = e.target.value;
        setFrom(val);
        if (val && val.trim().length > 0) {
            setFromError(false);
        } else {
            setFromError(true);
        }
    };
    const disableNextButton = (step: number): boolean => {
        switch (step) {
            case 1:
                return departureDateError || departureTimeError;
            case 2:
                return fromError;
            default:
                return false;
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
                        >
                            <CardContent>
                                <Typography>
                                    {book.title}
                                </Typography>
                                {book.subtitle && (
                                    <Typography>
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
                            Entrez la date et l'heure à laquelle le livre sera
                            déposé pour débuter son voyage.
                        </Typography>

                        <LocalizationProvider
                            dateAdapter={DateAdapter}
                            locale={frLocale}
                        >
                            <MobileDatePicker
                                label="Date de départ"
                                inputFormat="dd/MM/yyyy"
                                value={departureDate}
                                onChange={handleDateChange}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                            <TimePicker
                                label="Heure de départ"
                                value={departureTime}
                                onChange={handleTimeChange}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                        </LocalizationProvider>
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
                            onChange={handleFromChange}
                            fullWidth
                            required
                            autoComplete="off"
                            error={fromError}
                        />
                    </>
                );
            default:
                return <Typography></Typography>;
        }
    };

    return (
        <Box sx={{ width: "100%"}}>
            {activeStep === steps.length ? (
                <Paper square elevation={0}>
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
                            <li>Lieu de Départ : {from}</li>
                        </ul>
                    </Typography>
                    <Typography>
                        Si Les informations saisies sont exactes, vous pouvez
                        maintenant créer le ticket de voyage.
                    </Typography>
                    <Button onClick={handleReset}>
                        Recommencer
                    </Button>
                    <Button
                        onClick={handleCreateTicket}
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
                                <div>
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                        >
                                            Précédent
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            disabled={disableNextButton(
                                                activeStep
                                            )}
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
        </Box>
    );
};

/*
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
                                autoComplete="off"
                                error={departureDateError}
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
                                autoComplete="off"
                                error={departureTimeError}
                            />
                        </MuiPickersUtilsProvider>
                        */
