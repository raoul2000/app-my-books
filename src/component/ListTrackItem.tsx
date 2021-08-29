import { BookTrack } from '@/types';
import React from 'react';

type Props = {
    track: BookTrack;
};

export const ListTrackItem: React.FC<Props> = ({track}):JSX.Element => {
    return ( 
       <div>{track.id}</div> 
    );
}