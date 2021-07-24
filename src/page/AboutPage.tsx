import React from 'react';
import Typography from "@material-ui/core/Typography";

export const AboutPage: React.FC<{}> = ():JSX.Element => {
    return ( 
        <div className="about">
            <Typography variant="h5" component="h1">
                About
            </Typography>
            <p>This app is a work in progress...</p>
        </div>
    );
}