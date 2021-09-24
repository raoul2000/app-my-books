import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Skeleton from "@mui/material/Skeleton";

export const ListBookItemSkeleton: React.FC<{}> = (): JSX.Element => {
    return (
        <>
            {Array.from(new Array(10)).map((book, index) => (
                <ListItem key={index} divider={true}>
                    <ListItemAvatar>
                        <Skeleton variant="circular" width={40} height={40} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Skeleton variant="rectangular" height="1em" />}
                        secondary={<Skeleton variant="text" />}
                    />
                </ListItem>
            ))}
        </>
    );
};
