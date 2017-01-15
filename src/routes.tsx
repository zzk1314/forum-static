import * as React from "react";
import {Route, IndexRoute} from "react-router";
import Base from "modules/base/Base.tsx";
import Fragment from "./modules/fragment/Fragment"
import Home from "./modules/home/Home"
import Login from "./modules/Login"
import ServerCode from "./modules/ServerCode"
import Rise from "./modules/fragment/Rise"
import DoChallenge from "./modules/fragment/challenge/DoChallenge"
import DoApplication from "./modules/fragment/application/DoApplication"
import ChallengeList from "./modules/fragment/challenge/ChallengeList"
import ApplicationList from "./modules/fragment/application/ApplicationList"
import ShowChallenge from "./modules/fragment/challenge/ShowChallenge"
import ShowApplication from "./modules/fragment/application/ShowApplication"
import Stranger from "./modules/Stranger"
import Reject from "./modules/Reject"

const routes = (
  <Route path="/" component={Base}>
    <IndexRoute component={Home}/>
    <Route path="home" component={Home}/>
    <Route path="login" component={Login}/>
    <Route path="stranger" component={Stranger}/>
    <Route path="pc/static/reject" component={Reject} />
    <Route component={Fragment}>
      <Route path="fragment/rise" component={Rise}/>
      <Route path="fragment/challenge" component={DoChallenge}/>
      <Route path="fragment/application" component={DoApplication}/>
      <Route path="fragment/challenge/list" component={ChallengeList}/>
      <Route path="fragment/application/list" component={ApplicationList}/>
      <Route path="fragment/challenge/show" component={ShowChallenge}/>
      <Route path="fragment/application/show" component={ShowApplication}/>
      <Route path="servercode" component={ServerCode}/>
    </Route>
  </Route>
)

export default routes
