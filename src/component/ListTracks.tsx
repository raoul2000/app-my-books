import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Avatar from "@mui/material/Avatar";
import { makeStyles, Theme, createStyles } from "@mui/styles";
import { blue } from "@mui/material/colors";
import Alert from '@mui/material/Alert';

import { BookTrack, TravelTicket } from "@/types";
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
    ticket?: TravelTicket; 
};

export const ListTracks: React.FC<Props> = ({ tracks, ticket }): JSX.Element => {
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
                    subheader={ticket && `${ticket.departureDateTime.toLocaleDateString()} à ${ticket.departureDateTime
                        .toLocaleTimeString()
                        .replace(/:..$/, "")}`}
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
