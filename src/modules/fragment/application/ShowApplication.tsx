import * as React from "react"
import "./ShowApplication.less"
import * as _ from "lodash"
import {connect} from "react-redux"
import {loadApplicationSubmit} from "./async"
import {vote} from "../async"
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import {imgSrc} from "../../../utils/imgSrc"

const style = {
  divider: {
    backgroundColor: "#f5f5f5",
    marginLeft: "-8px"
  }
}
@connect(state => state)
export default class ShowChallenge extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      title: null,
      upName: null,
      upTime: null,
      headImg: null,
      content: null,
      submitId: null,
      type: null,
      isMine: false,
      voteCount: 0,
      voteStatus: null,
      tipVote: false,
      tipDisVote: false,
      applicationId: null,
      planId: null,
      picList: [],
    }
  }

  componentWillMount() {
    // 加载数据
    const {location} = this.props;
    // 获取id
    const submitId = _.get(location, "query.submitId", -1);
    if (!_.isEqual(submitId, -1)) {
      // 获取成功
      loadApplicationSubmit(submitId)
        .then((res) => {
        console.log("submit",res);
          if (res.code === 200) {
            this.setState({
              title: res.msg.title,
              upName: res.msg.upName,
              upTime: res.msg.upTime,
              headImg: res.msg.headImg,
              content: res.msg.content,
              submitId: res.msg.submitId,
              type: res.msg.type,
              isMine: res.msg.isMine,
              voteCount: res.msg.voteCount,
              voteStatus: res.msg.voteStatus,
              planId: res.msg.planId,
              applicationId: res.msg.workId,
              picList: res.msg.picList,
            })
          }
        })
    } else {
      alert("缺少参数");
    }
  }

  goEdit(e) {
    // 进入修改页面
    const {planId, isMine, applicationId} = this.state;
    console.log(isMine,planId,applicationId,this.state);
    if (isMine && planId && applicationId) {
      this.context.router.push({
        pathname: "/fragment/application",
        query: {planId: planId, applicationId: applicationId}
      })
    } else {
      console.error("返回失败，出现异常");
    }
  }

  clickVote(e) {
    // 点赞／或者取消点赞
    const {voteStatus, submitId, voteCount} = this.state;
    if (_.isUndefined(voteStatus) || _.isUndefined(submitId)) {
      // 不能操作
      return
    } else {
      // 开始请求
      let status = 1;
      if (_.isEqual(voteStatus, 1)) {
        // 点赞中，取消点赞
        status = 2;
        return;// 禁止取消点赞
      } else {
        // 点赞
        status = 1;
      }
      vote(submitId,status,2)
        .then(res => {
          if (_.isEqual(res.code, 200)) {
            // 成功
            if (_.isEqual(voteStatus, 1)) {
              // 提示取消成功
              console.log("取消点赞成功")
              this.setState({voteCount: Number(voteCount) - 1, voteStatus: 0})
              this.tipDiVote();
            } else {
              console.log("点赞成功");
              this.setState({voteCount: Number(voteCount) + 1, voteStatus: 1})
              this.tipVote();
            }
          }
        }).catch(err => console.log(err));
    }
  }

  tipDiVote() {
    this.setState({tipDisVote: true});
    setTimeout(() => {
      this.setState({tipDisVote: false});
    }, 1000);
  }

  tipVote() {
    this.setState({tipVote: true});
    setTimeout(() => {
      this.setState({tipVote: false});
    }, 1000);
  }

  render() {
    const {title, upName, upTime, headImg, content, isMine, voteCount, voteStatus, picList = []} = this.state;
    const {location} = this.props;
    const applicationId = _.get(location, "query.applicationId");
    const planId = _.get(location, "query.planId");

    const renderEdit = () => {
      if (isMine) {
        return (<div className="edit" onClick={(e)=>this.goEdit(e)}>
          <img src={imgSrc.edit} style={{float:"left",width:"15px",height:"15px",marginRight:"4px"}}/>
          <span >编辑</span>
        </div>)
      }
    }
    return (
      <div className="showContainer">
        <div className="backContainer">
          <span onClick={()=>{this.context.router.push({
            pathname:'/fragment/application/list',
            query:{
              planId:planId,
              applicationId:applicationId
            }
          })}} className="backBtn"><img src={imgSrc.backList} />返回列表</span>
        </div>
        <Divider style={style.divider}/>
        <div className="showTitleContainer">
          <div className="title">
            <span>{title}</span>
            {renderEdit()}
          </div>
          <div className="author">
            <div className="avatar">
              <Avatar
                src={headImg}
                size={30}
              />
            </div>
            <div className="upInfo">
              <div className="upName">{upName}</div>
              <div className="upTime">{upTime + "上传"}</div>
            </div>
          </div>
        </div>
        <div className="showContentContainer">
          <div className="content">
            <pre>{content}</pre>
          </div>
          <div className="picContainer">
            <ul className="picList">
              {picList.map((pic, sequence) => {
                // 循环存放picList
                return (
                  <li key={sequence} className="picItem">
                    <img src={pic}/>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="voteContainer">
          {this.state.tipVote ?<div className="voteTip">感谢您的肯定，我会继续努力哒</div>: null}
          {this.state.tipDisVote ?<div className="disVoteTip">您已取消点赞</div>: null}
          <Chip
            onTouchTap={(e)=>this.clickVote(e)}
            className="chipRoot"
            style={voteStatus===1?{backgroundColor:"#f7a466"}:{backgroundColor:"#FFF" ,border:"1px solid  #f7a466"}}
          >
            <div style={voteStatus==1?{color:"#FFF"}:{color:"#f7a466"}} className="chip">
              <img src={voteStatus?imgSrc.voteWhite:imgSrc.voted}
                   className="chipIcon"/> {voteStatus == 1 ? "已赞" : "点赞"} <span
              style={voteStatus==1?{borderColor:"#FFF"}:{borderColor:"#f7a466"}} className="chipSplit"/><span
              className="voteCount">{voteCount}</span></div>
          </Chip>
        </div>
      </div>
    )
  }
}
