import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { Alert } from "@material-ui/lab";

import { BookTrack } from "@/types";
import { ListTrackItem } from "./ListTrackItem";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: "1em",
        },
        iconTakeOff: {
            backgroundColor: blue[500],
        },
    })
);

type Props = {
    tracks?: BookTrack[];
};

export const ListTracks: React.FC<Props> = ({ tracks }): JSX.Element => {
    const classes = useStyles();

    return (
        <>
            <Card className={classes.root} elevation={1}>
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="take off"
                            className={classes.iconTakeOff}
                        >
                            <FlightTakeoffIcon />
                        </Avatar>
                    }
                    title="Début du Voyage"
                    subheader="September 14, 2016 - Paris"
                />
            </Card>
            {!tracks || tracks.length === 0 ? (
                <Alert severity="info">
                    Aucun signalement depuis le départ
                </Alert>
            ) : (
                tracks.map((track) => (
                    <ListTrackItem key={track.id} track={track} />
                ))
            )}
        </>
    );
};
