import * as React from "react"
import * as _ from "lodash"
import Avatar from 'material-ui/Avatar';
import "./WorkItem.less"
import Snackbar from 'material-ui/Snackbar';
import Alert from "./AlertMessage";
import {requestAsstComment} from  "../modules/fragment/async"


export default class WorkItem extends React.Component<any,any> {

  constructor(props) {
    super(props);
    this.state = {
      alert:false,
      message:'',
      snackOpen:false,
      filterContent:_.isString(props.content)?props.content.replace(/<\/?.+?>/g,"").replace(/&nbsp;/g,""):""
    }
  }

  onRequestComment() {
    // 进入修改页面
    const {submitId} = this.state
    const {commentType} = this.props
    requestAsstComment(commentType, submitId).then(res => {
      if (res.code === 200) {
        this.setState({message: '求点评成功', snackOpen: true, alert: false})
      } else {
        this.setState({message: res.msg, snackOpen: true, alert: false})
      }
    })
    setTimeout(() => {
      this.setState({message: '', snackOpen: false})
    }, 2000)
  }

  render() {
    const {headPic, role, upName, upTime, content, onEditClick, onShowClick, signature, title, requestComment,submitId} = this.props;
    const { filterContent,alert } = this.state;
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
            {requestComment?<span className="show" style={{marginRight:5}} onClick={()=>this.setState({alert:true,submitId})}>求点评</span>:null}
            <span className="show" onClick={onShowClick}>查看</span>/<span onClick={onEditClick}
                                                                         className="edit">修改</span>
          </div>)
      }
    }

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

    return (
      <div className="workItemContainer">
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
        <Alert content="确定要使用求点评的机会吗？" open={alert} actions={actions}/>
      </div>
    )
  }
}
