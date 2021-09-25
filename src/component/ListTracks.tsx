import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import Alert from "@mui/material/Alert";

import { BookTrack, TravelTicket } from "@/types";
import { ListTrackItem } from "./ListTrackItem";

type Props = {
    tracks?: BookTrack[];
    ticket?: TravelTicket;
};

export const ListTracks: React.FC<Props> = ({
    tracks,
    ticket,
}): JSX.Element => {
    return (
        <>
            <Card sx={{ marginBottom: "1em" }}>
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="take off"
                            sx={{ backgroundColor: blue[500] }}
                        >
                            <FlightTakeoffIcon />
                        </Avatar>
                    }
                    title="Début du Voyage"
                    subheader={
                        ticket &&
                        `${ticket.departureDateTime.toLocaleDateString()} à ${ticket.departureDateTime
                            .toLocaleTimeString()
                            .replace(/:..$/, "")}`
                    }
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
