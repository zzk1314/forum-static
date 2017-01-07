import * as React from "react"
import * as _ from "lodash"
import {connect} from "react-redux"
import WorkItem from "../../components/WorkItem"
import {pget, ppost, BreakSignal} from "utils/request";
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import "./ChallengeList.less"

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
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.location.query.cid !== this.props.location.query.cid) {
      const {location, user, dispatch} = newProps;
      const cid = _.get(location, "query.cid");
      if (_.isUndefined(cid)) {
        console.error("cid没有定义");
      } else {
        dispatch(set("loading.fragment", true));
        pget(`/pc/fragment/c/list/mine/${cid}`, this.context.router)
          .then(res => {
            if (res.code === 200) {
              return res.msg;
            } else {
              dispatch(set("loading.fragment", false));
              this.context.router.push({pathname: "/servercode"});
              throw new BreakSignal("stop");
            }
          }).then((mine) => {
          pget(`/pc/fragment/c/list/other/${cid}`)
            .then(res => {
              dispatch(set("loading.fragment", false));
              if (res.code === 200) {
                this.setState({other: res.msg,mine:mine});
              } else {
                this.context.router.push({pathname: "/servercode"});
              }
            }).catch(err=>{
            console.log(err);
            dispatch(set("loading.fragment", false));
          })
        }).catch(err => {
          console.log(err);
          dispatch(set("loading.fragment", false));
        });
      }
    }
  }

  componentWillMount() {
    // 加载个人作业
    const {location, dispatch, user} = this.props;
    const cid = _.get(location, "query.cid");
    if (_.isUndefined(cid)) {
      console.error("cid没有定义");
    } else {
      dispatch(set("loading.fragment", true));
      pget(`/pc/fragment/c/list/mine/${cid}`)
        .then(res => {
          if (res.code === 200) {
            return res.msg
          } else {
            this.context.router.push({pathname: "/servercode"});
            // 终止promise，不查其他人了
            throw new BreakSignal("加载mine失败");
          }
          return res.msg;
        }).then((mine) => {
        pget(`/pc/fragment/c/list/other/${cid}`)
          .then(res => {
            dispatch(set("loading.fragment", false));
            if (res.code === 200) {
              this.setState({other: res.msg,mine:mine});
            } else {
              this.context.router.push({pathname: "/servercode"});
            }
          }).catch(err => {
          console.log(err);
          dispatch(set("loading.fragment", false));
        });
      }).catch(err => {
        console.log(err);
        dispatch(set("loading.fragment", false));
      });
    }
  }

  onShowClick(submitId) {
    this.context.router.push({
      pathname: "/fragment/c/show",
      query: {submitId: submitId}
    })
  }

  onEditClick(cid, planId) {
    this.context.router.push({
      pathname: "/fragment/c",
      query: {
        cid: cid,
        planId: planId
      }
    })
  }

  onVoteClick(submitId, canVote) {
    if (canVote && submitId) {
      ppost("/pc/fragment/c/vote", {referencedId: submitId, status: 1})
        .then(res => {
          if (_.isEqual(res.code, 200)) {
            this.setState({voteCount: Number(voteCount) + 1, voteStatus: 1})
          }
        }).catch(err => console.log(err));
    }
  }

  render() {
    const cid = _.get(this.props.location, "query.cid");
    const {mine=[],other=[]} = this.state;
    const renderMine = () => {
      return (
        <div className="mineContainer">
          {mine.map((item, index) => {
            // headImg, upName, upTime, content, voteCount, onEditClick, onShowClick, onVoteClick,
            const {planId, canVote, submitId} = item;
            return (
              <WorkItem key={index} {...item} onShowClick={()=>this.onShowClick(submitId)}
                        onEditClick={()=>this.onEditClick(cid,planId)}
                        onVoteClick={()=>this.onVoteClick(submitId,canVote)}/>
            )
          })}
        </div>
      )
    }


    const renderOther = () => {
      return (
        <div className="otherContainer">
          {other.map((item, index) => {
            const {canVote, submitId} = item;
            return (
              <WorkItem key={index} {...item} onShowClick={()=>this.onShowClick(submitId)}
                        onVoteClick={()=>this.onVoteClick(submitId,canVote)}/>
            )
          })}
        </div>
      )
    }

    return (
      <div className="challengeListContainer">
        <div className="myChallengeContainer">
          <div className="titleContainer">
            <div className="title">我的心得</div>
          </div>
          {renderMine()}
        </div>
        <div className="myChallengeContainer">
          <div className="titleContainer">
            <div className="title">群众的智慧</div>
          </div>
          {renderOther()}
        </div>
      </div>
    )
  }
}
