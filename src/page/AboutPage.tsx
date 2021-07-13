import React from 'react';
import { Link } from "wouter"

export const AboutPage: React.FC<{}> = ():JSX.Element => {
    return ( 
        <div className="about">
            <Link href="/" className="active">&lt; home</Link>
            <h2>About</h2>
            <p>This app is a work in progress</p>
        </div>
    );
}