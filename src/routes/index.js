import React from "react";
import { Switch, Route } from "react-router-dom";

import { toast } from "react-toastify";

import MyRoute from "./MyRoute";
import Login from "../pages/Login";
import Page404 from "../pages/Page404";

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Login} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}