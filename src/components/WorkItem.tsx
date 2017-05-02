import * as React from "react"
import * as _ from "lodash"
import Avatar from 'material-ui/Avatar';
import "./WorkItem.less"


export default class WorkItem extends React.Component<any,any> {

  constructor(props) {
    super(props);
    this.state = {
      filterContent:_.isString(props.content)?props.content.replace(/<\/?.+?>/g,"").replace(/&nbsp;/g,""):""
    }
  }



  render() {
    const {headPic, role, upName, upTime, content, onEditClick, onShowClick, signature, title} = this.props;
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
      </div>
    )
  }
}
