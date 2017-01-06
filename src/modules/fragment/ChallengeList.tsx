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
  }

  componentDidMount() {
  }

  componentWillReceiveProps(newProps) {
    if (newProps.location.query.cid !== this.props.location.query.cid) {
      console.log("reRender");
      const {location, user, dispatch} = newProps;
      const cid = _.get(location, "query.cid");
      if (_.isUndefined(cid)) {
        console.error("cid没有定义");
      } else {
        const cidList = _.get(user, `course.fragment.challenge.mine.${cid}`);
        if (_.isUndefined(cidList)) {
          console.log("ajax请求cidlist", cid);
          dispatch(set("loading.fragment", true));
          pget(`/pc/fragment/c/list/mine/${cid}`, this.context.router)
            .then(res => {
              dispatch(set("loading.fragment", false));
              if (res.code === 200) {
                console.log("recive加载我的")
                dispatch(set(`user.fragment.challenge.mine.${cid}`, res.msg));
              } else {
                this.context.router.push({pathname: "/servercode"});
              }
            }).catch(err => {
            console.log(err);
            dispatch(set("loading.fragment", false));
          });
        } else {
          console.log("clis已缓存", cidList);
          dispatch(set("loading.fragment", false));

        }
      }
    }
  }

  componentWillMount() {
    // 加载个人作业
    console.log("加载作业");
    const {location, dispatch, user, course} = this.props;
    const cid = _.get(location, "query.cid");
    if (_.isUndefined(cid)) {
      console.error("cid没有定义");
    } else {
      console.log("ajax请求cidlist", cid);
      dispatch(set("loading.fragment", true));
      pget(`/pc/fragment/c/list/mine/${cid}`, this.context.router)
        .then(res => {
          console.log("mine",res);
          if (res.code === 200) {
            console.log("mine challengeList", res);
            dispatch(set(`user.fragment.challenge.mine.${cid}`, res.msg));
          } else {
            this.context.router.push({pathname: "/servercode"});
            // 终止promise，不查其他人了
            throw new BreakSignal("加载mine失败");
          }
        }).then(() => {
        console.log("加载其他人的");
        pget(`/pc/fragment/c/list/other/${cid}`, this.context.router)
          .then(res => {
            dispatch(set("loading.fragment", false));
            if (res.code === 200) {
              console.log("other", res);
              dispatch(set(`user.fragment.challenge.other.${cid}`, res.msg));
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
    console.log("显示", submitId);
    this.context.router.push({
      pathname: "/fragment/c/show",
      query: {submitId: submitId}
    })
  }

  onEditClick(cid, planId) {
    console.log("做作业", cid, planId);
    this.context.router.push({
      pathname: "/fragment/c",
      query: {
        cid: cid,
        planId: planId
      }
    })
  }

  onVoteClick(submitId, canVote) {
    console.log("点赞", submitId, canVote);
    if (canVote) {
      ppost("/pc/fragment/c/vote", {referencedId: submitId, status: 1})
        .then(res => {
          if (_.isEqual(res.code, 200)) {
            console.log("点赞成功");
            this.setState({voteCount: Number(voteCount) + 1, voteStatus: 1})
          }
        }).catch(err => console.log(err));
    }
  }

  render() {
    const {location, user} = this.props;
    const cid = _.get(location, "query.cid", -1);
    const cList = _.get(user, `fragment.challenge.mine.${cid}`, []);
    const renderMine = () => {
      console.log("render mine cList",cid, cList);
      return (
        <div className="mineContainer">
          {cList.map((item, index) => {
            // headImg, upName, upTime, content, voteCount, onEditClick, onShowClick, onVoteClick,
            const {planId, canVote, submitId} = cList[index];
            console.log("render mine list item", item);
            return (
              <WorkItem key={index} {...cList[index]} onShowClick={()=>this.onShowClick(item.submitId)}
                        onEditClick={()=>this.onEditClick(cid,planId)}
                        onVoteClick={()=>this.onVoteClick(submitId,canVote)}/>
            )
          })}
        </div>
      )
    }

    const renderOther = () => {
      const {user} = this.props;
      const cid = _.get(location, "query.cid", -1);
      const cOList = _.get(user, `fragment.challenge.other.${cid}`, []);
      console.log("render other list", cid, cOList);
      return (
        <div className="otherContainer">
          {cOList.map((item, index) => {
            const {canVote, submitId} = cOList[index];
            console.log("render other item", item);
            return (
              <WorkItem key={index} {...cOList[index]} onShowClick={()=>this.onShowClick(item.submitId)}
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
            <div className="title">我的作业</div>
          </div>
          {renderMine()}
        </div>
        <div className="myChallengeContainer">
          <div className="titleContainer">
            <div className="title">其他作业</div>
          </div>
          {renderOther()}
        </div>
      </div>
    )
  }
}
