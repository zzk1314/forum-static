import * as React from "react"
import "./ShowApplication.less"
import * as _ from "lodash"
import {connect} from "react-redux"
import {loadApplicationSubmit} from "./async"
import {vote, loadComments, submitComment,VoteType,CommentType, requestAsstComment} from "../async"
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import CommentList from "../../../components/CommentList"
import {imgSrc} from "../../../utils/imgSrc"
import Snackbar from 'material-ui/Snackbar';
import Alert from "../../../components/AlertMessage"

const style = {
  divider: {
    backgroundColor: "#f5f5f5",
    marginLeft: "-8px"
  }
}
@connect(state => state)
export default class ShowApplication extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      data:{},
      commentList: [],
      page: 1,
      hasMore: false,
      snackOpen: false,
      message: "",
      comment: "",
      tipVote: false,
      tipDisVote: false,
      voteCount:0,
      voteStatus:0,
    }
  }

  componentWillMount() {
    // 加载数据
    const {location, dispatch} = this.props;
    // 获取id
    const submitId = _.get(location, "query.submitId", -1);
    if (!_.isEqual(submitId, -1)) {
      // 获取成功
      loadApplicationSubmit(submitId)
        .then((res) => {
          if (res.code === 200) {
            this.setState({
                data:res.msg,
                submitId:submitId,
                voteCount:res.msg.voteCount,
                voteStatus:res.msg.voteStatus,
            })
          }
        }).catch(err => {
        console.log("catch", err);
        if (err instanceof BreakSignal) {
          dispatch(alertMsg(err.title, err.msg));
        } else if (!(err instanceof Stop)) {
          dispatch(alertMsg(err + ""));
        }
      })

      loadComments(CommentType.Application, submitId, this.state.page)
        .then(res => {
          if (res.code === 200) {
            const {list, count} = res.msg;
            if (list.length < count) {
              this.setState({commentList: list, hasMore: true});
            } else {
              this.setState({commentList: list});
            }
          }
        }).catch(err => dispatch(alertMsg(err + "")))
    } else {
      alert("缺少参数");
    }
  }

  goEdit(e) {
    // 进入修改页面
    const {data} = this.state;
    const {location} = this.props
    const planId = _.get(location, "query.planId");
    const applicationId = _.get(location,"query.applicationId");
    const {isMine} = data
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
    const {voteStatus, voteCount, submitId} = this.state;
    const {dispatch} = this.props;
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
      vote(submitId, status, VoteType.Application)
        .then(res => {
          if (_.isEqual(res.code, 200)) {
            // 成功
            if (_.isEqual(voteStatus, 1)) {
              // 提示取消成功
              this.setState({voteCount: Number(voteCount) - 1, voteStatus: 0})
              this.tipDiVote();
            } else {
              this.setState({voteCount: Number(voteCount) + 1, voteStatus: 1})
              this.tipVote();
            }
          }
        }).catch(err => dispatch(alertMsg(err + "")))
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

  showMsg(msg) {
    this.setState({
      snackOpen: true,
      message: msg
    });
  }

  loadMoreContent() {
    const page = this.state.page + 1;
    const {submitId, hasMore} = this.state;
    const {dispatch} = this.props;
    if (_.isNumber(page) && _.isNumber(submitId)) {
      const oldList = _.get(this.state, "commentList");
      if(hasMore) {
        loadComments(CommentType.Application, submitId, page)
          .then(res => {
            if (res.code === 200) {
              const {list, count} = res.msg;
              list.forEach(item => oldList.push(item));
              if(oldList.length<count){
                this.setState({commentList: oldList, page: page});
              } else {
                this.setState({commentList: oldList, page: page,hasMore:false});
              }
            } else {
              dispatch(alertMsg(res.msg));
            }
          })
      } else {
        this.showMsg("没有更多评论了");
      }
    }
  }

  clickSubmitComment() {
    const {comment, commentList, submitId} = this.state;
    const {dispatch} =  this.props;
    if (!comment) {
      this.showMsg("请先输入评论内容再提交!");
      return;
    } else {
      submitComment(CommentType.Application, submitId, comment)
        .then(res => {
          if (res.code == 200) {
            let newArr = [];
            newArr.push(res.msg);
            this.setState({commentList: _.union(newArr, commentList), comment: ""});
          } else {
            dispatch(alertMsg(res.msg));
          }
        }).catch(err => dispatch(alertMsg(err + "")))
    }
  }

  showImgTip(e){
    const {pageX,pageY} = e;
    setTimeout(()=>this.setState({imgTipStyle:{left:pageX+10,top:pageY-10}}),50);

  }

  back(){
    const {location} = this.props;
    const type = _.get(location, "query.type");
    if(type !=='asst'){
      const applicationId = _.get(location, "query.applicationId");
      const planId = _.get(location, "query.planId");
      this.context.router.push({
        pathname:'/fragment/application/list',
        query:{
          planId:planId,
          applicationId:applicationId
        }
      })
    }else{
      const problemId = _.get(location, "query.problemId");
      this.context.router.push({
        pathname:'/asst/application/list',
        query:{
          problemId:problemId,
        }
      })
    }
  }

  onRequestComment() {
    const {location} = this.props;
    // 进入修改页面
    const submitId = _.get(location, "query.submitId");
    requestAsstComment(CommentType.Application, submitId).then(res=>{
      if (res.code === 200) {
        this.setState({message:'求点评成功', snackOpen:true, alert:false})
      }else{
        this.setState({message:res.msg, snackOpen:true, alert:false})
      }
    })
    setTimeout(() => {
      this.setState({message:'', snackOpen:false})
    }, 2000)
  }

  render() {
    const {data, commentList = [],voteCount, voteStatus, alert} = this.state;
    const {title, upName, upTime, headImg, content, isMine, requestComment,
        role, signature,hasMore} = data
    const {location} = this.props;
    const applicationId = _.get(location, "query.applicationId");
    const planId = _.get(location, "query.planId");

    const actions = [
      {
        "label":"取消",
        "onClick": ()=>this.setState({alert:false}),
        "secondary":true,
      },
      {
        "label":"确定",
        "onClick": this.onRequestComment.bind(this),
        "primary":true,
      },

    ]

    const renderEdit = () => {
      if (isMine) {
        return (
            <div>
              <div className="edit" onClick={(e)=>this.goEdit(e)}>
                <img src={imgSrc.edit} style={{float:"left",width:"15px",height:"15px",marginRight:"4px"}}/>
                <span >编辑</span>
              </div>
              {requestComment? <div className="edit" onClick={()=>this.setState({alert:true})}>
                    <img src={imgSrc.requestComment} style={{float:"left",width:"15px",height:"15px",marginRight:"4px"}}/>
                    <span >求点评</span>
                  </div>:null}

            </div>
        )
      }
    }
    return (
      <div className="showContainer">
        <div className="backContainer">
          <span onClick={this.back.bind(this)} className="backBtn"><img src={imgSrc.backList}/>返回列表</span>
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
              <div className="intro">
                <div className="upName">{upName}</div>
                {role==3||role==4?<div className="role"><img src='http://www.iqycamp.com/images/coach.png'/></div>:null}
                {role==5?<div className="role"><img src='http://www.iqycamp.com/images/senior_coach.png'/></div>:null}
                {role==6||role==8?<div className="role"><img src='http://www.iqycamp.com/images/first_coach.png'/></div>:null}
                {role==7?<div className="role"><img src='http://www.iqycamp.com/images/vip.png'/></div>:null}
                <div className="upTime">{upTime + "上传"}</div>
              </div>
              <div className="signature">{signature}</div>
            </div>
          </div>
        </div>
        <div className="showContentContainer">
          <div className="content">
            <pre dangerouslySetInnerHTML={{__html:content}}/>
          </div>
          {/*<div className="picContainer">
            <ul className="picList">
              {picList.map((pic, sequence) => {
                // 循环存放picList
                return (
                  <li key={sequence} className="picItem">
                    <a href={pic} target="_blank"><img  alt="test"  src={pic} onMouseMove={(e)=>this.showImgTip(e)}/></a>
                    <div className="imgClickTip"  style={this.state.imgTipStyle}>点击查看原图</div>
                  </li>
                )
              })}
            </ul>
          </div>*/}
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
        {commentList.length > 0 ?<Divider style={style.divider}/>: null}
        <div className="commentContainer">
          <CommentList comments={commentList}/>
          {hasMore ?<div onClick={()=>this.loadMoreContent()} className="more">展开查看更多评论</div>: null}
          {window.ENV.openComment?<div className="commentSubmit">
            <textarea value={this.state.comment} placeholder="和作者切磋讨论一下吧"
                      onChange={(e)=>{this.setState({comment:e.target.value})}}/>
            <div className="commentBtn" onClick={()=>this.clickSubmitComment()}>评论</div>
          </div>:null}
        </div>
        <Snackbar
          contentStyle={{textAlign:"center"}}
          open={this.state.snackOpen}
          message={this.state.message}
          autoHideDuration={2000}
        />
        <Alert content="确定要使用求点评的机会吗？" open={alert} actions={actions}/>
      </div>
    )
  }
}
