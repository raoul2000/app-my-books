import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    checklistText: {
        marginRight: "2em",
    },
}));

type Checklist = {
    qrCodeOk: boolean;
    bookingNumberOk: boolean;
    checkpointOk: boolean;
};

type Props = {
    bookingId: string;
    checkpoint: string;
    onConfirm: () => void;
};

export const FormChecklist: React.FC<Props> = ({
    bookingId,
    checkpoint,
    onConfirm,
}): JSX.Element => {
    const classes = useStyles();
    const [checklist, setChecklist] = useState<Checklist>({
        qrCodeOk: false,
        bookingNumberOk: false,
        checkpointOk: false,
    });

    const handleBoarding = () => onConfirm();

    const toggleChecked = (check: keyof Checklist) => {
        setChecklist({
            ...checklist,
            [check]: !checklist[check],
        });
    };
    const isChecklistComplete = () =>
        checklist.qrCodeOk ||
        (checklist.bookingNumberOk && checklist.checkpointOk);

    return (
        <>
            <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                Une fois l'embarquement terminé le ticket n'est plus modifiable
            </Alert>
            <Paper elevation={0}>
                <List
                    subheader={
                        <ListSubheader>Checklist Embarquement</ListSubheader>
                    }
                >
                    <ListItem>
                        <ListItemText
                            id="switch-qrcode"
                            primary="Le QR-CODE du ticket est collé sur la
                                        couverture, à l'interieur du livre"
                            className={classes.checklistText}
                        />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                checked={checklist.qrCodeOk}
                                onChange={() => toggleChecked("qrCodeOk")}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            id="switch-booking-number"
                            primary="Le NUMERO DE RESERVATION est inscrit en évidence sur le livre"
                            secondary={`numéro de réservation : ${bookingId}`}
                        />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                checked={checklist.bookingNumberOk}
                                onChange={() =>
                                    toggleChecked("bookingNumberOk")
                                }
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            id="switch-checkpoint"
                            primary="Le CHECKPOINT est inscrit en évidence sur le livre"
                            secondary={`checkpoint : ${checkpoint}`}
                        />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                checked={checklist.checkpointOk}
                                onChange={() => toggleChecked("checkpointOk")}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>

                <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    onClick={handleBoarding}
                    disabled={!isChecklistComplete()}
                >
                    Terminer l'embarquement
                </Button>
            </Paper>
        </>
    );
};
