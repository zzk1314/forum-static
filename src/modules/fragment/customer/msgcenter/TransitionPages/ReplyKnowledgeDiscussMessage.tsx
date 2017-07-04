import * as React from "react";
import { connect } from "react-redux";
import { startLoad, endLoad, alertMsg } from "../../../../../redux/actions"
import { discussKnowledge, loadKnowledge, loadKnowledgeDiscussReply } from "../../async";
import DiscussShow from "../../../components/DiscussShow";
import Discuss from "../../../components/Discuss";
import "./ReplyKnowledgeDiscussMessage.less";
import { TitleBar } from "../../../commons/FragmentComponent";

@connect(state => state)
export default class ReplyKnowledgeDiscussMessage extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      question: '',
      warmupPracticeId: 0,
      commentId: 0,
      data: {},
      showDiscuss: false,
      showKnowledge: false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    const { knowledgeId, commentId } = location.query
    console.log(knowledgeId, commentId)
    dispatch(startLoad())
    loadKnowledgeDiscussReply(commentId).then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.setState({ data: msg, commentId: commentId })
      } else {
        console.error(msg)
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })

    loadKnowledge(knowledgeId).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.setState({ knowledge: res.msg, knowledgeId: knowledgeId })
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })
  }

  handleClickGoKnowledgePage() {
    this.context.router.push({
      pathname: "/fragment/knowledge",
      query: { id: this.props.location.query.knowledgeId }
    })
  }

  reply(item) {
    this.setState({ showDiscuss: true, referenceId: item.knowledgeId, repliedId: item.id })
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

  onSubmit() {
    const { dispatch } = this.props
    const { referenceId, repliedId, content } = this.state
    if(content.length == 0) {
      dispatch(alertMsg('请填写评论'))
      return
    }
    if(content.length > 300) {
      dispatch(alertMsg('您的评论字数已超过300字'))
      return
    }

    let discussBody = { comment: content, referenceId: referenceId }
    if(repliedId) {
      _.merge(discussBody, { repliedId: repliedId })
    }
    dispatch(startLoad())
    discussKnowledge(discussBody).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.context.router.push({
          pathname: '/rise/static/practice/knowledge', query: { id: this.props.location.query.knowledgeId }
        })
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  render() {

    const { knowledge, data, showDiscuss } = this.state

    const renderDiscuss = (discuss) => {
      return (
        <DiscussShow discuss={discuss} reply={() => this.reply(discuss)}/>
      )
    }

    return (
      <div className="replyknowledge-container">
        <div className="question">知识点:{knowledge ? knowledge.knowledge : null}</div>
        <div className="origin-question-tip" onClick={this.handleClickGoKnowledgePage.bind(this)}>点击查看知识点</div>
        <TitleBar content={this.state.data.del === 1 ? `该评论已删除` : `当前评论`}/>
        {renderDiscuss(data)}
        {showDiscuss ?
          <Discuss isReply={true} placeholder={'回复 ' + data.name + ':'}
                   submit={() => this.onSubmit()} onChange={(v) => this.onChange(v)}
                   cancel={() => this.cancel()}/> : null}
      </div>
    )

  }

}
