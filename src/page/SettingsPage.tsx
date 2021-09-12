import React from "react";
import { useLocation } from "wouter";
import Typography from "@material-ui/core/Typography";
import { FormSettings } from "@/component/form/FormSettings";
import Container from "@material-ui/core/Container";

export const SettingsPage: React.FC<{}> = (): JSX.Element => {
    const [, setLocation] = useLocation();
    const goHome = () => {
        setLocation("/");
    };

    return (
        <div>
            <main>
                <Container maxWidth="sm">
                    <div className="settings">
                        <Typography variant="h5" component="h1">
                            Settings
                        </Typography>
                        <FormSettings onSubmit={() => goHome()} />
                    </div>
                </Container>
            </main>
        </div>
    );
};
