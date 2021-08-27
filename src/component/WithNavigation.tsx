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
import { TicketViewPage } from "@/page/TicketViewPage";
import { TicketFormPage } from "@/page/TicketFormPage";
import { BoardingPage } from "@/page/BoardingPage";
import { TravelTimeline } from "@/page/TravelTimeline";

export const WithNavigation: React.FC<{}> = (): JSX.Element => {
    return (
        <Switch>
            <Route path="/signin" component={SignInPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/add" component={AddBookPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/travel/:id">
                {(params) => <TicketViewPage bookId={params.id} />}
            </Route>
            <Route path="/ticket-edit/:id">
                {(params) => <TicketFormPage bookId={params.id} />}
            </Route>
            <Route path="/boarding/:id">
                {(params) => <BoardingPage bookId={params.id} />}
            </Route>
            <Route path="/update/:id">
                {(params) => <UpdateBookPage id={params.id} />}
            </Route>
            <Route path="/detail/:id">
                {(params) => <BookDetailsPage id={params.id} />}
            </Route>
            <Route path="/follow-trip/:id">
                {(params) => <TravelTimeline bookId={params.id} />}
            </Route>
            <Route>{Storage.getApiKey() ? <BookListPage /> : <div />}</Route>
        </Switch>
    );
};
