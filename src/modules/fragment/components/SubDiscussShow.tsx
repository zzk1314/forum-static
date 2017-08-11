import * as React from "react";
import { connect } from "react-redux";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import "./SubDiscussShow.less";
import AssetImg from "../../../components/AssetImg";
import AlertMessage from "../../../components/AlertMessage"

@connect(state => state)
export default class DiscussShow extends React.Component <any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super();
    const { showLength, discuss } = props;
    const {
      comment = ''
    } = discuss;
    this.state = {
      show: false,
      filterComment: this.filterText(comment, showLength),
      showAll: this.showAll(comment, showLength),
      filtered: !this.showAll(comment, showLength),
    }

  }

  componentWillReceiveProps(props) {
    const { showLength, discuss } = props;
    const {
      comment = ''
    } = discuss;
    this.setState({
      filterComment: this.filterText(comment, showLength),
      filtered: !this.showAll(comment, showLength)
    })
  }

  filterText(comment, limit) {
    if(comment && limit > 0) {
      return comment.length > limit ? comment.substring(0, limit) + '...' : comment;
    } else {
      return '';
    }
  }

  showAll(comment, limit) {
    let length = comment.length;
    return limit > length;
  }

  delete() {
    const { onDelete } = this.props;
    this.setState({ show: false });
    if(onDelete) {
      onDelete()
    }
  }

  show(showAll) {
    this.setState({ showAll: !showAll })
  }

  render() {
    const { discuss, reply } = this.props;
    const { show, filterComment, showAll, filtered } = this.state;
    const {
      id, name, avatar, discussTime, priority, comment, repliedName,
      role, signature, isMine, repliedDel, del
    } = discuss;
    const alertProps = {
      actions: [
        { label: '再想想', onClick: () => this.setState({ show: false }) },
        { label: '确定', onClick: () => this.delete() }
      ],
    }

    const renderComment = () => {
      return (
        <div className="comment-div">
          <div className="comment-content">{'回复 '}<span>{repliedName}</span>{": "}{showAll ? comment : filterComment}</div>
          {filtered ?<div onClick={()=>this.show(showAll)} className="show-all">{showAll ? '收起' : '展开'}</div>: null}
        </div>
      )
    };

    return (
      <div key={id} className="sub-comment-cell">
        <div className="comment-avatar"><img className="comment-avatar-img" src={avatar}/></div>
        <div className="comment-area">
          <div className="comment-head">
            <div className="comment-name">
              {name}
            </div>
            {role == 3 || role == 4 ?
              <div className="role"><AssetImg url='https://static.iqycamp.com/images/coach.png'/></div> : null}
            {role == 5 || role == 10 ?
              <div className="role"><AssetImg url='https://static.iqycamp.com/images/senior_coach.png'/></div> : null}
            {role == 6 || role == 8 ?
              <div className="role"><AssetImg url='https://static.iqycamp.com/images/first_coach.png'/></div> : null}
            {role == 7 ? <div className="role"><AssetImg url='https://static.iqycamp.com/images/vip.png'/></div> : null}
            <div className="comment-time">{discussTime}</div>
            {priority === 1 ?
              <div className="right">
                <AssetImg type="excellent_answer" height={31} width={32} marginTop={-10} marginRight={-10}/>
              </div> : null
            }
            {
              del === 1 ?
                <div className="right">
                  <AssetImg url="https://static.iqycamp.com/images/fragment/comment_reply_del.png" height={33}
                            width={40} marginTop={-10}/>
                </div> : null
            }
          </div>
          <div className="signature">{signature}</div>
          {renderComment()}
          {
            del === 1 ? null :
              <div className="function-area">
                {isMine ?
                  <div className="function-div" style={{marginRight: 5}}>
                    <AssetImg type="delete" height={15} width={15}/>
                    <div className="function-button click-key" onClick={() => this.setState({show: true})}>
                      删除
                    </div>
                    <AlertMessage actions={alertProps.actions} open={show} content="确认要删除评论吗？"/>
                  </div> : null}
                <div className="function-div" onClick={() => reply()}>
                  <AssetImg type="reply" height={12} width={15}/>
                  <div className="function-button click-key">
                    回复
                  </div>
                </div>
              </div>
          }
        </div>
      </div>
    )
  }
}
