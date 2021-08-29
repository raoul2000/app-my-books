import { BookTrack } from "@/types";
import React from "react";
import { ListTrackItem } from "./ListTrackItem";

type Props = {
    tracks: BookTrack[];
};

export const ListTracks: React.FC<Props> = ({ tracks }): JSX.Element => {
    return tracks.length ? (
        <div>No track</div>
    ) : (
        <>
            {tracks.map((track) => (
                <ListTrackItem key={track.id} track={track} />
            ))}
        </>
    );
};
