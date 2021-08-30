import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";

import { BookTrack } from "@/types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: "1em",
        },
        iconPing: {
            backgroundColor: green[500],
        },
    })
);

type Props = {
    track: BookTrack;
};

export const ListTrackItem: React.FC<Props> = ({ track }): JSX.Element => {
    const classes = useStyles();
    console.log(track);
    return (
        <Card className={classes.root} elevation={1}>
            <CardHeader
                avatar={
                    <Avatar aria-label="ping" className={classes.iconPing}>
                        <PersonPinCircleIcon />
                    </Avatar>
                }
                title="Vincennes"
                subheader={
                    <>
                        <Typography>September 21, 2018</Typography>
                        {track.rate > 0 && (
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
