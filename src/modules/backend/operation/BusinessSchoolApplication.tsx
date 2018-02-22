import * as React from 'react'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from '../../../redux/actions'
import './BusinessSchoolApplication.less'
import {
  loadBusinessApplicationList, rejectBusinessApplication,
  approveBusinessApplication, ignoreBusinessApplication,
  sendCheckedApplication, loadAssts, assignApplyInterviewer
} from './async'
import * as _ from 'lodash'
import { MessageTable } from '../message/autoreply/MessageTable'
import { RaisedButton, TextField, Toggle, Dialog, Divider, SelectField, MenuItem, FlatButton } from 'material-ui'
import Confirm from '../../../components/Confirm'
import isEmpty = require('lodash/isEmpty')
import TimePicker from 'material-ui/TimePicker'

const cellStyle = {
  paddingLeft: 0,
  paddingRight: 0
}

const focusChannels = [
  { id: 1, value: '圈圈的书' },
  { id: 2, value: '好友推荐' },
  { id: 3, value: '朋友圈' },
  { id: 4, value: '奴隶社会' },
  { id: 5, value: '分答&在行' },
  { id: 6, value: '知乎' },
  { id: 7, value: '领英' },
  { id: 8, value: '其他，请详述' },
  { id: 9, value: '不记得了' }
]

const touchDurations = [
  { id: 1, value: '不到一周' },
  { id: 2, value: '不到一个月（超过一周）' },
  { id: 3, value: '1-6个月' },
  { id: 4, value: '6个月以上' },
  { id: 5, value: '其他，请详述' },
  { id: 6, value: '不记得了' }
]

const applyEvents = [
  { id: 1, value: '朋友推荐' },
  { id: 2, value: '领导推荐' },
  { id: 3, value: '招募文章' },
  { id: 4, value: '圈圈直播' },
  { id: 5, value: '其他，请详述' },
  { id: 6, value: '不记得了' }
]

const learningWills = [
  { id: 1, value: '有' },
  { id: 2, value: '无' }
]

const potentialScores = [
  { id: 1, value: '1分' },
  { id: 2, value: '2分' },
  { id: 3, value: '3分' },
  { id: 4, value: '4分' },
  { id: 5, value: '5分' }
]

const applyAwards = [
  { id: 1, value: '是' },
  { id: 2, value: '否' }
]

