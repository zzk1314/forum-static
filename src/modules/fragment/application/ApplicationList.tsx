import * as React from "react"
import * as _ from "lodash"
import {connect} from "react-redux"
import WorkItem from "../../../components/WorkItem"
import Divider from 'material-ui/Divider';
import {ppost, BreakSignal, Stop} from "../../../utils/request";
import VerticalBarLoading from "../../../components/VerticalBarLoading"
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"
import "./ApplicationList.less"
import {loadMineApplication, loadOtherApplication,loadApplicationTitle} from  "./async"

const style = {
  divider: {
    backgroundColor: "#f5f5f5",
    marginLeft: "-24px",
    marginTop:"-8px",
    width:"120%",
  }
}

@connect(state => state)
export default class ApplicationList extends React.Component<any,any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      mine: [],
      other: [],
      mineLoading: false,
      otherLoading: false,
      title:null,
    }
  }


  componentWillMount() {
    // 加载个人作业
    const {location, dispatch} = this.props;
    const applicationId = _.get(location, "query.applicationId");
    const planId = _.get(location,"query.planId");
    this.setState({mineLoading: true, otherLoading: true});
    loadApplicationTitle(applicationId)
      .then(res=>{
        if(res.code===200){
          this.setState({title:res.msg});
        }
      }).catch(err=>{console.log(err)});
    loadMineApplication(planId,applicationId)
      .then(res => {
        if (res.code === 200) {
          this.setState({mine: res.msg, mineLoading: false});
          return res.msg;
        } else if(res.code === 401) {
          this.context.router.push({
            pathname:"/login",
            query:{
              callbackUrl:`/fragment/application/list?applicationId=${applicationId}&planId=${planId}`
            }
          })
        } else {
          this.setState({mineLoading: false, otherLoading: false});
          this.context.router.push({pathname: "/servercode"});
          throw new Stop();
        }
      }).then(() => {
      return loadOtherApplication(applicationId)
        .then(res => {
          if (res.code === 200) {
            this.setState({other: res.msg, otherLoading: false});
          } else {
            this.setState({otherLoading: false});
            throw new BreakSignal(res.msg, "提示");
          }
        })
    }).catch(err => {
      console.log("catch", err);
      if (err instanceof BreakSignal) {
        this.setState({mineLoading: false, otherLoading: false});
        dispatch(alertMsg(err.title, err.msg));
      } else if (!(err instanceof Stop)) {
        this.setState({mineLoading: false, otherLoading: false});
        dispatch(alertMsg(err + ""));
      }
    })
  }

  onShowClick(submitId) {
    const {location} = this.props;
    const applicationId = _.get(location, "query.applicationId");
    const planId = _.get(location, "query.planId");


    console.log("submitId:",submitId);
    this.context.router.push({
      pathname: "/fragment/application/show",
      query: {
        submitId: submitId,
        applicationId:applicationId,
        planId:planId
      }
    })
  }

  onEditClick(applicationId, planId) {
    this.context.router.push({
      pathname: "/fragment/application",
      query: {
        applicationId: applicationId,
        planId: planId
      }
    })
  }

  onVoteClick(submitId, canVote) {
    if (canVote && submitId) {
      ppost("/pc/fragment/challenge/vote", {referencedId: submitId, status: 1})
        .then(res => {
          if (_.isEqual(res.code, 200)) {
            this.setState({voteCount: Number(voteCount) + 1, voteStatus: 1})
          }
        }).catch(err => console.log(err));
    }
  }

  render() {
    const applicationId = _.get(this.props.location, "query.applicationId");
    const planId = _.get(this.props.location, "query.planId");
    const {mine = {}, other = []} = this.state;
    console.log("mine:",mine);
    const renderMine = () => {
      return (
        <div className="mineContainer">
          <WorkItem {...mine} onShowClick={()=>this.onShowClick(mine.submitId)}
                    onEditClick={()=>this.onEditClick(applicationId,planId)}/>
        </div>
      )
    }
    const renderOther = () => {
      return (
        <div className="otherContainer">
          {other.map((item, index) => {
            const {submitId} = item;
            return (
              <WorkItem key={index} {...item} onShowClick={()=>this.onShowClick(submitId)}/>
            )
          })}
        </div>
      )
    }
    return (
      <div className="challengeListContainer">
        <div className="myChallengeContainer">
          <div className="titleContainer">
            <div className="title">{this.state.title}</div>
          </div>
          <Divider style={style.divider}/>
          {this.state.mineLoading ?<VerticalBarLoading/>: renderMine()}
        </div>
        <div className="myChallengeContainer">
            <div className="title">
              <span className="title-text">群众的智慧</span>
            </div>
          {this.state.otherLoading ?<VerticalBarLoading/>: renderOther()}
        </div>
      </div>
    )
  }
}
