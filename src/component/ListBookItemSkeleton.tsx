import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Skeleton from "@material-ui/lab/Skeleton";

export const ListBookItemSkeleton: React.FC<{}> = (): JSX.Element => {
    return (
        <>
            {Array.from(new Array(10)).map((book, index) => (
                <ListItem key={index} divider={true}>
                    <ListItemAvatar>
                        <Skeleton variant="circle" width={40} height={40} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Skeleton variant="rect" height="1em" />}
                        secondary={<Skeleton variant="text" />}
                    />
                </ListItem>
            ))}
        </>
    );
};
