import * as React from 'react'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import WorkItem from '../../../components/WorkItem'
import Divider from 'material-ui/Divider'
import { BreakSignal, Stop } from '../../../utils/request'
import VerticalBarLoading from '../../../components/VerticalBarLoading'
import { set, startLoad, endLoad, alertMsg } from '../../../redux/actions'
import { loadApplicationList, commentCount, loadApplicationListByNickName } from  '../async'
import CommentTip from '../component/CommentTip'
import { TextField, RaisedButton } from 'material-ui'

import './ApplicationList.less'

const style = {
  divider: {
    backgroundColor: '#f5f5f5',
    marginLeft: '-24px',
    marginTop: '-8px',
    width: '120%'
  },
  bigDivider: {
    backgroundColor: '#f5f5f5',
    marginLeft: '-24px',
    width: '120%',
    height: '3px'
  },
  mgDivider: {
    backgroundColor: '#f5f5f5',
    marginLeft: '-24px',
    width: '120%'
  },
  smDivider: {
    backgroundColor: '#f5f5f5'
  },
  paper: {
    width: 120,
    left: '80%',
    position: 'absolute',
    height: 60,
    textAlign: 'center',
    marginTop: -45
  }
}

@connect(state => state)
export default class ApplicationList extends React.Component<any, any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      todayComment: -1,
      totalComment: -1,
      searchNickName: ''
    }
  }

  componentWillMount(problemId) {
    // 加载个人作业
    const { location, dispatch } = this.props
    if(!problemId) {
      problemId = _.get(location, 'query.problemId')
    }

    this.setState({ otherLoading: true })
    loadApplicationList(problemId).then(res => {
      if(res.code === 200) {
        this.setState({ other: res.msg, otherLoading: false })
      } else if(res.code === 401) {
        this.context.router.push({
          pathname: '/login',
          query: {
            callbackUrl: `/asst/application/list?problemId=${problemId}`
          }
        })
      }
    }).catch(err => {
      if(err instanceof BreakSignal) {
        this.setState({ otherLoading: false })
        dispatch(alertMsg(err.title, err.msg))
      } else if(!(err instanceof Stop)) {
        this.setState({ otherLoading: false })
        dispatch(alertMsg(err + ''))
      }
    })

    commentCount().then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.setState({ totalComment: msg.totalComment, todayComment: msg.todayComment })
      }
    })
  }

  componentWillReceiveProps(newProps) {
    const { problemId } = newProps.location.query
    if(this.props.location.query.problemId === problemId) {
      return
    } else {
      this.setState({ search: [] })
      this.componentWillMount(newProps.location.query.problemId)
    }
  }

  onShowClick(submitId) {
    const { location, dispatch } = this.props
    const { pageXOffset = 0, pageYOffset = 0 } = window
    dispatch(set('page.scroll', { x: pageXOffset, y: pageYOffset }))
    const problemId = _.get(location.query, 'problemId')

    window.open(`/asst/application/view?submitId=${submitId}&problemId=${problemId}&type=asst`, '_blank')
  }

  onClickSearchWorks() {
    const { problemId } = this.props.location.query
    const { dispatch } = this.props
    let nickName = document.getElementById('nickName').value
    loadApplicationListByNickName(problemId, nickName).then(res => {
      if(res.code === 200) {
        this.setState({ search: res.msg })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(e => dispatch(alertMsg(e)))
  }

  render() {
    const { other = [], search = [], otherLoading, todayComment, totalComment } = this.state

    const renderSubmits = () => {
      if(search.length > 0) {
        return renderWorkItems(search)
      } else {
        return renderWorkItems(other)
      }
    }

    const renderWorkItems = (submits) => {
      if(submits.length === 0) return
      return (
        <div className="otherContainer">
          {(submits.map((item, index) => {
            return (
              <div key={index}>
                <WorkItem {...item} onShowClick={() => this.onShowClick(item.submitId)}/>
                {index !== submits.length - 1 ? <Divider style={style.divider}/> : null}
              </div>
            )
          }))}
        </div>
      )
    }

    return (
      <div className="applicationListContainer">
        <div className="myApplicationContainer">
          { todayComment >= 0 && totalComment >= 0 ?
            <CommentTip todayComment={todayComment} totalComment={totalComment}/> : null
          }
          <div className="titleContainer">
            <div className="title">应用题</div>
          </div>
          <div className="list">
            {otherLoading ? <VerticalBarLoading/> :
              <div>
                <div className="search-box" onKeyDown={(e) => e.keyCode === 13 ? this.onClickSearchWorks() : null}>
                  <TextField hintText='在这儿输入昵称...' id='nickName'/><br/>
                  <RaisedButton label="点击查询" onClick={this.onClickSearchWorks.bind(this)}/>
                </div>
                <Divider style={style.mgDivider}/>{renderSubmits()}
              </div>
            }
          </div>
          <div className="more">
            <span style={{ color: '#cccccc' }}>没有更多了</span>
          </div>
        </div>
      </div>
    )
  }

}
