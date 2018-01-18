import * as React from 'react'
import './Comment.less'
import { connect } from 'react-redux'
import { loadCommentList, comment, commentReply, loadSubject, vote } from './async'
import { deleteComment } from '../application/async'
import { startLoad, endLoad, alertMsg } from '../../../redux/actions'
import AssetImg from '../../../components/AssetImg'
import { findIndex, remove, isString, truncate, merge } from 'lodash'
import DiscussShow from '../components/DiscussShow'
import { scroll, filterHtmlTag } from '../../../utils/helpers'

@connect(state => state)
export class Comment extends React.Component<any, any> {
  constructor() {
    super()
    this.state = {
      page: 1,
      editDisable: false,
      article: {},
      placeholder: '和作者切磋讨论一下吧',
      filterContent: ''
    }
    this.commentHeight = window.innerHeight
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    dispatch(startLoad())
    loadSubject(location.query.submitId).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ article: res.msg, filterContent: filterHtmlTag(res.msg.content) })
      } else {
        dispatch(endLoad())
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex.msg))
    })
  }


  componentWillUnmount() {
    this.pullElement ? this.pullElement.destroy() : null
  }

  onSubmit() {
    const { dispatch, location } = this.props
    const { content, isReply } = this.state
    if(content) {
      this.setState({ editDisable: true })
      if(isReply) {
        commentReply(location.query.submitId, content, this.state.id).then(res => {
          if(res.code === 200) {
            this.setState({
              commentList: [res.msg].concat(this.state.commentList),
              showDiscuss: false,
              editDisable: false
            })
            if(!this.state.end && this.pullElement) {
              this.pullElement.enable()
            }
            scroll('.comment-header', '.subject-comment')
          } else {
            dispatch(alertMsg(res.msg))
            this.setState({ editDisable: false })
          }
        }).catch(ex => {
          this.setState({ editDisable: false })
          dispatch(alertMsg(ex))
        })
      } else {
        comment(location.query.submitId, content).then(res => {
          if(res.code === 200) {
            this.setState({
              commentList: [res.msg].concat(this.state.commentList), showDiscuss: false, editDisable: false
            })
            if(!this.state.end && this.pullElement) {
              this.pullElement.enable()
            }
            scroll('.comment-header', '.subject-comment')
          } else {
            dispatch(alertMsg(res.msg))
            this.setState({ editDisable: false })
          }
        }).catch(ex => {
          this.setState({ editDisable: false })
          dispatch(alertMsg(ex))
        })
      }

    } else {
      dispatch(alertMsg('请先输入内容再提交'))
    }
  }

  openWriteBox() {
    this.setState({ showDiscuss: true, content: '', isReply: false, placeholder: '和作者切磋讨论一下吧' })
  }

  reply(item) {
    this.setState({
      id: item.id,
      placeholder: '回复 ' + item.name + ':',
      showDiscuss: true,
      isReply: true,
      content: ''
    })
  }

  onDelete(id) {
    const { dispatch, location } = this.props
    dispatch(startLoad())
    deleteComment(id).then(res => {
      if(res.code === 200) {
        loadCommentList(location.query.submitId, 1).then(res => {
          dispatch(endLoad())
          if(res.code === 200) {
            this.setState({ commentList: res.msg.list, page: 1, end: res.msg.end })
          } else {
            dispatch(alertMsg(res.msg))
          }
        }).catch(ex => {
          dispatch(endLoad())
          dispatch(alertMsg(ex))
        })
      }
    })
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

  show(showAll) {
    this.setState({ showAll: !showAll })
  }

  voted(id, voteStatus, voteCount) {
    if(!voteStatus) {
      this.setState({ article: merge(this.state.article, { voteCount: voteCount + 1, voteStatus: true }) })
      vote(id)
    } else {
    }
  }

  render() {
    const { commentList = [], showDiscuss, isReply, end, placeholder, filterContent, wordsCount = 60, showAll } = this.state
    const { title, content, voteStatus, voteCount } = this.state.article
    const { submitId } = this.props.location.query
    const renderCommentList = () => {
      if(commentList && commentList.length !== 0) {
        return (
          commentList.map((item, seq) => {
            return (
              <DiscussShow discuss={item} showLength={100} reply={() => {
                this.reply(item)
              }} onDelete={this.onDelete.bind(this, item.id)}/>
            )
          })
        )
      } else {
        return (<div className="on_message">
          <div className="no_comment">
            <AssetImg url="https://static.iqycamp.com/images/no_comment.png" height={120} width={120}/>
          </div>
          还没有人评论过<br/>点击左下角按钮，发表第一条吧
        </div>)
      }
    }

    const renderTips = () => {
      if(commentList && commentList.length !== 0) {
        if(!end) {
          return (
            <div className="show-more">上拉加载更多消息</div>
          )
        } else {
          return (
            <div className="show-more">已经到最底部了</div>
          )
        }
      }
    }

    const renderWorkContent = () => {
      if(isString(content)) {
          return (
            <pre className="subject-content" dangerouslySetInnerHTML={{ __html: content }}/>
          )
      }
      return null
    }

    return (
      <div>
        <div className="subject-comment">
          <div className="article">
            <div className="article-header">{title}</div>
            {renderWorkContent()}
          </div>
        </div>
      </div>
    )
  }
}
