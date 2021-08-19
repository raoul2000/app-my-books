import React from "react";
import Typography from "@material-ui/core/Typography";
import { TopBarSecondary } from "@/component/TopBarSecondary";
import Container from "@material-ui/core/Container";

export const AboutPage: React.FC<{}> = (): JSX.Element => {
    return (
        <div className="about">
            <TopBarSecondary />
            <main>
                <Container maxWidth="sm">
                    <Typography variant="h5" component="h1">
                        About
                    </Typography>
                    <p>This app is a work in progress...</p>
                </Container>
            </main>
        </div>
    );
};
