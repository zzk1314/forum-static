import * as React from 'react'
import { connect } from 'react-redux'
import './PracticeView.less'
import { highlight, deleteWarmupDiscuss, loadCurrentWarmup, ignoreDiscuss, replyDiscuss } from './async'
import { BreakSignal, Stop } from '../../../utils/request'
import { set, startLoad, endLoad, alertMsg } from '../../../redux/actions'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import _ from 'lodash'
import AlertMessage from '../../../components/AlertMessage'
import Confirm from '../../../components/Confirm'
import { FlatButton } from 'material-ui'

@connect(state => state)
export default class PracticeView extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {},
      showDiscuss: false,
      repliedId: 0,
      warmupPracticeId: 0,
      delMsgOpen: false,
      nodelAuthority: false,
      delDiscussId: 0,
      discussList: [],
      showConfirm: false,
      showIgnore: false,
      showId: '',
      discussId: '',
      showReply: false,
      showConfirmModal: {
        title: '提示',
        content: '确认加精？',
        actions: [{
          label: '确认',
          onClick: () => {
            this.setState({ showConfirm: false })
            this.confirmHighlight()
          }
        },
          {
            label: '取消',
            onClick: () => this.setState({ showConfirm: false })
          }
        ]
      },
      showIgnoreModal: {
        title: '提示',
        content: '确认忽略？',
        actions: [{
          label: '确认',
          onClick: () => {
            this.setState({ showIgnore: false })
            this.ignore()
          }
        },
          {
            label: '取消',
            onClick: () => this.setState({ showIgnore: false })
          }
        ]
      }

    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { location } = this.props
    const { id, interval } = location.query
    loadCurrentWarmup(id, interval).then(res => {
      if(res.code === 200) {
        this.setState({
          data: res.msg,
          discussList: res.msg.discussList
        })
      } else {
        throw new BreakSignal(res.msg, '加载当前问题失败')
      }
    })
  }

  onSubmit() {
    const { dispatch } = this.props
    const { repliedId, warmupPracticeId, content } = this.state
    if(_.isEmpty(content)) {
      dispatch(alertMsg('作业还没写完哦', '提示'))
      return
    }
    const param = { comment: content, repliedId, warmupPracticeId }
    replyDiscuss(param).then(res => {
      if(res.code === 200) {
        let newArray = []
        this.state.discussList.map(discuss => {
          if(discuss.id !== repliedId) {
            newArray.push(discuss)
          }
        })
        this.setState({ discussList: newArray,showReply:false })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch((err) => {
      dispatch(alertMsg(err))
    })
  }

  highlight(id) {
    this.setState({
      showConfirm: true,
      showId: id
    })
  }

  confirmHighlight() {
    const { data, showId } = this.state
    highlight(showId).then(res => {
      if(res.code === 200) {
        this.showAlert('提交成功')
      }
      data.discussList.forEach((item) => {
        if(item.id === showId) {
          _.set(item, 'priority', 1)
        }
      })
    })
  }

  reply(warmupPracticeId, repliedId) {
    this.setState({
      showReply: true,
      warmupPracticeId,
      repliedId
    })

  }

  onClickDelButton(discussId) {
    this.setState({ delMsgOpen: true, delDiscussId: discussId })
  }

  deleteComment(id) {
    this.setState({ delMsgOpen: false })
    deleteWarmupDiscuss(id).then(res => {
      if(res.code === 200) {
        let newArray = []
        this.state.discussList.map(discuss => {
          if(discuss.id !== id) {
            newArray.push(discuss)
          }
        })
        this.setState({ discussList: newArray })
      } else if(res.code === 201) {
        this.setState({ nodelAuthority: true })
      }
    }).catch(e => {
      console.error(e)
    })
  }

  ignore() {
    const { dispatch, location } = this.props
    const { discussList, discussId } = this.state
    const { interval } = location.query
    dispatch(startLoad())
    ignoreDiscuss(discussId, interval).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        let newArray = []
        discussList.map(discuss => {
          if(discuss.id !== discussId) {
            newArray.push(discuss)
          }
        })
        this.setState({ discussList: newArray })
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  render() {
    const { data, showReply } = this.state
    const { id } = data
    let actions = [
      {
        label: '确认',
        onClick: this.deleteComment.bind(this, this.state.delDiscussId)
      },
      {
        label: '取消',
        onClick: () => {
          this.setState({ delMsgOpen: false })
        }
      }
    ]

    const renderDoWorkArea = () => {
      return (
        <div className="doWorkArea">
          <textarea cols={30} rows={10} onChange={(e) => this.setState({ content: e.currentTarget.value })}/>
          <div className="submitBtnGroup">
            <FlatButton style={{ borderRadius: '4px', width: '120px', height: '42px', margin: '0 90px' }}
                        backgroundColor="#55cbcb" labelStyle={{ color: '#FFF' }} label="提交"
                        onClick={(e) => this.onSubmit()}/>
          </div>
        </div>
      )
    }

    const questionRender = (practice) => {
      const { id, question, choiceList = [] } = practice
      return (
        <div className="intro-container">
          <div className="question">
            <div dangerouslySetInnerHTML={{ __html: question }}></div>
          </div>
          <div className="choice-list">
            {choiceList.map((choice, idx) => choiceRender(choice, idx))}
          </div>
          <div className="analysis">
            <div className="analysis-title">【解析】</div>
            <div className="context"
                 dangerouslySetInnerHTML={{ __html: practice ? practice.analysis : '' }}></div>
          </div>
          <div className="discuss">
            <a name="discuss"/>
            <div className="discuss-title-bar"><span className="discuss-title">问答</span></div>
            {this.state.discussList.map((discuss, idx) => discussRender(discuss, idx))}
            <div className="discuss-end">
              你已经浏览完所有的讨论啦
            </div>
          </div>
        </div>
      )
    }

    const discussRender = (discuss, idx) => {
      const { id, name, avatar, comment, discussTime, repliedName, repliedComment, warmupPracticeId, priority } = discuss
      return (
        <div className="comment-cell" key={id}>
          <div className="comment-avatar"><img className="comment-avatar-img" src={avatar}/></div>
          <div className="comment-area">
            <div className="comment-head">
              <div className="comment-name">{name}</div>
              <div className="comment-time">{discussTime}</div>
              <div className="right">
                <div className="function-button" onClick={() => {
                  this.setState({ discussId: discuss.id, showIgnore: true })
                }
                }>
                  忽略
                </div>
                <div className="function-button" onClick={() => this.reply(warmupPracticeId, id)}>
                  回复
                </div>
                {priority === 0 ?
                  <div className="function-button" onClick={() => this.highlight(id)}>
                    加精
                  </div> :
                  <div className="function-button" style={{ color: 'black', cursor: 'auto' }}>
                    已加精
                  </div>
                }
              </div>
            </div>
            <div className="comment-content">{comment}</div>
            {repliedComment ?
              <div className="comment-replied-content">{'回复 '}{repliedName}:{repliedComment}</div> : null}
          </div>
          <div className="comment-hr"/>

        </div>
      )
    }

    const choiceRender = (choice, idx) => {
      const { id, subject } = choice
      return (
        <div key={id} className={`choice${choice.selected ? ' selected' : ''}`}>
          <span className={`text${choice.isRight ? ' right' : ' wrong'}`}>{subject}</span>
        </div>
      )
    }

    return (
      <div className="warm-up-analysis">
        <Subheader>选择题</Subheader>
        {questionRender(data)}
        {showReply && renderDoWorkArea()}
        <AlertMessage open={this.state.delMsgOpen} content="是否删除该条评论" actions={actions}/>
        <AlertMessage open={this.state.nodelAuthority} content="对不起，暂时不能删除非助教评论"
                      handleClose={() => this.setState({ nodelAuthority: false })}/>

        <Confirm open={this.state.showIgnore} {...this.state.showIgnoreModal}
                 handlerClose={() => this.setState({ showIgnoreModal: false })}/>


        <Confirm open={this.state.showConfirm} {...this.state.showConfirmModal}
                 handlerClose={() => this.setState({ showConfirmtModal: false })}/>
      </div>
    )
  }
}
