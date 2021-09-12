import { useState, useEffect, useRef, useCallback } from "react";
import { BaseLocationHook } from "wouter";

/**
 * custom hash based location hook
 * @see https://gist.github.com/billyct/084325c0d8df0e57129bc7bd5a05e8c5
 */


const currentPathname = () => location.hash.replace('#', '');

export const useHashLocation:BaseLocationHook = () => {
    const [path, update] = useState(currentPathname());
    const prevPath = useRef(path);

    useEffect(() => {
        // this function checks if the location has been changed since the
        // last render and updates the state only when needed.
        // unfortunately, we can't rely on `path` value here, since it can be stale,
        // that's why we store the last pathname in a ref.
        const checkForUpdates = () => {
            const pathname = currentPathname();
            prevPath.current !== pathname && update((prevPath.current = pathname));
        };

        const events = ["replaceHash"];
        events.forEach(e => addEventListener(e, checkForUpdates));

        // it's possible that an update has occurred between render and the effect handler,
        // so we run additional check on mount to catch these updates. Based on:
        // https://gist.github.com/bvaughn/e25397f70e8c65b0ae0d7c90b731b189
        checkForUpdates();

        return () => events.forEach(e => removeEventListener(e, checkForUpdates));
    }, []);

    // the 2nd argument of the `useLocation` return value is a function
    // that allows to perform a navigation.
    //
    // the function reference should stay the same between re-renders, so that
    // it can be passed down as an element prop without any performance concerns.
    const navigate = useCallback(
        to => {
            location.hash = to;
            dispatchEvent(new Event('replaceHash'));
        },
        []
    );

    return [path, navigate];
};

