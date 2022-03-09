import React from "react";
import Typography from "@mui/material/Typography";
import { AboutBar } from "@/component/app-bar/AboutBar";
import Container from "@mui/material/Container";
import favicon from "../favicon.svg";

export const AboutPage: React.FC<{}> = (): JSX.Element => {
    //@ts-ignore
    const appVersion: string = APP_VERSION; // see vite.config.js
    //@ts-ignore
    const appBuildTs: string = NOW_TS;

    return (
        <div className="about">
            <AboutBar />
            <main>
                <Container maxWidth="sm">
                    <Typography variant="h2" component="h1">
                        Mes Livres
                    </Typography>
                    <img className="book-icon" src={favicon} />
                    <Typography variant="h5" component="h1">
                        Gérez votre collection de livres...
                        <br />
                        ...faites les voyager
                    </Typography>
                    <Typography component="small">
                        <span className="version-info">
                            version {appVersion}{" "}
                        </span>
                        <br />
                        <span className="build-ts">{appBuildTs}</span>
                    </Typography>
                </Container>
            </main>
        </div>
    );
};
