import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { TopBarActions } from "@/component/app-bar/TopBarActions";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "6px 16px",
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

type Props = {
    bookId: string;
};
export const TravelTimeline: React.FC<Props> = ({ bookId }): JSX.Element => {
    const classes = useStyles();

    return (
        <div>
            <TopBarActions
                title="Livre en Voyage"
                backPath={`/travel/${bookId}`}
            />
            <main>
                <Container maxWidth="sm">
                    <Timeline>
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    12/08/2021 <br />
                                    9:30 am
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot variant="default">
                                    <FlightTakeoffIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                >
                                    départ
                                </Button>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    12/08/2021 <br />
                                    9:30 am
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot variant="default">
                                    <PersonPinCircleIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                >
                                    escale
                                </Button>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    12/08/2021 <br />
                                    9:30 am
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot variant="default">
                                    <PersonPinCircleIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                >
                                    escale
                                </Button>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot />
                            </TimelineSeparator>
                            <TimelineContent></TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </Container>
            </main>
        </div>
    );
};
