import * as React from "react"
import "./CommentList.less"
import Avatar from 'material-ui/Avatar';

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {comments = []} = this.props;

    const renderAvatar = (headPic,upName,upTime) => {
      return (
        <div className="author">
          <div className="avatar">
            <Avatar
              src={headPic}
              size={30}
            />
          </div>
          <div className="upInfo">
            <div className="upName">{upName}</div>
            <div className="upTime">{upTime + "上传"}</div>
          </div>
        </div>)
    }

    const renderContent = (content)=>{
      return (
        <div className="commentContent">
          {content}
        </div>
      )
    }

    const renderComment = (comment,index) => {
      const {headPic,upName,upTime,content} = comment;
      return (
        <div className="comment" key={index}>
          {renderAvatar(headPic,upName,upTime)}
          {renderContent(content)}
        </div>)
    }

    return (
      <div className="comment-list">
        {comments.map((item,index)=>renderComment(item,index))}
      </div>
    )
  }
}
