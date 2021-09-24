import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    infoHeader: {
        marginTop: "2em",
        marginBottom: "1em",
    },
    infoText: {
        marginLeft: "0.5em",
    },
    hideOnPrint: {
        display: "block",
    },
    [`@media print`]: {
        hideOnPrint: {
            display: "none",
        },
    },
}));

export const TicketHelp: React.FC<{}> = (): JSX.Element => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState<string | false>(false);
    const handleChange =
        (panel: string) =>
        (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <Box className={classes.hideOnPrint}>
            <Box
                display="flex"
                alignItems="center"
                className={classes.infoHeader}
            >
                <HelpOutlineIcon />
                <Typography variant="button" className={classes.infoText}>
                    Assistance Voyage
                </Typography>
            </Box>

            <Accordion
                elevation={0}
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
            >
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
            <Accordion
                elevation={0}
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
            >
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
            <Accordion
                elevation={0}
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="panel3-header"
                >
                    <Typography>Les trois étapes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component="span">
                        <ul>
                            <li>Créer le ticket</li>
                            <li>Préparer le livre</li>
                            <li>Embarquer</li>
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                elevation={0}
                expanded={expanded === "panel4"}
                onChange={handleChange("panel4")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="panel4-header"
                >
                    <Typography>Comment bien préparer le livre ?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component={"div"}>
                        Bien préparer le livre est essentiel pour que son
                        prochain lecteur puisse le signaler et que vous puissiez
                        le suivre.
                        <br />
                        Deux options au choix:
                        <ul>
                            <li>
                                imprimez et coller le <strong>QR Code</strong>{" "}
                                du ticket au dos de la couverture
                            </li>
                            <li>
                                recopiez à la main, de façon lisible, le{" "}
                                <strong>numéro de réservation</strong> ET le{" "}
                                <strong>checkpoint</strong>
                            </li>
                        </ul>
                        Vous pouvez bien sûr aussi imprimer le ticket complet
                        (QR-Code, numéro de réservation, checkpoint) et le
                        coller au dos de la couverture.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                elevation={0}
                expanded={expanded === "panel5"}
                onChange={handleChange("panel5")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="panel5-header"
                >
                    <Typography>Dernière étape: l'embarquement</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component={"div"}>
                        Lorsque le livre est prêt, il est temps pour lui de
                        commencer le voyage.
                        <br />
                        Donnez-le, déposez-le au coin d'une rue, dans un café,
                        une bibliothèque, ou n'importe quel lieu de passage afin
                        qu'il soit emporté au hasard par un lecteur curieux.
                        <br />
                        Vous pourrez plus tard suivre sa route au gré des
                        signalements que feront peut-être ceux qui l'auront
                        trouvé.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};
