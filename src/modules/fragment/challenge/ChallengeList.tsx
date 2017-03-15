import * as React from "react"
import * as _ from "lodash"
import {connect} from "react-redux"
import WorkItem from "../../../components/WorkItem"
import Divider from 'material-ui/Divider';
import {ppost, BreakSignal, Stop} from "../../../utils/request";
import VerticalBarLoading from "../../../components/VerticalBarLoading"
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"
import "./ChallengeList.less"
import {loadMineChallenge, loadOtherChallenge} from  "./async"

const style = {
  divider: {
    backgroundColor: "#f5f5f5",
    marginTop: "-8px",
    marginLeft: "-24px",
    width: "120%",
  }
}

@connect(state => state)
export default class ChallengeList extends React.Component<any,any> {
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
    }
  }

  componentWillMount() {
    // 加载个人作业
    const {location, dispatch,page} = this.props;
    const cid = _.get(location, "query.challengeId");
    const planId = _.get(location, "query.planId");
    const scrollValue = _.get(page,"scroll");
    this.setState({mineLoading: true, otherLoading: true});
    loadMineChallenge(planId, cid)
      .then(res => {
        if (res.code === 200) {
          this.setState({mine: res.msg, mineLoading: false});
          return res.msg;
        } else if (res.code === 401) {
          this.context.router.push({
            pathname: "/login",
            query: {
              callbackUrl: `/fragment/challenge/list?challengeId=${cid}&planId=${planId}`
            }
          })
        } else {
          this.setState({mineLoading: false, otherLoading: false});
          this.context.router.push({pathname: "/servercode"});
          throw new Stop();
        }
      }).catch(err => {
      console.log("catch", err);
      if (err instanceof BreakSignal) {
        dispatch(alertMsg(err.title, err.msg));
      } else if (!(err instanceof Stop)) {
        dispatch(alertMsg(err + ""));
      }
    })
  }

  onShowClick(submitId) {

    const {location,dispatch} = this.props;
    const challengeId = _.get(location, "query.challengeId");
    const planId = _.get(location, "query.planId");
    const {pageXOffset=0,pageYOffset=0} = window;
    dispatch(set("page.scroll",{x:pageXOffset,y:pageYOffset}));
    this.context.router.push({
      pathname: "/fragment/challenge/show",
      query: {
        submitId: submitId,
        planId: planId,
        challengeId: challengeId
      }
    })
  }

  onEditClick(cid, planId) {
    this.context.router.push({
      pathname: "/fragment/challenge",
      query: {
        challengeId: cid,
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
    const challengeId = _.get(this.props.location, "query.challengeId");
    const planId = _.get(this.props.location, "query.planId");

    const renderMine = () => {
      const {mine = {}} = this.state;
      console.log(mine);
      return (
        <div className="mineContainer">
          <WorkItem  {...mine} onShowClick={()=>this.onShowClick(mine.submitId)}
                               onEditClick={()=>this.onEditClick(challengeId,planId)} showVote={false}/>
        </div>
      )
    }

    return (
      <div className="challengeListContainer">
        <div className="myChallengeContainer">
          <div className="titleContainer">
            <div className="title">我的心得</div>
          </div>
          <Divider style={style.divider}/>
          {this.state.mineLoading ?<VerticalBarLoading/>: renderMine()}
        </div>
      </div>
    )
  }
}
