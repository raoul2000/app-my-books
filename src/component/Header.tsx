import React from "react";
import { TopBar } from "./TopBar";
import { TopBarSecondary } from "./TopBarSecondary";
import { Route, Switch } from "wouter";

export const Header: React.FC<{}> = (): JSX.Element => {
    return (
        <Switch>
            <Route path="/" component={TopBar} />
            <Route>
                <TopBarSecondary />
            </Route>
        </Switch>
    );
};
