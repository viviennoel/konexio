import { Route } from "react-router";
import React from "react";

import App from "./containers/App";

//Redux Smart
import RegisterPage from "./containers/RegisterPage";
import PassportPage from "./containers/PassportPage";
import UsersPage from "./containers/UsersPage";

//Redux Dumb
import HomePage from "./components/Home";
import error404 from "./components/404";

export default (
  <Route name="app" path="/" component={App}>
      <Route path="/" component={HomePage} />
      <Route path="register" component={RegisterPage} />
      <Route path="users" component={UsersPage} />
      <Route path="passport" component={PassportPage} />
      <Route path="*" component={error404}/>
  </Route>
);
