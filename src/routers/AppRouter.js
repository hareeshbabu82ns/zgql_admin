import React from "react";
import { SemanticToastContainer } from 'react-semantic-toasts';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";

import ErrorPage from "../containers/ErrorPage";
import DashboardPage from "../containers/DashboardPage";
import GraphqlEditorPage from "../containers/GraphqlEditorPage";
import GraphiQLPage from "../containers/GraphiQLPage";
import NavBar from "../components/NavBar";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div style={{
      height: '100vh',
    }}>
      <SemanticToastContainer />
      <NavBar />
      <Switch>
        <Route path="/dashboard" component={DashboardPage} />
        <Route path={`/editor/:id`} component={GraphqlEditorPage} exact />
        <Route path={`/graphiql/:id`} component={GraphiQLPage} exact />

        <Route component={ErrorPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
