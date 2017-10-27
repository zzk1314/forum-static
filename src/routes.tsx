import * as React from "react";
import { Route, IndexRoute } from "react-router";
import * as React from 'react'
import { Route, IndexRoute } from 'react-router'
import Base from 'modules/base/Base.tsx'
import RiseBase from 'modules/base/RiseBase.tsx'
import Home from './modules/home/Home'
import Login from './modules/Login'
import ServerCode from './modules/ServerCode'
import ShowApplication from './modules/asst/application/ShowApplication'
import ShowSubject from './modules/asst/subject/ShowSubject'
import Stranger from './modules/Stranger'
import Reject from './modules/Reject'
import NotFoundPage from './modules/NotFoundPage'
import Test from './modules/Test'
import BackendIndex from './modules/backend/BackendIndex'
import BackendWelcome from './modules/backend/Welcome'
import HotWarmupPractice from './modules/backend/warmup/HotWarmupPractice'
import PracticeView from './modules/backend/warmup/PracticeView'
import Discuss from './modules/backend/warmup/Discuss'
import ApplicationProblemList from './modules/backend/application/ProblemList'
import CatalogView from './modules/backend/application/Catalog'
import ApplicationView from './modules/backend/application/ApplicationList'
import ProjectConfig from './modules/backend/admin/ProjectConfig'
import ConfigDetail from './modules/backend/admin/ConfigDetail'
import Refund from './modules/backend/admin/Refund'
import WarmupProblemList from './modules/backend/import/warmup/edit/ProblemList'
import WarmupPracticeList from './modules/backend/import/warmup/edit/WarmupPracticeList'
import PracticeEditView from './modules/backend/import/warmup/edit/PracticeView'
import AsstIndex from './modules/asst/AsstIndex'
import AsstWelcome from './modules/asst/Welcome'
import AsstApplicationComment from './modules/asst/application/ProblemList'
import AsstApplicationList from './modules/asst/application/ApplicationList'
import AsstSubjectComment from './modules/asst/subject/ProblemList'
import AsstSubjectList from './modules/asst/subject/SubjectList'
import CommentedList from './modules/asst/CommentedList'
import WarmupPracticeView from './modules/asst/warmup/WarmupPracticeView'

// pc rise 改版

import Plan from './modules/fragment/plan/Plan'
import Learn from './modules/fragment/plan/Learn'
import Report from './modules/fragment/plan/Report'
import Subject from './modules/fragment/subject/Subject'
import Challenge from './modules/fragment/challenge/Challenge'
import Application from './modules/fragment/application/Application'
import Comment from './modules/fragment/application/Comment'
import WarmUp from './modules/fragment/warmup/WarmUp'
import WarmupResult from './modules/fragment/warmup/Result'
import WarmUpAnalysis from './modules/fragment/warmup/Analysis'
import AnalysisNew from './modules/fragment/warmup/AnalysisNew'
import KnowledgeViewer from './modules/fragment/knowledge/KnowledgeViewer'
import KnowledgeReview from './modules/fragment/knowledge/KnowledgeReview'
import ProblemViewer from './modules/fragment/problem/ProblemViewer'
import Profile from './modules/fragment/customer/personal/Profile'
import Personal from './modules/fragment/customer/personal/Personal'
import Account from './modules/fragment/customer/personal/Account'
import Help from './modules/fragment/customer/personal/Help'
import Message from './modules/fragment/customer/msgcenter/Message'
import UserProtocol from './modules/fragment/customer/personal/UserProtocol'
import ReplyKnowledgeDiscussMessage from './modules/fragment/customer/msgcenter/TransitionPages/ReplyKnowledgeDiscussMessage'
import ReplyCommentMessage from './modules/fragment/customer/msgcenter/TransitionPages/ReplyCommentMessage'
import ReplyWarmupDiscussMessage from './modules/fragment/customer/msgcenter/TransitionPages/ReplyWarmupDiscussMessage'
import WarmupPracticeImport from './modules/backend/import/warmup/practiceinput/WarmupPracticeImport'
import KnowledgeImport from './modules/backend/import/knowledge/KnowledgeImport'
import ProblemImport from './modules/backend/import/problem/ProblemImport'
import CampUserView from './modules/camp/CampUserView'
import CampUserUnGroup from './modules/camp/CampUserUnGroup'
import CampUserAdd from './modules/camp/CampUserAdd'
import AutoReplyMessage from './modules/backend/message/autoreply/AutoReplyMessage'
import SubscribeMessage from './modules/backend/message/autoreply/SubscribeMessage'
import BusinessSchoolApplication from "./modules/backend/operation/BusinessSchoolApplication"
import SurveyConfig from './modules/backend/operation/SurveyConfig'

