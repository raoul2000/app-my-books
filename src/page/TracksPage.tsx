import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red, green, blue } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Container from "@material-ui/core/Container";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import Badge from "@material-ui/core/Badge";
import Rating from "@material-ui/lab/Rating";

import { TopBarActions } from "@/component/app-bar/TopBarActions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: "1em",
        },
        media: {
            height: 0,
            paddingTop: "56.25%", // 16:9
        },
        expand: {
            transform: "rotate(0deg)",
            marginLeft: "auto",
            transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: "rotate(180deg)",
        },
        iconTakeOff: {
            backgroundColor: blue[500],
        },
        iconPing: {
            backgroundColor: green[500],
        },
    })
);

type Props = {
    bookId: string;
};

export const TracksPage: React.FC<Props> = ({ bookId }): JSX.Element => {
    const classes = useStyles();

    return (
        <div>
            <TopBarActions
                title="Itinéraire"
                backPath={`/detail/${bookId}`}
            />
            <main>
                <Container maxWidth="sm">
                    <div></div>
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

                    <Card className={classes.root} elevation={1}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    aria-label="ping"
                                    className={classes.iconPing}
                                >
                                    <PersonPinCircleIcon />
                                </Avatar>
                            }
                            title="Vincennes"
                            subheader={
                                <>
                                    <Typography>September 21, 2018</Typography>
                                    <Rating
                                        name="book-rate"
                                        value={4}
                                        size="small"
                                        readOnly={true}
                                    />
                                </>
                            }
                        />
                        <CardContent>
                            <Typography paragraph>
                                L'histoire est belle et la fin totalement inatendue
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className={classes.root} elevation={1}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    aria-label="ping"
                                    className={classes.iconPing}
                                >
                                    <PersonPinCircleIcon />
                                </Avatar>
                            }
                            title="Creteil"
                            subheader={
                                <>
                                    <Typography>Novembre 01, 2018</Typography>
                                </>
                            }
                        />
                    </Card>
                    <Card className={classes.root} elevation={1}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    aria-label="ping"
                                    className={classes.iconPing}
                                >
                                    <PersonPinCircleIcon />
                                </Avatar>
                            }
                            title="Montreuil"
                            subheader={
                                <>
                                    <Typography>Décembre 01, 2018</Typography>
                                    <Rating
                                        name="book-rate"
                                        value={5}
                                        size="small"
                                        readOnly={true}
                                    />
                                </>
                            }
                        />
                    </Card>
                </Container>
            </main>
        </div>
    );
};
