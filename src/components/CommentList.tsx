import * as React from "react"
import Author from './Author'
import {imgSrc} from "../utils/imgSrc"
import Dialog from "./Confirm"
import "./CommentList.less";
import keyBy = require("lodash/keyBy");
import isUndefined = require("lodash/isUndefined");

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const showMsg = (msg)=> {
      this.setState({snackOpen:true, snackMessage:msg})
    };
    const {comments = [], onDelete, reply, replyId} = this.props;

    const replyClick = (id) => {
      this.setState({
        replyId: id
      });
    };

    return (
      <div>
        <div className="comment-list">
          {comments.map((item, index) =>
            <Comment key={index} {...item} onReply={() => replyClick(item.id)}
                     onDelete={onDelete} replyId={replyId}
                     replyAble={item.id === this.state.replyId ? true : false}
                     reply={reply} index snack={showMsg}/>)}
        </div>
      </div>
    )
  }
}

class Comment extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      alert:false
    }
  }

  render(){
    const {alert} = this.state
    const {
      id, headPic, upName, upTime, index, content, isMine, role,
      replyName, replyContent,
      onDelete, onReply, replyAble, reply
    } = this.props;

    const actions = [
      {
        "label":"再想想",
        "onClick": ()=>this.setState({alert:false}),
      },
      {
        "label":"确定",
        "onClick": ()=>{
          this.setState({alert:false})
          onDelete(id)
        },
        "primary":true,
      }
    ];

    return (
      <div className="comment" key={index}>
        <Author headPic={headPic} upName={upName} upTime={upTime} role={role}/>
        <pre className="commentContent">
          {content}
        </pre>
        {
          replyName ?
          <div>
            <span className="replyContent">
            回复 {replyName}:{replyContent}
            </span>
          </div> : null
        }

        <div className="operationArea">
          <div style={{display: 'inline-block'}}>
            <img className="functionReplyImg" src={imgSrc.reply}/>
            <div className="functionButton" onClick={() => onReply()}>
              回复
            </div>
          </div>
          {isMine ? <div style={{display: 'inline-block'}}>
            <img className="functionDeleteImg" src={imgSrc.delete}/>
            <div className="functionButton" onClick={() => this.setState({alert: true})}>
              删除
            </div>
          </div> : null}
          { replyAble ?
            <div>
              <textarea className="replyText" placeholder={"回复 " + upName + ":"}
                        value={this.state.replyValue}
                        onChange={(e) => {this.setState({replyValue: e.target.value})}}
              >
              </textarea>
              <div className="commentBtn" onClick={() => reply(id, this.state.replyValue)}>回复</div>
            </div>
            : null
          }
        </div>
        <Dialog title='操作确认' content={`确定要删除评论吗？`} open={alert} actions={actions}/>
      </div>
    )
  }
}
