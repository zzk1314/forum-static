import * as React from "react";
import { connect } from "react-redux";
import { startLoad, endLoad, alertMsg } from "../../../../../redux/actions";
import { loadWarmUp, loadWarmUpDiscussReply } from "../../async";
import { discuss } from "../../../warmup/async";
import DiscussShow from "../../../components/DiscussShow";
import "./ReplyWarmupDiscussMessage.less"
import Discuss from "../../../components/Discuss";
import * as _ from "lodash";
import TitleBar from "../../../commons/TitleBar/TitleBar";

@connect(state => state)
export default class ReplyWarmupDiscussMessage extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      question: '',
      warmupPracticeId: 0,
      commentId: 0,
      data: {},
      showDiscuss: false
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount(props) {
    const { dispatch, location } = props || this.props
    const { warmupPracticeId } = location.query
    const { commentId } = location.query
    dispatch(startLoad())
    loadWarmUpDiscussReply(commentId).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.setState({ data: msg, commentId })
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })

    loadWarmUp(warmupPracticeId).then(res => {
      dispatch(endLoad())
      const { code, msg } = res

      if(code === 200) {
        let { question } = msg
        if(question.length > 16) {
          question = question.substring(0, 16) + "......"
        }
        this.setState({ question, warmupPracticeId })

      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  goOrigin() {
    this.context.router.push({
      pathname: '/fragment/warmup/new/analysis', query: this.props.location.query
    })
  }

  reply(item) {
    this.setState({ showDiscuss: true, referenceId: item.warmupPracticeId, repliedId: item.id })
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

    discuss(discussBody).then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.context.router.push({
          pathname: '/fragment/warmup/new/analysis',
          query: this.props.location.query
        })
      }
      else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(alertMsg(ex))
    })
  }

  render() {
    const { question, data, showDiscuss } = this.state
    const renderDiscuss = (discuss) => {
      return (
        <DiscussShow discuss={discuss} reply={() => this.reply(discuss)}/>
      )
    }
    return (
      <div>
        <div className="reply-warmup-container" onClick={() => this.cancel()}>
          <div className="question">{question}</div>
          <div className="origin-question-tip" onClick={this.goOrigin.bind(this)}>点击查看原题</div>
          <TitleBar content={this.state.data.del === 1 ? `该评论已删除` : `当前评论`}/>
          {renderDiscuss(data)}
        </div>
        {showDiscuss ? <Discuss isReply={true} placeholder={'回复 ' + data.name + ':'}
                                submit={() => this.onSubmit()} onChange={(v) => this.onChange(v)}
                                cancel={() => this.cancel()}/> : null}
      </div>
    )
  }

}
