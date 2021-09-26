import React from "react";
import Typography from "@mui/material/Typography";
import { AboutBar } from "@/component/app-bar/AboutBar";
import Container from "@mui/material/Container";

export const AboutPage: React.FC<{}> = (): JSX.Element => {
    return (
        <div className="about">
            <AboutBar />
            <main>
                <Container maxWidth="sm">
                    <Typography variant="h5" component="h1">
                        Mes Livres
                    </Typography>
                    <Typography>
                        Votre bibliothèque virtuelle
                    </Typography>
                </Container>
            </main>
        </div>
    );
};