const routes = (
  <Route path="/">
    <Route component={Base}>
      <IndexRoute component={Home}/>
      <Route path="home" component={Home}/>
      <Route path="test" component={Test}/>
      <Route path="login" component={Login}/>
      <Route path="stranger" component={Stranger}/>
      <Route path="pc/static/reject" component={Reject}/>
      <Route path="servercode" component={ServerCode}/>
      <Route component={BackendIndex}>
        <Route path="backend" component={BackendWelcome}/>
        <Route path="/backend/admin/config" component={ProjectConfig}>
          <Route path="/backend/project/config" component={ConfigDetail}/>
        </Route>
        <Route path="/backend/admin/refund" component={Refund}/>
        <Route path="backend/warmup" component={HotWarmupPractice}/>
        <Route path="backend/warmup/view" component={PracticeView}/>
        <Route path="backend/warmup/discuss" component={Discuss}/>
        <Route path="/backend/warmup/management" component={WarmupProblemList}>
          <Route path="/backend/warmup/edit/list" component={WarmupPracticeList}/>
          <Route path="/backend/warmup/edit/view" component={PracticeEditView}/>
        </Route>
        <Route path="/backend/warmup/newpractice">
          <Route path="/backend/warmup/practice/import" component={WarmupPracticeImport}/>
        </Route>
        <Route path="/backend/application/problem/list" component={ApplicationProblemList}>
          <Route path="/backend/application/catalog" component={CatalogView}/>
          <Route path="/backend/application/list" component={ApplicationView}/>
        </Route>
        <Route path="/backend/camp/add" component={CampUserAdd}/>
        <Route path="/backend/camp/group" component={CampUserUnGroup}/>
        <Route path="/backend/camp/info" component={CampUserView}/>
        <Route path="/backend/message/reply" component={AutoReplyMessage}/>
        <Route path="/backend/message/subscribe" component={SubscribeMessage}/>
        <Route path="/backend/knowledge/import" component={KnowledgeImport}/>
        <Route path="/backend/problem/import" component={ProblemImport}/>
        <Route path="/backend/business/school/application" component={BusinessSchoolApplication}/>
        <Route path="/backend/survey/config" component={SurveyConfig}/>

      </Route>
      <Route component={AsstIndex}>
        <Route path="asst" component={AsstWelcome}/>
        <Route path="asst/commented" component={CommentedList}/>
        <Route path="/asst/application/comment" component={AsstApplicationComment}>
          <Route path="/asst/application/list" component={AsstApplicationList}/>
          <Route path="/asst/application/view" component={ShowApplication}/>
        </Route>
        <Route path="/asst/subject/comment" component={AsstSubjectComment}>
          <Route path="/asst/subject/list" component={AsstSubjectList}/>
          <Route path="/asst/subject/view" component={ShowSubject}/>
        </Route>
        <Route path="asst/warmup/comment" component={HotWarmupPractice}/>
        <Route path="asst/warmup/view" component={WarmupPracticeView}/>
      </Route>
    </Route>
    {/*Rise PC 改版*/}
    <Route component={RiseBase}>
      <Route path="/fragment/rise" component={Plan}/>
      <Route path="/fragment/learn" component={Learn}/>
      <Route path="/fragment/main" component={Learn}/>
      <Route path="/fragment/subject" component={Subject}/>
      <Route path="/fragment/problem/view" component={ProblemViewer}/>
      <Route path="/fragment/knowledge" component={KnowledgeViewer}/>
      <Route path="/fragment/warmup" component={WarmUp}/>
      <Route path="/fragment/warmup/result" component={WarmupResult}/>
      <Route path="/fragment/warmup/analysis" component={WarmUpAnalysis}/>
      <Route path="/fragment/application" component={Application}/>
      <Route path="/fragment/challenge" component={Challenge}/>
      <Route path="/fragment/report" component={Report}/>
      <Route path="/fragment/warmup/new/analysis" component={AnalysisNew}/>
      <Route path="/fragment/knowledge/review" component={KnowledgeReview}/>
      <Route path="/fragment/application/comment" component={Comment}/>
      <Route component={Personal}>
        <Route path="/fragment/customer/profile" component={Profile}/>
        <Route path="/fragment/customer/account" component={Account}/>
        <Route path="/fragment/customer/help" component={Help}/>
        <Route path="/fragment/customer/userprotocol" component={UserProtocol}/>
      </Route>
      <Route path="/fragment/message" component={Message}/>
      <Route path="/fragment/message/knowledge/reply" component={ReplyKnowledgeDiscussMessage}/>
      <Route path="/fragment/message/comment/reply" component={ReplyCommentMessage}/>
      <Route path="/fragment/message/warmup/reply" component={ReplyWarmupDiscussMessage}/>
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Route>
)

export default routes
