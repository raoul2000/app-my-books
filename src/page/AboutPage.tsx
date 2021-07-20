import React from 'react';
import { GoBackButton } from '../component/GoBackButton';
import Typography from "@material-ui/core/Typography";

export const AboutPage: React.FC<{}> = ():JSX.Element => {
    return ( 
        <div className="about">
            <GoBackButton to="/" label="Book list"/>
            <Typography variant="h5" component="h1">
                About
            </Typography>
            <p>This app is a work in progress...</p>
        </div>
    );
}