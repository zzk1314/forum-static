import * as React from "react";
import { commentReply, deleteComment, loadArticleData } from "../../async";
import DiscussShow from "../../../components/DiscussShow";
import { truncate, isString } from "lodash";
import "./ReplyCommentMessage.less"
import Discuss from "../../../components/Discuss";
import TitleBar from "../../../commons/TitleBar/TitleBar";

export default class ReplyCommentMessage extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      data: {},
      editDisable: false,
      comment: {},
      showAll: false,
      filterContent: ''
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount = () => {
    const { dispatch, location } = this.props
    const { moduleId, commentId } = location.query
    loadArticleData(moduleId, commentId).then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          data: msg,
          comment: msg.comment,
          filterContent: isString(msg.description) ? res.msg.description.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, "") : ""
        })
      }
    }).catch(e => console.error(e))
  }

  onSubmit() {
    const { dispatch, location } = this.props;
    const { content, repliedId } = this.state;
    if(content) {
      dispatch(startLoad());
      this.setState({ editDisable: true });
      commentReply(location.query.moduleId, location.query.submitId, content, repliedId).then(res => {
        dispatch(endLoad());
        if(res.code === 200) {
          this.goComment();
        } else {
          dispatch(alertMsg(res.msg));
          this.setState({ editDisable: false });
        }
      }).catch(ex => {
        this.setState({ editDisable: false });
        dispatch(endLoad());
        dispatch(alertMsg(ex));
      });
    } else {
      dispatch(alertMsg("请先输入内容再提交"))
    }
  }

  onDelete(id) {
    deleteComment(id).then(res => {
      if(res.code === 200) {
        this.setState({ comment: {} })
      }
    })
  }

  goDetail() {
    const { moduleId, submitId } = this.props.location.query;
    if(moduleId == 2) {
      this.context.router.push({
        pathname: "/fragment/application/comment",
        query: { submitId }
      });
    }

    if(moduleId == 3) {
      // TODO PC版暂时没有小课论坛
    }
  }

  goComment() {
    const { id, integrated, planId } = this.state.data;
    const { submitId, moduleId } = this.props.location.query;
    if(moduleId == 2) {
      this.context.router.push({
        pathname: "/fragment/application/comment",
        query: { id, integrated, planId, submitId }
      });
    }
    if(moduleId == 3) {
      // TODO PC版暂时没有小课论坛
    }
  }

  reply(item) {
    this.setState({ showDiscuss: true, repliedId: item.id })
  }

  onChange(value) {
    this.setState({ content: value })
  }

  cancel() {
    const { showDiscuss } = this.state
    if(showDiscuss) {
      this.setState({ showDiscuss: false })
    }
  }

  render() {
    const { showDiscuss, showAll, filterContent, data } = this.state
    const { topic, description, comment } = data
    const wordsCount = 60

    const renderWorkContent = () => {
      if(isString(description)) {
        if(filterContent.length > wordsCount && !showAll) {
          return (
            <div className="description">
              {truncate(filterContent, { length: wordsCount, omission: '' })}......
            </div>
          )
        } else {
          return (
            <div className="description">{filterContent}</div>
          )
        }
      }
    }

    const renderComments = () => {
      const { comment } = this.state
      return (
        <DiscussShow
          discuss={comment}
          reply={() => {
            this.reply(comment)
          }}
          onDelete={()=>this.onDelete(comment.id)}
        />
      )
    }

    return (
      <div>
        <div className="reply-comment-container" onClick={() => this.cancel()}>
          <div className="page-header">{topic}</div>
          {renderWorkContent()}
          <div className="origin-question-tip" onClick={() => this.goDetail()}>点击查看原题</div>
          <TitleBar content={this.state.data.del === 1 ? `该评论已删除` : `当前评论`}/>
          {renderComments()}
        </div>
        {showDiscuss ?
          <Discuss isReply={true} placeholder={'回复 ' + comment.name + ':'}
                   submit={() => this.onSubmit()} onChange={(v) => this.onChange(v)}
                   cancel={() => this.cancel()}/> : null}
      </div>
    )

  }

}

















