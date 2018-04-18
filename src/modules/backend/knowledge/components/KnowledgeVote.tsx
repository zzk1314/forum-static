import * as React from 'react'
import { voteKnowledgeDiscuss } from '../async'
import DiscussDisplayComponent from './DiscussDisplayComponent'

export default class KnowledgeVote extends React.Component {

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
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  componentWillMount () {
    const { data } = this.props
    this.setState({
      discusses: data,
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

  render () {
    const { discusses, } = this.state

    return (
      <div>
        {
          discusses.map((discuss, index) => {
            return (
              <DiscussDisplayComponent key={index}
                                       discuss={discuss}
                                       showVote={true}
                                       showReply={true}/>
            )
          })
        }
      </div>
    )
  }

}
