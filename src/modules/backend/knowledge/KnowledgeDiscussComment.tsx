import * as React from 'react'
import { queryKnowledgeDiscuss, replyKnowledgeDiscuss } from './async'
import Discuss from '../../fragment/components/Discuss'
import DiscussDisplayComponent from './components/DiscussDisplayComponent'

export default class KnowledgeDiscussComment extends React.Component {

  constructor () {
    super()
    this.state = {
      discuss: {},
      discussReplies: [],
      replyValue: '',
    }
  }

  async componentDidMount () {
    const { discussId } = this.props.location.query
    let result = await queryKnowledgeDiscuss(discussId)
    this.setState({
      discuss: result.msg.discuss,
      discussReplies: result.msg.discussReplies,
    })
  }

  async onSubmit () {
    const { discuss, replyValue } = this.state
    const { id, knowledgeId, } = discuss
    let result = await replyKnowledgeDiscuss(replyValue, knowledgeId, id)
    if (result.code === 200) {
      const { discussId } = this.props.location.query
      let data = await queryKnowledgeDiscuss(discussId)
      this.setState({
        discuss: data.msg.discuss,
        discussReplies: data.msg.discussReplies,
      })
    }
  }

  onChange (v) {
    this.setState({
      replyValue: v,
    })
  }

  render () {
    const {
      discuss,
      discussReplies,
    } = this.state

    return (
      <div className="knowledge-comment-component"
           style={{ padding: '2rem 2rem' }}>
        <h1>知识点评论</h1>
        <DiscussDisplayComponent key={100}
                                 discuss={discuss}/>
        <br/>
        <h1>评论回复</h1>
        {
          discussReplies.map((discuss, index) => {
            return (
              <DiscussDisplayComponent key={discuss.id}
                                       discuss={discuss}/>
            )
          })
        }
        <Discuss isReply={false}
                 placeholder={`对知识点有疑问？在这里和大家讨论吧（限1000字）`}
                 submit={() => this.onSubmit()}
                 limit={1000}
                 onChange={(v) => this.onChange(v)}
                 showCancelBtn={false}/>
      </div>
    )
  }

}
