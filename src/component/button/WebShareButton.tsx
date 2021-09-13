import * as React from "react";
import webShare, { WebShareInterface } from "react-web-share-api";
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";

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
