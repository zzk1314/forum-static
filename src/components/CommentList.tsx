import * as React from "react"
import Author from './Author'
import {imgSrc} from "../utils/imgSrc"
import AlertMessage from "./AlertMessage"

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const showMsg = (msg)=> {
      this.setState({snackOpen:true, snackMessage:msg})
    }

    const {comments = [], onDelete} = this.props;
    return (
      <div>
        <div className="comment-list">
          {comments.map((item,index)=><Comment key={index} {...item} onDelete={onDelete} index snack={showMsg}/>)}
        </div>
      </div>

    )
  }
}

class Comment extends React.Component{
  constructor(props){
    super(props);
    this.style = {
      comment:{
        marginBottom: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid #f5f5f5',
      },
      commentContent:{
        marginTop: '18px',
        color: '#666666',
        fontSize: '16px',
        marginLeft: '5px',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
      },
      functionImg:{
        display: 'inline-block',
        marginRight: 5,
        verticalAlign: 'middle',
        marginTop:-2,
        cursor:'pointer',
        height: 15,
      },
      functionButton:{
        display: 'inline-block',
        color: '#55CBCB',
        fontSize: 13,
        cursor:'pointer',
      }
    }
    this.state = {
      alert:false,
    }
  }

  render(){
    const {alert} = this.state
    const {id, headPic,upName,upTime,index,content, isMine, role, onDelete} = this.props;

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
      },

    ]
    return (
      <div style={this.style.comment} key={index}>
        <Author headPic={headPic} upName={upName} upTime={upTime} role={role}/>
        <pre style={this.style.commentContent}>
          {content}
        </pre>
        {isMine?<div>
              <img style={this.style.functionImg} src={imgSrc.delete}/>
              <div style={this.style.functionButton} onClick={()=>this.setState({alert:true})}>
                删除
              </div>
            </div>:null}
        <AlertMessage title='操作确认' content={`确定要删除评论吗？`} open={alert} actions={actions}/>
      </div>
    )
  }
}
