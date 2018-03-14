import * as React from 'react'
import { connect } from 'react-redux'
import './PracticeView.less'
import { highlight, deleteWarmupDiscuss, loadCurrentWarmup, ignoreDiscuss, replyDiscuss, loadTargetDiscuss } from './async'
import { Stop } from '../../../utils/request'
import { set, startLoad, endLoad, alertMsg } from '../../../redux/actions'
import Subheader from 'material-ui/Subheader'
import AlertMessage from '../../../components/AlertMessage'
import Confirm from '../../../components/Confirm'
import { FlatButton, MenuItem, RaisedButton, SelectField } from 'material-ui'
import * as _ from 'lodash'

const intervals = [
  { id: 0, value: '今天' },
  { id: 1, value: '一天前' },
  { id: 2, value: '两天前' },
  { id: 3, value: '三天前' },
  { id: 4, value: '四天前' },
  { id: 5, value: '五天前' },
  { id: 6, value: '六天前' },
  { id: 7, value: '七天前' }
]

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
      current: 0,
      discussList: [],
      interval: { id: 0, value: '今天' },
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
    const { dispatch } = this.props
    const { interval } = this.state
    dispatch(startLoad())
    loadTargetDiscuss(interval.id).then(res => {
      const { code, msg } = res
      if(code === 200) {
        if(res.msg.length > 0) {
          loadCurrentWarmup(res.msg[0].id, interval.id).then(res1 => {
            dispatch(endLoad())
            if(res1.code === 200) {
              this.setState({
                data: res1.msg,
                discussList: res1.msg.discussList,
                warmupList: res.msg
              })
            } else {
              dispatch(alertMsg(res1.msg))
            }
          })
        } else {
          dispatch(endLoad())
          dispatch(alertMsg('暂无数据'))
        }
      } else {
        dispatch(endLoad())
        dispatch(alertMsg(msg))
      }
    })
  }

  loadTargetDate(interval) {
    console.log(interval)
    const { dispatch } = this.props
    dispatch(startLoad())
    loadTargetDiscuss(interval.id).then(res => {
      const { code, msg } = res
      if(code === 200) {
        if(res.msg.length > 0) {
          loadCurrentWarmup(res.msg[0].id, interval.id).then(res1 => {
            dispatch(endLoad())
            if(res1.code === 200) {
              this.setState({
                data: res1.msg,
                discussList: res1.msg.discussList,
                warmupList: res.msg
              })
            } else {
              dispatch(alertMsg(res1.msg))
            }
          })
        } else {
          dispatch(endLoad())
          dispatch(alertMsg('暂无数据'))
        }
      } else {
        dispatch(endLoad())
        dispatch(alertMsg(msg))
      }
    })
  }

  loadWarmUp() {
    const { current, warmupList, interval } = this.state
    const { dispatch } = this.props
    dispatch(startLoad())
    loadCurrentWarmup(warmupList[current + 1].id, interval.id).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          data: msg,
          discussList: msg.discussList,
          current: current + 1
        })
      } else {
        dispatch(alertMsg(msg))
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
        this.setState({ discussList: newArray, showReply: false })
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
    const { dispatch } = this.props
    const { data, showId } = this.state
    highlight(showId).then(res => {
      if(res.code === 200) {
        dispatch(alertMsg('提交成功'))
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
    const { dispatch } = this.props
    const { discussList, discussId, interval } = this.state
    dispatch(startLoad())
    ignoreDiscuss(discussId, interval.id).then(res => {
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
    const { data, showReply, interval, warmupList, current } = this.state
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
      const { question, choiceList = [] } = practice
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

    /*加载7天选择期*/
    const renderSevenDays = () => {
      console.log(interval)
      return (
        <div>
          <div className="query-date">选择查询日期</div>
          <div className="select-field">
            <SelectField
              value={interval} style={{ 'text-align': 'center' }}
              onChange={(event, index, value) => {
                this.setState({
                  interval: value,
                  current: 0,
                  warmupList: [],
                  data: {},
                  discussList: []
                })
                this.loadTargetDate(value)
              }}
            >
              {
                intervals.map((item, idx) => {
                  return (
                    <MenuItem key={idx} value={item} primaryText={item.value}/>
                  )
                })
              }
            </SelectField>
          </div>
        </div>
      )
    }

    const renderShowNext = () => {
      return (
        <div className="next-display">
          {current + 1}/{warmupList.length}
          <RaisedButton primary={true} style={{ marginLeft: 30 }} label='下一题' onClick={() => {this.loadWarmUp()}}/>
        </div>
      )
    }

    return (
      <div className="warm-up-analysis">
        {renderSevenDays()}
        {!_.isEmpty(warmupList) && renderShowNext()}
        {!_.isEmpty(warmupList) && <div><Subheader>选择题</Subheader>{questionRender(data)}</div>}
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
