import * as React from 'react'
import { voteKnowledgeDiscuss } from '../async'
import { Dialog, RaisedButton } from 'material-ui'

import './KnowledgeComments.less'

export default class KnowledgeComments extends React.Component {

  constructor () {
    super()
    this.state = {
      discusses: [
        {
          id: 1,
          headImgUrl: 'http://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ayic3SEaztBgIHFjfNZCFnvibW7bURBmYJIwUIpyice6aELS6zATiaepeeu1lMaggayc9Wpboj9nSZ5Nib/132',
          nickName: '三十文',
          publishTime: '2018-03-28',
          comment: '神秘人神秘人神秘人',
          priority: false,
        },
      ],
      actions: [],
      showDialog: false,
      dialogContent: '',
      toggleDiscussId: 0,
    }
  }

  componentWillMount () {
    const { data } = this.props
    this.setState({
      discusses: data,
      actions: [
        <RaisedButton label={'取消'} onClick={() => this.setState({ showDialog: false })}/>,
        <RaisedButton label={'确认'} primary={true} style={{ marginLeft: '20px' }} onClick={() => {
          this.togglePriority()
          this.setState({ showDialog: false })
        }}/>,
      ],
    })
  }

  componentWillReceiveProps (nextProps) {
    if (JSON.stringify(nextProps.data) != JSON.stringify(this.props.data)) {
      this.props = nextProps
      this.setState({
        discusses: this.props.data,
      })
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (JSON.stringify(nextProps) == JSON.stringify(this.props) && JSON.stringify(nextState) == JSON.stringify(this.state)) {
      return false
    } else {
      return true
    }
  }

  async togglePriority () {
    let discussId = this.state.toggleDiscussId
    const { discusses = [] } = this.state
    let tempDiscusses = JSON.parse(JSON.stringify(discusses))
    let tempPriority
    tempDiscusses.forEach((discuss, index) => {
      if (discuss.id === discussId) {
        tempPriority = !discuss.priority
        discuss.priority = tempPriority
      }
    })
    let res = await voteKnowledgeDiscuss(discussId, tempPriority)
    if (res.code === 200) {
      this.setState({
        discusses: tempDiscusses,
      })
    }
  }

  render () {
    const { discusses, actions, showDialog, dialogContent } = this.state

    return (
      <div className="knowledge-discuss-component">
        {
          discusses.map((discuss, index) => {
            return (
              <div key={index} className="dicuss-item">
                <img className="headimage" src={discuss.headImgUrl}></img>
                <div className="nickname">{discuss.nickName}</div>
                <div className="submit-time">{discuss.publishTime}</div>
                <div className="comment">{discuss.comment}</div>
                <div className="vote" onClick={() => {
                  this.setState({
                    toggleDiscussId: discuss.id,
                    showDialog: true,
                    dialogContent: discuss.priority ? '确认将该评论取消加精么' : '确认将该条评论进行加精么',
                  })
                }}>{discuss.priority ? '取消加精' : '加精'}</div>
              </div>
            )
          })
        }
        {<Dialog title={dialogContent} actions={actions} open={showDialog}></Dialog>}
      </div>
    )
  }

}
