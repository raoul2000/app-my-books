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
    const departureTrack = tracks?.find((track) => track.isBoarding);

    if (!departureTrack) {
        return (
            <Alert severity="error">
                Ce livre ne n'a pas commencé son voyage
            </Alert>
        );
    }
    const otherTracks = tracks?.filter((track) => !track.isBoarding);
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
                        <div>
                            {`${departureTrack.createdAt.toLocaleDateString()} à ${departureTrack.createdAt
                                .toLocaleTimeString()
                                .replace(/:..$/, "")}`}
                            <br />
                            {departureTrack.locationName
                                ? departureTrack.locationName
                                : "non renseigné"}
                        </div>
                    }
                />
            </Card>
            {!otherTracks || otherTracks.length === 0 ? (
                <Alert severity="info">
                    Aucun signalement depuis le départ
                </Alert>
            ) : (
                otherTracks.map((track) => (
                    <ListTrackItem key={track.id} track={track} />
                ))
            )}
        </>
    );
};
