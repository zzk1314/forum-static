import * as React from "react"
import Author from './Author'
import {deleteComment} from "../modules/fragment/async"
import Snackbar from "material-ui/Snackbar"
import {imgSrc} from "../utils/imgSrc"

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackOpen:false,
      snackMessage:'',
    }
  }

  render() {
    const showMsg = (msg)=> {
      this.setState({snackOpen:true, snackMessage:msg})
    }

    const {comments = []} = this.props;
    return (
      <div>
        <div className="comment-list">
          {comments.map((item,index)=><Comment key={index} {...item} index snack={showMsg}/>)}
        </div>
        <Snackbar
            open={this.state.snackOpen}
            message={this.state.snackMessage}
            autoHideDuration={2000}
        />
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
      },
      functionButton:{
        display: 'inline-block',
        color: '#55CBCB',
        fontSize: 13,
        cursor:'pointer',
      }
    }
    this.state = {
      del:false,
    }
  }

  onDelete(id){
    const {snack} = this.props;
    deleteComment(id).then(res => {
      if(res.code === 200){
        this.setState({del:true})
        snack('删除成功')
      }else{
        this.setState({del:false})
        snack(res.msg)
      }
    })
  }

  render(){
    const {del} = this.state
    const {headPic,upName,upTime,index,content, isMine, role, id} = this.props;
    return (
    del? null:
      <div style={this.style.comment} key={index}>
        <Author headPic={headPic} upName={upName} upTime={upTime} role={role}/>
        <pre style={this.style.commentContent}>
          {content}
        </pre>
        {isMine?<div>
              <img style={this.style.functionImg} src={imgSrc.edit}/>
              <div style={this.style.functionButton} onClick={this.onDelete.bind(this, id)}>
                删除
              </div>
            </div>:null}
      </div>
    )
  }
}
