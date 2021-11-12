import React  from "react";
import Typography from "@mui/material/Typography";
import { AboutBar } from "@/component/app-bar/AboutBar";
import Container from "@mui/material/Container";
import favicon from '../favicon.svg';

export const AboutPage: React.FC<{}> = (): JSX.Element => {
    //@ts-ignore
    const appVersion:string= APP_VERSION; // see vite.config.js

    return (
        <div className="about">
            <AboutBar />
            <main>
                <Container maxWidth="sm">
                    <img className="book-icon" src={favicon} />
                    <Typography variant="h3" component="h1">
                        Mes Livres
                    </Typography>
                    <Typography variant="h5" component="h1">
                        Votre bibliothèque virtuelle
                    </Typography>                    
                    <Typography>
                        version {appVersion}
                    </Typography>

                </Container>
            </main>
        </div>
    );
};
