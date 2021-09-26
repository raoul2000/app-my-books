import * as React from "react";
import webShare, { WebShareInterface } from "react-web-share-api";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";

export interface OwnProps {
    style: object;
}

const Button: React.FC<WebShareInterface & OwnProps> = ({
    share,
    isSupported
}) =>
    isSupported ? (
        <IconButton aria-label="webshare" onClick={share}>
            <ShareIcon />
        </IconButton>
    ) : (
        <span></span>
    );

export const WebShareButton = webShare<OwnProps>()(Button);
