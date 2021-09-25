import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import { BookTrack } from "@/types";

type Props = {
    track: BookTrack;
};

export const ListTrackItem: React.FC<Props> = ({ track }): JSX.Element => {
    return (
        <Card sx={{ marginBottom: "1em" }} elevation={1}>
            <CardHeader
                avatar={
                    <Avatar
                        aria-label="ping"
                        sx={{ backgroundColor: green[500] }}
                    >
                        <PersonPinCircleIcon />
                    </Avatar>
                }
                title={
                    track.locationName ? track.locationName : "non renseigné"
                }
                subheader={
                    <>
                        <Typography>
                            {track.createdAt.toLocaleDateString()} à{" "}
                            {track.createdAt.toLocaleTimeString()}
                        </Typography>
                        {track.rate && (
                            <Rating
                                name="book-rate"
                                value={track.rate}
                                size="small"
                                readOnly={true}
                            />
                        )}
                    </>
                }
            />
            <CardContent>
                {track.text && <Typography>{track.text}</Typography>}
            </CardContent>
        </Card>
    );
};
