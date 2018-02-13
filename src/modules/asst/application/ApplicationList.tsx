import * as React from 'react'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import WorkItem from '../../../components/WorkItem'
import Divider from 'material-ui/Divider'
import { BreakSignal, Stop } from '../../../utils/request'
import VerticalBarLoading from '../../../components/VerticalBarLoading'
import { set, startLoad, endLoad, alertMsg } from '../../../redux/actions'
import { loadApplicationList, commentCount, loadApplicationListByNickName, loadApplicationListByMemberId, loadClassNameAndGroup, loadSubmitByProblemIdClassNameGroup } from '../async'
import CommentTip from '../component/CommentTip'
import { TextField, RaisedButton, SelectField, MenuItem } from 'material-ui'

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
      searchNickName: '',
      classNames: [],
      groupIds: [],
      className: '',
      groupId: '',
      selected: false,
      classSearch: false,
      isClick:false
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

    loadClassNameAndGroup().then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          classNames: msg.className,
          groupIds: msg.groupIds
        })
      }
    })
  }


  componentWillReceiveProps(newProps) {
    const { problemId } = newProps.location.query
    if(this.props.location.query.problemId === problemId) {
      return
    } else {
      this.setState({ search: [],selected:false,classSearch:false,isClick:false,className:'',groupId:''})
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
    const { className, groupId, classSearch } = this.state
    if(classSearch) {
      if(className != '' && groupId != '') {
        loadSubmitByProblemIdClassNameGroup(problemId, className, groupId).then(res => {
          const { code, msg } = res
          if(code === 200) {
            this.setState({
              isClick:true,
              search: msg
            })
          }
        })
      }
      else {
        dispatch(alertMsg('请选择班级和小组'))
      }
    }
    else {
      let nickName = document.getElementById('nickName').value
      let memberId = document.getElementById('memberId').value
      if(nickName && !memberId) {
        loadApplicationListByNickName(problemId, nickName).then(res => {
          if(res.code === 200) {
            this.setState({ search: res.msg })
          } else {
            dispatch(alertMsg(res.msg))
          }
        }).catch(e => dispatch(alertMsg(e)))
      } else if(!nickName && memberId) {
        loadApplicationListByMemberId(problemId, memberId).then(res => {
          if(res.code === 200) {
            this.setState({ search: res.msg })
          } else {
            dispatch(alertMsg(res.msg))
          }
        })
      }
      else {
        dispatch(alertMsg('昵称和训练营学号只能选择一个'))
      }
    }
  }

  render() {
    const { other = [], search = [], otherLoading, todayComment, totalComment, selected, classSearch,isClick} = this.state
    const renderSubmits = () => {
      if(isClick) {
        return renderWorkItems(search)
      }
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

    /**
     * 加载ClassName
     */
    const renderClassName = () => {
      const { className, classNames } = this.state
      return (
        <div>
          <SelectField
            floatingLabelText="选择班级名" maxHeight={300} value={className} onChange={(ev, value) => {
            this.setState({
              className: ev.target.textContent,
              groupId: ''
            })
          }}>
            {
              classNames.map((item, idx) => {
                return (
                  <MenuItem key={idx} value={item} primaryText={item}/>
                )
              })
            }
          </SelectField>
        </div>
      )
    }

    const renderGroupId = () => {
      const { className, groupId, groupIds } = this.state
      const group = _.filter(groupIds, { className: className })
      return (
        <div>
          <SelectField
            floatingLabelText="选择小组" maxHeight={300} value={groupId} onChange={(ev, value) => {
            this.setState({
              groupId: ev.target.textContent
            })
          }}>
            {
              group.map((item, idx) => {
                return (
                  <MenuItem key={idx} value={item.groupId} primaryText={item.groupId}/>
                )
              })
            }
          </SelectField>
        </div>
      )
    }

    /**
     * 渲染搜索界面
     */
    const renderSearch = () => {
      return (
        <div className="search-container">
          {classSearch ? <div>
              {renderClassName()}
              {renderGroupId()}
            </div> :
            <div>
              <div className="search-box" onKeyDown={(e) => e.keyCode === 13 ? this.onClickSearchWorks() : null}>
                <TextField hintText="输入用户昵称" id='nickName'/><br/>
                <TextField hintText="输入用户训练营学号" id='memberId'/><br/>
              </div>
            </div>
          }
          <RaisedButton primary={true} label="点击搜索" onClick={()=>this.onClickSearchWorks()}/>
        </div>
      )
    }

    /**
     * 渲染选择界面
     */
    const renderSelected = () => {
      return (
        <div className="rasied-select">
          <RaisedButton
            label="昵称/学号搜索" primary={true}
            style={{ marginRight: 50 }}
            onClick={() => this.setState({ classSearch: false, selected: true })}
          />
          <RaisedButton
            label="班级和小组搜索" primary={true}
            onClick={() => this.setState({ classSearch: true, selected: true })}
          />
        </div>
      )
    }

    return (
      <div className="applicationListContainer">
        <div className="myApplicationContainer">
          {todayComment >= 0 && totalComment >= 0 ?
            <CommentTip todayComment={todayComment} totalComment={totalComment}/> : null
          }
          <div className="titleContainer">
            <div className="title">应用题</div>
          </div>

          <div className="list">
            {otherLoading ? <VerticalBarLoading/> :
              selected ? renderSearch() : renderSelected()
            }
            <Divider style={style.mgDivider}/>{renderSubmits()}
          </div>
          <div className="more">
            <span style={{ color: '#cccccc' }}>没有更多了</span>
          </div>
        </div>
      </div>
    )
  }

}
