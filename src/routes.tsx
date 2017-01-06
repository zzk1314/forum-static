import * as React from "react";
import {Route, IndexRoute} from "react-router";
import Base from "modules/base/Base";
import Fragment from "./modules/fragment/Fragment"
import Home from "./modules/Home"
import Challenge from "./modules/fragment/DoChallenge"
import Login from "./modules/Login"
import ServerCode from "./modules/ServerCode"
import DoChallenge from "./modules/fragment/DoChallenge"
import ChallengeList from "./modules/fragment/ChallengeList"
import ShowChallenge from "./modules/fragment/ShowChallenge"
import Stranger from "./modules/Stranger"

const routes = (
  <Route path="/" component={Base}>
    <IndexRoute component={Home}/>
    <Route path="home" component={Home}/>
    <Route path="login" component={Login}/>
    <Route path="stranger" component={Stranger}/>
    <Route component={Fragment}>
      <Route path="fragment/c" component={DoChallenge}/>
      <Route path="fragment/c/list" component={ChallengeList}/>
      <Route path="fragment/c/show" component={ShowChallenge}/>
      <Route path="servercode" component={ServerCode}/>
    </Route>
  </Route>
)

export default routes
