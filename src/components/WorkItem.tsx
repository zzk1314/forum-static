import * as React from "react"
import * as _ from "lodash"
import Avatar from 'material-ui/Avatar';
import "./WorkItem.less"
import Snackbar from 'material-ui/Snackbar';
import Alert from "./AlertMessage";
import {requestAsstComment} from  "../modules/asst/async"
import {set, startLoad, endLoad, alertMsg} from "../redux/actions"
import {connect} from "react-redux";

@connect(state => state)
export default class WorkItem extends React.Component<any,any> {

  constructor(props) {
    super(props);
    this.state = {
      alert:false,
      message:'',
      snackOpen:false,
      filterContent:_.isString(props.content)?props.content.replace(/<\/?.+?>/g,"").replace(/&nbsp;/g,""):"",
      request:false,
    }
  }

  componentWillMount(){
    const {request} = this.props

    this.setState({request})
  }

  componentWillReceiveProps(newProps){
    if(newProps.request !== this.props.request){
      this.setState({request:newProps.request});
    }
  }

  click(submitId){
    const {dispatch, requestCommentCount} = this.props
    const {request} = this.state
    if(request){
      dispatch(alertMsg('本练习已经使用过求点评啦'));
      return;
    }
    if(requestCommentCount===0){
      dispatch(alertMsg('本小课求点评次数已用完'));
      return;
    }
    this.setState({alert:true,submitId})
  }

  onRequestComment() {
    // 进入修改页面
    const {submitId} = this.state
    const {commentType} = this.props
    requestAsstComment(commentType, submitId).then(res => {
      if (res.code === 200) {
        this.setState({message: '教练已经收到你的请求啦，点评后会在消息中心通知你的', snackOpen: true, alert: false, request:true})
      } else {
        this.setState({message: res.msg, snackOpen: true, alert: false})
      }
    })
    setTimeout(() => {
      this.setState({message: '', snackOpen: false})
    }, 2000)
  }

  render() {
    const {headPic, role, upName, upTime, content, onEditClick, onShowClick, signature, title, requestCommentCount, submitId} = this.props;
    const { alert,request } = this.state;
    const renderControl = () => {
      if (_.isUndefined(onEditClick)) {
        // 不修改，是其他人的作业
        return (
          <div className="controlContainer">
            <span className="show" onClick={onShowClick}>查看全文</span>
          </div>
        )
      } else {
        // 可修改，是自己的作业
        return (
          <div className="controlContainer">
            {!request && requestCommentCount!=null && requestCommentCount>0?<span className="show" style={{marginRight:5}} onClick={()=>this.click(submitId)}>求点评</span>:null}
            {request || (requestCommentCount!=null && requestCommentCount===0)?<span className="show disabled" style={{marginRight:5}} onClick={()=>this.click(submitId)}>求点评</span>:null}
            <span className="show" onClick={onShowClick}>查看</span>/<span onClick={onEditClick}
                                                                         className="edit">修改</span>
          </div>)
      }
    }

    const actions = [
      {
        "label":"再想想",
        "onClick": ()=>this.setState({alert:false}),
      },
      {
        "label":"确定",
        "onClick": ()=>this.onRequestComment(),
        "primary":true,
      },

    ]


    return (
      <div className="workItemContainer">
        {request?
        <div className="requestComment">
          <img height={26} width={26} src="https://www.iqycamp.com/images/request_comment_star.png"/>
        </div>
        :null}
        <div className="titleArea">
          {title ?
              <div className="title">{title}</div>:null
          }
          <div className="leftArea">
            <div className="author">
              <div className="avatar">
                <Avatar
                  src={headPic}
                  size={30}
                />
              </div>
              <div className="upInfo">
                <div className="intro">
                  <div className="upName">{upName}</div>
                  {role==3||role==4?<div className="role"><img src='https://www.iqycamp.com/images/coach.png'/></div>:null}
                  {role==5||role==10?<div className="role"><img src='https://www.iqycamp.com/images/senior_coach.png'/></div>:null}
                  {role==6||role==8?<div className="role"><img src='https://www.iqycamp.com/images/first_coach.png'/></div>:null}
                  {role==7?<div className="role"><img src='https://www.iqycamp.com/images/vip.png'/></div>:null}
                  <div className="upTime">{upTime + "上传"}</div>
                </div>
                <div className="signature">{signature}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="workContentContainer">
          <div className="content" dangerouslySetInnerHTML={{__html:content}}/>
          {renderControl()}
        </div>
        <Snackbar
            contentStyle={{textAlign:"center"}}
            open={this.state.snackOpen}
            message={this.state.message}
            autoHideDuration={2000}
        />
        <Alert title='操作确认' content={`当前小课还剩${requestCommentCount}次请求教练点评的机会，确定要在这次使用吗？`} open={alert} actions={actions}/>
      </div>
    )
  }
}
