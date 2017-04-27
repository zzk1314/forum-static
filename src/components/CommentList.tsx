import * as React from "react"
import Author from './Author'

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {comments = []} = this.props;
    return (
      <div className="comment-list">
        {comments.map((item,index)=><Comment key={index} {...item} index />)}
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
      }
    }
  }

  render(){
    const {headPic,upName,upTime,index,content} = this.props;
    return (
      <div style={this.style.comment} key={index}>
        <Author headPic={headPic} upName={upName} upTime={upTime}/>
        <pre style={this.style.commentContent}>
          {content}
        </pre>
      </div>
    )
  }
}
