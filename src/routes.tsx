import * as React from "react";
import { Route } from "react-router";
import Base from "modules/base/Base";
import Home from "./modules/Home"

const routes = (
  <Route path="/" component={Base}>
    <Route path="home" component={Home}/>
  </Route>
)

export default routes
