import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    infoHeader: {
        marginTop: "2em",
        marginBottom: "1em",
    },
    infoText: {
        marginLeft:'0.5em'
    }
}));

export const TicketHelp: React.FC<{}> = (): JSX.Element => {
    const classes = useStyles();
    return (
        <>
            <Box display='flex' alignItems='center' className={classes.infoHeader}>
                <HelpOutlineIcon />
                <Typography variant='button' className={classes.infoText}>
                    Information voyage
                </Typography>
            </Box>

            <Accordion elevation={0}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1-header"
                >
                    <Typography>Comment ça marche ?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography paragraph={true}>
                        Ce livre peut rester dans votre bibliothèque ou bien
                        partir en voyage à la rencontre de nouveaux lecteurs.
                        <br />
                        Donnez-le à quelqu'un, déposez-le sur un banc public ou
                        ailleurs et il pourra commencer son voyage.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion elevation={0}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="panel2-header"
                >
                    <Typography>Un ticket, pour quoi faire ?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography paragraph={true}>
                        Pour voyager, ce livre a besoin d'un ticket. Chaque
                        lecteur dont il croisera la route pourra grâce à ce
                        ticket, signaler le passage de ce livre entre ses mains.
                        <br />
                        Vous pourrez voir ces signalements et ainsi suivre le
                        voyage de ce livre .
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    );
};
