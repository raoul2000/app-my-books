import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useLocation } from "wouter";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& > *": {
                margin: theme.spacing(1),
            },
        },
    })
);

type Props = {
    to: string;
    label: string;
};

export const GoBackButton: React.FC<Props> = ({ to, label }): JSX.Element => {
    const classes = useStyles();
    const [, setLocation] = useLocation();

    const handleGo = () => setLocation(to);

    return (
        <Button
            color="primary"
            startIcon={<ArrowBackIosIcon />}
            onClick={handleGo}
        >
            {label}
        </Button>
    );
};
