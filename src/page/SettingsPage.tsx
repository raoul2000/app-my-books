import React, { useState } from "react";
import useLocation from "wouter/use-location";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import { FormSettings } from "../component/FormSettings";
import Container from "@material-ui/core/Container";

export const SettingsPage: React.FC<{}> = (): JSX.Element => {
    const [, setLocation] = useLocation();
    const [showNotif, setShowNotif] = useState(false);
    const goHome = () => {
        setShowNotif(true);
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
                        <Snackbar
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            open={false}
                            autoHideDuration={6000}
                            message="Note archived"
                        />
                    </div>
                </Container>
            </main>
        </div>
    );
};
