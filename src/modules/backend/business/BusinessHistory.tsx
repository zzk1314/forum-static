import * as React from 'react'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from '../../../redux/actions'
import * as _ from 'lodash'
import { loadApplicationById, loadCheckedApplication } from './async'
import { MessageTable } from '../message/autoreply/MessageTable'
import { Dialog, Divider, RaisedButton, TextField } from 'material-ui'
import './BusinessHistory.less'

const cellStyle = {
  paddingLeft: 0,
  paddingRight: 0
}

/**
 * 历史审批记录
 */
@connect(state => state)
export default class BusinessHistory extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      meta: [
        { tag: 'nickname', alias: '昵称', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'interviewTime', alias: '合适的面试时间', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'workYear', alias: '首次工作时间', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'industry', alias: '当前职位', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'level', alias: '职位层级', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'college', alias: '院校名称', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'submitTime', alias: '问卷提交时间', style: cellStyle },
        { tag: 'interviewerName', alias: '面试人', style: _.merge({}, cellStyle, { width: '70px' }) }
      ],
      data: [],
      item: '',
      profileId: ''
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    const { page } = this.state
    dispatch(startLoad())
    loadCheckedApplication(page).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          data: msg.data,
          tablePage: msg.page
        })
      }
      else {
        dispatch(alertMsg(msg))
      }
    })
  }

  openDialog(item) {
    this.setState({
      showDialog: true,
      item: item
    })
  }

  handlePageClick(page) {
    const { dispatch } = this.props
    const {profileId} = this.state
    dispatch(startLoad())
    if(_.isEmpty(profileId)){
      loadCheckedApplication(page).then(res => {
        dispatch(endLoad())
        if(res.code === 200) {
          this.setState({ data: res.msg.data, tablePage: res.msg.page, page: page })
        } else {
          dispatch(alertMsg(res.msg))
        }
      }).catch(ex => {
        dispatch(endLoad())
        dispatch(alertMsg(ex))
      })
    }
    else{
      loadApplicationById(page,profileId).then(res => {
        dispatch(endLoad())
        if(res.code === 200) {
          this.setState({ data: res.msg.data, tablePage: res.msg.page, page: page })
        } else {
          dispatch(alertMsg(res.msg))
        }
      }).catch(ex => {
        dispatch(endLoad())
        dispatch(alertMsg(ex))
      })
    }
  }

  closeDialog() {
    this.setState({
      showDialog: false,
      item: ''
    })
  }

  goSearch() {
    const { dispatch } = this.props
    const { profileId, page } = this.state
    if(_.isEmpty(profileId)) {
      dispatch(alertMsg('id不能为空'))
      return
    }
    if(isNaN(profileId)) {
      dispatch(alertMsg('id必须是数字'))
      return
    }

    dispatch(startLoad())
    loadApplicationById(1, profileId).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          data: msg.data,
          tablePage: msg.page
        })
      } else {
        dispatch(alertMsg(msg))
      }
    })

  }

  render() {
    const { showDialog, item, profileId } = this.state
    const renderDialog = () => {
      return (
        <Dialog open={showDialog} autoScrollBodyContent={true} modal={false}>
          <div className="bs-dialog">
            <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
              申请者信息
            </div>
            {renderDialogItem('昵称：', item.nickname)}
            {renderDialogItem('当前会员状态：', item.memberType)}
            {renderDialogItem('付费状态：', item.finalPayStatus)}
            {renderDialogItem('申请时会员类型：', item.originMemberTypeName)}
            {renderDialogItem('是否助教：', item.isAsst)}
            {renderDialogItem('最近审核结果：', item.verifiedResult)}
            {renderDialogItem('是否黑名单用户：', item.isBlack)}
            {renderDialogItem('最终付费状态：', item.finalPayStatus)}
            {renderDialogItem('面试官：', item.interviewerName)}
            <div className="bs-dialog-header">
              问卷信息
            </div>
            {item.questionList ? item.questionList.map(item => {
              return renderDialogItem(item.question, item.answer, true, item.id)
            }) : null}


            <div className="bs-dialog-header" style={{ marginTop: '20px' }}>
              面试信息
            </div>
            {!_.isEmpty(item.interviewRecord) && <div>
              {renderDialogItem('面试时间：', item.interviewRecord.interviewTime)}
              {renderDialogItem('学员提问：', item.interviewRecord.question)}
              {_.isEmpty(item.interviewRecord.focusChannelName) ? renderDialogItem('关注渠道：', item.interviewRecord.focusChannel) : renderDialogItem('关注渠道：', item.interviewRecord.focusChannelName)}
              {_.isEmpty(item.interviewRecord.touchDurationName) ? renderDialogItem('关注时长：', item.interviewRecord.touchDuration) : renderDialogItem('关注时长：', item.interviewRecord.touchDurationName)}
              {_.isEmpty(item.interviewRecord.applyEventName) ? renderDialogItem('触发申请商学院事件：', item.interviewRecord.applyEvent) : renderDialogItem('触发申请商学院事件：', item.interviewRecord.applyEventName)}
              {renderDialogItem('学习意愿（1-有，2-无）：', item.interviewRecord.learningWill)}
              {renderDialogItem('发展潜力：', item.interviewRecord.potentialScore)}
              {renderDialogItem('是否申请奖学金（1-申请，2-不申请）：', item.interviewRecord.applyAward)}
              {!_.isEmpty(item.interviewRecord.applyReason) && renderDialogItem('申请奖学金理由：', item.interviewRecord.applyReason)}
              {renderDialogItem('备注：', item.interviewRecord.remark)}
            </div>
            }
            <div style={{ marginTop: 20 }}>
              <RaisedButton
                style={{ marginLeft: 30 }}
                label="确认" secondary={true}
                onClick={() => this.closeDialog()}/>
            </div>

          </div>
        </Dialog>
      )
    }

    const renderDialogItem = (label, value, br, key) => {
      return (
        <div className="bs-dialog-row" key={key}>
          <span className="bs-dialog-label">{label}</span>{br ? <br/> : null}

          <span className='bs-dialog-value'>
            {value}
          </span>

          <Divider/>
        </div>
      )
    }

    const renderSearch = () => {
      return (
        <div className="search-container">
          <TextField floatingLabelText='输入id查询' value={profileId} onChange={(e, v) => this.setState({ profileId: v })}/>
          <RaisedButton
            label="点击搜索" primary={true}
            style={{ marginLeft: 50 }}
            onClick={() => this.goSearch()}
          />
        </div>
      )
    }

    return (
      <div className="application-history-container">
        {renderSearch()}
        {!_.isEmpty(item) && renderDialog()}
        <MessageTable data={this.state.data} meta={this.state.meta}
                      opsButtons={[{
                        editFunc: (item) => this.openDialog(item),
                        opsName: '查看详情'
                      }]}
                      page={this.state.tablePage} handlePageClick={(page) => this.handlePageClick(page)}/>
      </div>
    )
  }
}
