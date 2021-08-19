import React from "react";
import { Route, Switch } from "wouter";

import { BookListPage } from "../page/BookListPage";
import { BookDetailsPage } from "../page/BookDetailsPage";
import { AboutPage } from "../page/AboutPage";
import { AddBookPage } from "../page/AddBookPage";
import { UpdateBookPage } from "../page/UpdateBookPage";
import { SettingsPage } from "../page/SettingsPage";

import Storage from "../utils/storage";
import { SignInPage } from "@/page/SignInPage";
import { TravelPage } from "@/page/TravelPage";

export const WithNavigation: React.FC<{}> = (): JSX.Element => {
    return (
        <Switch>
            <Route path="/signin" component={SignInPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/add" component={AddBookPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/travel/:id">
                {(params) => <TravelPage id={params.id} />}
            </Route>
            <Route path="/update/:id">
                {(params) => <UpdateBookPage id={params.id} />}
            </Route>
            <Route path="/detail/:id">
                {(params) => <BookDetailsPage id={params.id} />}
            </Route>
            <Route>{Storage.getApiKey() ? <BookListPage /> : <div />}</Route>
        </Switch>
    );
};