@connect(state => state)
export default class BusinessSchoolApplication extends React.Component<any, any> {
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
        { tag: 'interviewerName', alias: '面试人', style: _.merge({}, cellStyle, { width: '70px' }) },
        { tag: 'isInterviewed', alias: '是否已经面试', style: _.merge({}, cellStyle, { width: '70px' }) }
      ],
      data: [],
      profileId: '',
      applyId: '',
      interviewTime: '',
      question: '',
      targetChannel: '',
      focusChannelName: '',
      touchDuration: '',
      touchDurationName: '',
      targetApplyEvent: '',
      applyEventName: '',
      targetLearningWill: '',
      targetPotentialScore: '',
      potentialScore: '',
      targetAward: '',
      applyReason: '',
      openDialog: false,
      showCouponChoose: false,
      coupon: 0,
      showNoticeRejectModal: false,
      noticeNoticeSendModal: false,
      RasiedClicked: false,
      remark: '',
      noticeRejectModal: {
        title: '提示',
        content: '是否拒绝,将进行退款操作',
        actions: [{
          label: '确认',
          onClick: () => {
            this.setState({ showNoticeRejectModal: false })
            this.handleClickRejectApplication()
          }
        },
          {
            label: '取消',
            onClick: () => this.setState({ showNoticeRejectModal: false })
          }
        ]
      },
      noticeSendModal: {
        title: '提示',
        content: '是否发送之前审批的记录',
        actions: [{
          label: '确认',
          onClick: () => {
            this.setState({ noticeNoticeSendModal: false })
            this.handleClickSend()
          }
        },
          {
            label: '取消',
            onClick: () => this.setState({ noticeNoticeSendModal: false })
          }
        ]
      }
    }
  }

  componentWillMount() {
    const { dispatch } = this.props

    dispatch(startLoad())
    loadBusinessApplicationList(1).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ applications: res.msg.data, tablePage: res.msg.page })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  openDialog(data) {
    if(data.interviewRecord != null) {
      const { interviewRecord } = data
      let interviewTime = new Date(interviewRecord.interviewTime)
      let targetChannel = interviewRecord.focusChannel
      if(targetChannel != '') {
        focusChannels.map((target) => {
          if(target.value.indexOf(targetChannel) >= 0) {
            targetChannel = target
            return
          }
        })
      }

      let targetTouchDuration = interviewRecord.touchDuration
      if(targetTouchDuration != '') {
        touchDurations.map((touch) => {
          if(touch.value.indexOf(targetTouchDuration) >= 0) {
            targetTouchDuration = touch
            return
          }
        })
      }

      let targetApplyEvent = interviewRecord.applyEvent
      if(targetApplyEvent != '') {
        applyEvents.map((apply) => {
          if(apply.value.indexOf(targetApplyEvent) >= 0) {
            targetApplyEvent = apply
            return
          }
        })
      }

      let targetLearningWill = interviewRecord.learningWill
      learningWills.map((will) => {
        if(will.id === targetLearningWill) {
          targetLearningWill = will
          return
        }
      })

      let targetPotentialScore = interviewRecord.potentialScore
      potentialScores.map((score) => {
        if(score.id === targetPotentialScore) {
          targetPotentialScore = score
          return
        }
      })

      let targetAward = interviewRecord.applyAward
      applyAwards.map((award) => {
        if(award.id === targetAward) {
          targetAward = award
          return
        }
      })

      this.setState({
        interviewTime,
        question: interviewRecord.question,
        targetChannel,
        focusChannelName: interviewRecord.focusChannelName,
        targetTouchDuration,
        touchDurationName: interviewRecord.touchDurationName,
        targetApplyEvent,
        applyEventName: interviewRecord.applyEventName,
        targetLearningWill,
        targetPotentialScore,
        targetAward,
        applyReason: interviewRecord.applyReason,
        openDialog: true,
        editData: data,
        applyId: data.applyId,
        profileId: data.profileId,
        remark: interviewRecord.remark
      })
    } else {
      this.setState({
        openDialog: true,
        editData: data,
        applyId: data.applyId,
        profileId: data.profileId
      })
    }
  }

  handleChangeCoupon(event, index, value) {
    this.setState({ coupon: value })
  }

  handleClickRejectApplicationBtn() {
    const { remark } = this.state

    if(_.isEmpty(remark)) {
      alert('面试备注不能为空')
      return
    }

    this.setState({
      RasiedClicked: true,
      showNoticeRejectModal: true
    })
  }

  handleClickRejectApplication() {
    const {
      editData = {}, interviewTime, applyId, profileId, question, targetChannel,
      focusChannelName, targetTouchDuration, touchDurationName,
      targetApplyEvent, applyEventName, targetLearningWill, targetPotentialScore, targetAward, applyReason, remark
    } = this.state
    const { dispatch } = this.props
    dispatch(startLoad())

    let param = {
      applyId,
      profileId,
      interviewTime,
      question,
      focusChannelName,
      touchDurationName,
      applyEventName,
      applyReason,
      remark
    }

    if(!_.isEmpty(targetChannel)){
      param = _.merge( param ,{focusChannel:targetChannel.value})
    }
    if(!_.isEmpty(targetTouchDuration)){
      param = _.merge( param ,{touchDuration:targetTouchDuration.value})
    }
    if(!_.isEmpty(targetApplyEvent)){
      param = _.merge( param ,{applyEvent:targetApplyEvent.value})
    }
    if(!_.isEmpty(targetLearningWill)){
      param = _.merge( param ,{learningWill:targetLearningWill.id})
    }
    if(!_.isEmpty(targetPotentialScore)){
      param = _.merge( param ,{potentialScore:targetPotentialScore.id})
    }
    if(!_.isEmpty(targetAward)){
      param = _.merge( param ,{applyAward:targetAward.id})
    }

    rejectBusinessApplication(editData.id, param).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.refreshPage()
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  checkCommentedApproval() {
    const {
      interviewTime, question, targetChannel,
      targetTouchDuration,
      targetApplyEvent, targetLearningWill, targetPotentialScore, targetAward, remark
    } = this.state
    const { dispatch } = this.props

    if(interviewTime.length == 0 || _.isEmpty(question) || _.isEmpty(targetChannel) || _.isEmpty(targetTouchDuration) ||
      _.isEmpty(targetApplyEvent) || _.isEmpty(targetLearningWill) || _.isEmpty(targetPotentialScore) ||
      _.isEmpty(targetAward) || _.isEmpty(remark)) {
      // dispatch(alertMsg('请将信息填写完整'))
      alert('请将信息填写完成')
      return
    }

    this.setState({
      RasiedClicked: true,
      showCouponChoose: true
    })
  }

  handleClickApprove(data, coupon) {
    const { dispatch } = this.props
    const {
      interviewTime, applyId, profileId, question, targetChannel,
      focusChannelName, targetTouchDuration, touchDurationName,
      targetApplyEvent, applyEventName, targetLearningWill, targetPotentialScore, targetAward, applyReason, remark
    } = this.state

    let param = {
      applyId,
      profileId,
      interviewTime,
      question,
      focusChannel: targetChannel.value,
      focusChannelName,
      touchDuration: targetTouchDuration.value,
      touchDurationName,
      applyEvent: targetApplyEvent.value,
      applyEventName,
      learningWill: targetLearningWill.id,
      potentialScore: targetPotentialScore.id,
      applyAward: targetAward.id,
      applyReason,
      remark
    }

    dispatch(startLoad())
    approveBusinessApplication(data.id, coupon, param).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.refreshPage()
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  handleClickIgnoreApplication(data) {
    const {
      interviewTime, applyId, profileId, question, targetChannel,
      focusChannelName, targetTouchDuration, touchDurationName,
      targetApplyEvent, applyEventName, targetLearningWill, targetPotentialScore, targetAward, applyReason, remark
    } = this.state
    const { dispatch } = this.props
    let param = {
      applyId,
      profileId,
      interviewTime,
      question,
      focusChannel: targetChannel.value,
      focusChannelName,
      touchDuration: targetTouchDuration.value,
      touchDurationName,
      applyEvent: targetApplyEvent.value,
      applyEventName,
      learningWill: targetLearningWill.id,
      potentialScore: targetPotentialScore.id,
      applyAward: targetAward.id,
      applyReason,
      remark
    }
    dispatch(startLoad())
    ignoreBusinessApplication(data.id, param).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.refreshPage()
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  refreshPage() {
    this.setState({
      openDialog: false,
      editData: undefined,
      coupon: 0,
      comment: undefined,
      openInterviewerDialog: false,
      assignInterviewer: undefined,
      showCouponChoose: false,
      applyId: '',
      interviewTime: '',
      question: '',
      targetChannel: '',
      focusChannelName: '',
      targetTouchDuration: '',
      touchDuration: '',
      touchDurationName: '',
      targetApplyEvent: '',
      applyEventName: '',
      targetLearningWill: '',
      targetPotentialScore: '',
      potentialScore: '',
      targetAward: '',
      applyReason: '',
      remark: ''
    }, () => {
      this.handlePageClick(this.state.page)
    })
  }

  handlePageClick(page) {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadBusinessApplicationList(page).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ applications: res.msg.data, RasiedClicked: false, tablePage: res.msg.page, page: page })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  handleClickClose() {
    this.setState({
      openDialog: false,
      editData: undefined,
      coupon: 0,
      comment: undefined,
      openInterviewerDialog: false,
      assignInterviewer: undefined,
      showCouponChoose: false,
      applyId: '',
      interviewTime: '',
      question: '',
      targetChannel: '',
      focusChannelName: '',
      touchDuration: '',
      targetTouchDuration: '',
      touchDurationName: '',
      targetApplyEvent: '',
      applyEventName: '',
      targetLearningWill: '',
      targetPotentialScore: '',
      potentialScore: '',
      targetAward: '',
      applyReason: '',
      remark: ''
    })
  }

  handleClickSend() {
    const { dispatch } = this.props
    let now = new Date()
    let year = now.getFullYear()
    let month = (now.getMonth() + 1 < 10) ? ('0' + (now.getMonth() + 1)) : (now.getMonth() + 1)
    let day = (now.getDate() < 10) ? ('0' + now.getDate()) : now.getDate()

    let dateStr = year + '-' + month + '-' + day
    dispatch(startLoad())
    sendCheckedApplication(dateStr).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        dispatch(alertMsg('发送成功'))
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  showInterviewer(data) {
    loadAssts().then(res => {
      if(res.code === 200) {
        let assts = []
        for(let i = 0; i < res.msg.length; i++) {
          assts.push({
            value: res.msg[i],
            key: i,
            primaryText: `${res.msg[i].asstType} ${res.msg[i].asstName}  已分配${res.msg[i].assignCount}人`
          })
        }
        this.setState({ openInterviewerDialog: true, editData: data, assts: assts })
      }
    })
  }

  handleAssign(data, editData) {
    this.setState({
      assignInterviewer: data
    })
  }

  handleClickAssign() {
    const { assignInterviewer, editData } = this.state
    const { dispatch } = this.props
    if(_.isEmpty(assignInterviewer)) {
      dispatch(alertMsg('请先选择面试官'))
      return
    }
    dispatch(startLoad())
    assignApplyInterviewer({
      applyId: editData.id,
      profileId: assignInterviewer.profileId
    }).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        dispatch(alertMsg('分配成功'))
        this.refreshPage()
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  render() {
    const renderDialogItem = (label, value, br, key) => {
      return (
        <div className="bs-dialog-row" key={key}>
          <span className="bs-dialog-label">{label}</span>{br ? <br/> : null}

          <span className={`${(value == '是' && label == '是否黑名单用户：') ? 'bs-dialog-true-value' : 'bs-dialog-value'}`}>
            {value}
          </span>

          <Divider/>
        </div>
      )
    }
    const renderInterviewerDialog = () => {
      const { openInterviewerDialog = false, assts, editData, assignInterviewer = {} } = this.state
      return (
        <Dialog open={openInterviewerDialog} autoScrollBodyContent={true} modal={false}>
          选择面试官：<br/>
          <SelectField
            value={assignInterviewer}
            onChange={(event, index, value) => this.handleAssign(value, editData)}
            maxHeight={400}
          >
            {assts && assts.map(item => <MenuItem {...item}/>)}
          </SelectField>
          <br/>
          <RaisedButton
            style={{ marginLeft: 30 }}
            label="确认" secondary={true}
            onClick={() => this.handleClickAssign()}/>

          <RaisedButton
            style={{ marginLeft: 30 }}
            label="取消" secondary={true}
            onClick={() => this.handleClickClose()}/>
        </Dialog>
      )
    }
    const renderDialog = () => {
      const { openDialog, editData = {}, showCouponChoose, coupon, RasiedClicked } = this.state
      return (
        <Dialog open={openDialog} autoScrollBodyContent={true} modal={false}>
          <div className="bs-dialog">
            <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
              申请者信息：
            </div>
            {renderDialogItem('昵称：', editData.nickname)}
            {renderDialogItem('OpenId：', editData.openid)}
            {renderDialogItem('当前会员状态：', editData.memberType)}
            {renderDialogItem('付费状态：', editData.finalPayStatus)}
            {renderDialogItem('申请时会员类型：', editData.originMemberTypeName)}
            {renderDialogItem('是否助教：', editData.isAsst)}
            {renderDialogItem('最近审核结果：', editData.verifiedResult)}
            {renderDialogItem('是否黑名单用户：', editData.isBlack)}
            {renderDialogItem('最终付费状态：', editData.finalPayStatus)}
            {renderDialogItem('面试官：', editData.interviewerName)}
            <div className="bs-dialog-header">
              问卷信息：
            </div>
            {editData.questionList ? editData.questionList.map(item => {
              return renderDialogItem(item.question, item.answer, true, item.id)
            }) : null}
            <div className="bs-dialog-header">
              评价：
            </div>
            <br/>
            {renderInterview()}

            {
              RasiedClicked ? null :
                <div ref="raisedButton">
                  <RaisedButton
                    style={{ marginLeft: 30 }}
                    label="通过" secondary={true} disabled={editData.isBlack === '是'}
                    onClick={() => {
                      this.checkCommentedApproval()
                    }}/>
                  <RaisedButton
                    style={{ marginLeft: 30 }}
                    label="拒绝" secondary={true}
                    onClick={() => this.handleClickRejectApplicationBtn(editData)}/>
                  <RaisedButton
                    style={{ marginLeft: 30 }}
                    label="私信" secondary={true}
                    onClick={() => this.handleClickIgnoreApplication(editData)}/>
                  <RaisedButton
                    style={{ marginLeft: 30 }}
                    label="取消" secondary={true}
                    onClick={() => this.handleClickClose()}/>
                </div>
            }

            {
              showCouponChoose ?
                <div className="bs-dialog-coupon">
                  <SelectField
                    floatingLabelText="请选择优惠券"
                    value={coupon}
                    onChange={(event, index, value) => this.handleChangeCoupon(event, index, value)}
                  >
                    <MenuItem value={0} primaryText="无"/>
                    <MenuItem value={200} primaryText="200"/>
                    <MenuItem value={300} primaryText="300"/>
                    <MenuItem value={400} primaryText="400"/>
                    <MenuItem value={500} primaryText="500"/>
                    <MenuItem value={600} primaryText="600"/>
                    <MenuItem value={800} primaryText="800"/>
                    <MenuItem value={1540} primaryText="1540"/>
                    <MenuItem value={3080} primaryText="3080"/>
                  </SelectField>
                  <RaisedButton
                    style={{ marginLeft: 30 }}
                    label="确定" primary={true}
                    onClick={() => this.handleClickApprove(editData, coupon)}/>
                </div> : <div className="bs-dialog-coupon"/>
            }
          </div>
        </Dialog>
      )
    }

    /**
     * 面试记录信息
     * @returns {any}
     */
    const renderInterview = () => {
      const {
        interviewTime, question, remark
      } = this.state

      return (
        <div>
          <div className="backend-interview-container">
            <FlatButton label="面试时间"/>
          </div>
          <TimePicker
            value={interviewTime}
            onChange={(e, v) => this.setState({ interviewTime: v })}
          /><br/>
          <div className="backend-interview-container">
            <FlatButton label="学员提问"/>
          </div>
          <textarea
            placeholder="学员提问"
            value={question}
            className="comment-text"
            onChange={(e) => this.setState({ question: e.target.value })}
          /><br/>
          {renderFocusChannel()}
          {renderTouchDuration()}
          {renderApplyEvent()}
          {renderLearningWill()}
          {renderPotentialScore()}
          {renderAward()}
          <div className="backend-interview-container">
            <FlatButton label="面试备注"/>
          </div>
          <textarea
            placeholder="面试备注"
            value={remark}
            className="comment-text"
            onChange={(e) => this.setState({ remark: e.target.value })}
          /><br/>
        </div>

      )
    }

    /**
     * 关注渠道
     * @returns {{}}
     */
    const renderFocusChannel = () => {
      const { focusChannelName, targetChannel } = this.state
      return (
        <div>
          <div className="selector-inline">
            <SelectField
              value={targetChannel}
              floatingLabelText="选择关注渠道"
              onChange={(e, idx, value) => {
                this.setState({ targetChannel: value })
              }
              }
            >
              {
                focusChannels.map((channel, idx) => {
                  return (
                    <MenuItem key={idx} value={channel} primaryText={channel.value}/>
                  )
                })
              }
            </SelectField>
            {targetChannel && targetChannel.id === 8 && <div>
              <div className="interview-container">
                <FlatButton label="关注渠道"/>
              </div>
              <textarea
                placeholder="请输入关注渠道"
                value={focusChannelName}
                className="comment-text"
                onChange={(e) => this.setState({ focusChannelName: e.target.value })}
              /><br/>
            </div>}
          </div>
        </div>
      )
    }

    /**
     * 接触时长
     */
    const renderTouchDuration = () => {
      const { touchDurationName, targetTouchDuration } = this.state
      return (<div>
        <div className="selector-inline">
          <SelectField
            value={targetTouchDuration}
            floatingLabelText="选择接触圈外时长"
            onChange={(e, idx, value) => {
              this.setState({ targetTouchDuration: value })
            }
            }
          >
            {
              touchDurations.map((duration, idx) => {
                return (
                  <MenuItem key={idx} value={duration} primaryText={duration.value}/>
                )
              })
            }
          </SelectField>
          {targetTouchDuration && targetTouchDuration.id === 5 &&
          <div>
            <div className="interview-container">
              <FlatButton label="接触圈外时长"/>
            </div>
            <textarea
              placeholder="请输入接触圈外时长"
              value={touchDurationName}
              className="comment-text"
              onChange={(e) => this.setState({ touchDurationName: e.target.value })}
            /><br/>
          </div>
          }
        </div>
      </div>)
    }

    /**
     * 申请商学院事件
     */
    const renderApplyEvent = () => {
      const { applyEventName, targetApplyEvent } = this.state

      return (
        <div>
          <div className="selector-inline">
            <SelectField
              value={targetApplyEvent}
              floatingLabelText="选择触发申请商学院事件"
              onChange={(e, idx, value) => {
                this.setState({ targetApplyEvent: value })
              }
              }
            >
              {
                applyEvents.map((event, idx) => {
                  return (
                    <MenuItem key={idx} value={event} primaryText={event.value}/>
                  )
                })
              }
            </SelectField>
            {targetApplyEvent && targetApplyEvent.id === 5 &&
            <div>
              <div className="interview-container">
                <FlatButton label="触发申请商学院事件"/>
              </div>
              <textarea
                placeholder="请填入触发申请商学院事件"
                value={applyEventName}
                className="comment-text"
                onChange={(e) => this.setState({ applyEventName: e.target.value })}
              /><br/>
            </div>
            }
          </div>
        </div>
      )

    }

    /**
     * 学习意愿
     * @returns {any}
     */
    const renderLearningWill = () => {
      const { targetLearningWill } = this.state

      return (
        <div>
          <div className="selector-inline">
            <SelectField
              value={targetLearningWill}
              floatingLabelText="选择学员学习意愿评估结果"
              onChange={(e, idx, value) => {
                this.setState({ targetLearningWill: value })
              }
              }
            >
              {
                learningWills.map((will, idx) => {
                  return (
                    <MenuItem key={idx} value={will} primaryText={will.value}/>
                  )
                })
              }
            </SelectField>
          </div>
        </div>
      )
    }

    /**
     * 发展潜力
     */
    const renderPotentialScore = () => {
      const { targetPotentialScore } = this.state

      return (
        <div>
          <div className="selector-inline">
            <SelectField
              value={targetPotentialScore}
              floatingLabelText="选择发展潜力评估结果"
              onChange={(e, idx, value) => {
                this.setState({ targetPotentialScore: value })
              }
              }
            >
              {
                potentialScores.map((score, idx) => {
                  return (
                    <MenuItem key={idx} value={score} primaryText={score.value}/>
                  )
                })
              }
            </SelectField>
          </div>
        </div>
      )
    }

    /**
     * 奖学金
     */
    const renderAward = () => {
      const { applyReason, targetAward } = this.state

      return (
        <div>
          {/*<FlatButton label="是否申请奖学金"/>*/}
          <div className="selector-inline">
            <SelectField
              value={targetAward}
              floatingLabelText="选择是否申请奖学金"
              onChange={(e, idx, value) => {
                this.setState({ targetAward: value })
              }
              }
            >
              {
                applyAwards.map((award, idx) => {
                  return (
                    <MenuItem key={idx} value={award} primaryText={award.value}/>
                  )
                })
              }
            </SelectField>
            {(targetAward && targetAward.id === 1) &&

            <div>
              <div className="interview-container">
                <FlatButton label="申请奖学金理由"/>
              </div>
              <textarea
                placeholder="请填入选择申请奖学金理由"
                value={applyReason}
                className="comment-text"
                onChange={(e) => this.setState({ applyReason: e.target.value })}
              /><br/>
            </div>
            }
          </div>
        </div>
      )
    }

    return (
      <div className="bs-container">
        <div className="bs-operator">
          <RaisedButton
            style={{ marginLeft: 30 }}
            label="发送审核结果" primary={true}
            onClick={() => this.setState({ noticeNoticeSendModal: true })}/>
        </div>
        {renderDialog()}
        {renderInterviewerDialog()}
        <MessageTable data={this.state.applications} meta={this.state.meta}
                      opsButtons={[{
                        editFunc: (item) => this.openDialog(item),
                        opsName: '审核'
                      }, {
                        editFunc: (item) =>
                          this.showInterviewer(item),
                        opsName: '分配'
                      }]}

                      page={this.state.tablePage} handlePageClick={(page) => this.handlePageClick(page)}/>
        <Confirm open={this.state.showNoticeRejectModal} {...this.state.noticeRejectModal}
                 handlerClose={() => this.setState({ showNoticeRejectModal: false })}/>
        <Confirm open={this.state.noticeNoticeSendModal} {...this.state.noticeSendModal}
                 handlerClose={() => this.setState({ noticeNoticeSendModal: false })}/>
      </div>
    )
  }
}
