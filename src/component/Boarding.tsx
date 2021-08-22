import React from "react";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    checklistContainer: {
        padding: "1em",
    },
}));

type Props = {
    onConfirm: () => void;
    onCancel?: () => void;
};

export const Boarding: React.FC<Props> = ({
    onConfirm,
    onCancel,
}): JSX.Element => {
    const classes = useStyles();

    return (
        <Paper elevation={0} className={classes.checklistContainer}>
            <Typography variant="h5" color="textSecondary" gutterBottom={true}>
                Embarquement Immédiat
            </Typography>
            <FormControlLabel
                control={<Switch />}
                label={
                    <Typography color="textSecondary" gutterBottom={true}>
                        Le QR Code du ticket est collé sur la couverture du
                        livre
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
            <Button variant="contained" onClick={() => onConfirm()}>
                Checkin
            </Button>
        </Paper>
    );
};
