import * as React from "react"
import * as _ from "lodash"
import Avatar from 'material-ui/Avatar';
import "./WorkItem.less"


export default class WorkItem extends React.Component<any,any> {

  constructor(props) {
    super(props);

  }


  render() {
    const {headImg, upName, upTime, content, voteCount, onEditClick, onShowClick, onVoteClick} = this.props;
    const renderControl = () => {
      if (_.isUndefined(onEditClick)) {
        // 不修改，使其他人的作业
        return (
          <div className="controlContainer">
            <span className="show" onClick={onShowClick}>查看全文</span>
          </div>
        )
      } else {
        // 可修改，是自己的作业
        return (
          <div className="controlContainer">
            <span className="show" onClick={onShowClick}>查看</span>/<span onClick={onEditClick}
                                                                         className="edit">修改</span>
          </div>)
      }
    }
    return (
      <div className="workItemContainer">
        <div className="titleArea">
          <div className="leftArea">
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
          <div className="rightArea">
            <div className="voteContainer">
              <img src={`http://www.confucius.mobi/images/pcDisVote.png`}/> <span className="vote">{voteCount}</span>
            </div>
          </div>
        </div>
        <div className="workContentContainer">
          <div className="content">
            {content}
          </div>
          {renderControl()}
        </div>
      </div>
    )
  }
}
