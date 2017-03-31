import * as React from "react"
import * as _ from "lodash"
import Avatar from 'material-ui/Avatar';
import "./WorkItem.less"
import {imgSrc} from "utils/imgSrc"


export default class WorkItem extends React.Component<any,any> {

  constructor(props) {
    super(props);
    this.state = {
      filterContent:_.isString(props.content)?props.content.replace(/<\/?.+?>/g,"").replace(/&nbsp;/g,""):""
    }
  }



  render() {
    const {headPic, upName, upTime, content, voteCount, onEditClick, onShowClick,showVote = true} = this.props;
    const { filterContent } = this.state;
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
                  src={headPic}
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
            {showVote?<div className="voteContainer">
              <img src={imgSrc.disVote}/> <span className="vote">{voteCount}</span>
            </div>:null}
          </div>
        </div>
        <div className="workContentContainer">
          <div className="content" dangerouslySetInnerHTML={{__html:content}}/>
          {renderControl()}
        </div>
      </div>
    )
  }
}
