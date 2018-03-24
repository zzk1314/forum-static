import * as React from 'react'
import './BatchOpenCourse.less'
import { SelectField, Checkbox, RaisedButton, TextField, DatePicker } from 'material-ui'
import { ProblemSelector } from '../../import/component/ProblemSelector'
import { formatDate } from '../../../../utils/helpers'
import { openCourseByMemberIds } from '../async'
import _ from 'lodash'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import { connect } from 'react-redux'

@connect(state => state)
export default class BatchOpenCourse extends React.Component {

  constructor () {
    super()
    this.state = {
      problemId: '0',
      sendWelcomeMsg: false,
      memberIds: [],
      startDate: formatDate(new Date(), 'yyyy-MM-dd'),
    }
  }

  handleClickOpenCourse () {
    const { problemId, sendWelcomeMsg, memberIds, startDate } = this.state
    const { dispatch } = this.props
    if (problemId == 0 || memberIds.length == 0) {
      dispatch(alertMsg('请补充完整数据再提交'))
      return
    }
    openCourseByMemberIds(memberIds, problemId, startDate, sendWelcomeMsg).then(res => {
      if (res.code === 200) {
        dispatch(alertMsg('开课成功，正在开课中，请稍后'))
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(e => dispatch(alertMsg(e)))
  }

  render () {
    return (
      <div className="batch-open-course-container">
        <ProblemSelector select={(id) => this.setState({ problemId: id })}/>
        <br/>
        <Checkbox defaultChecked={false} label="是否发送模板消息" onCheck={(e, v) => this.setState({ sendWelcomeMsg: v })}/>
        <br/>
        <DatePicker hintText="选择课程开始时间，默认今天"
                    formatDate={(date) => formatDate(date, 'yyyy-MM-dd')}
                    mode="landscape"
                    onChange={(e, v) => this.setState({
                      startDate: formatDate(v, 'yyyy-MM-dd'),
                    })}/>
        <TextField hintText="输入学号，多人换行书写"
                   multiLine={true}
                   onChange={(e, v) => this.setState({ memberIds: v.split('\n') })}/>
        <br/>
        <RaisedButton label="提交" onClick={() => this.handleClickOpenCourse()} primary={true}/>
      </div>
    )
  }

}
