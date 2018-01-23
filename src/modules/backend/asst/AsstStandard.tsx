import * as React from 'react'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from '../../../redux/actions'
import './AsstStandard.less'
import * as _ from 'lodash'
import { MessageTable } from '../message/autoreply/MessageTable'
import { loadAssistsStandard } from './async'

const cellStyle = {
  paddingLeft: 0,
  paddingRight: 0
}

@connect(state => state)
export default class AsstStandard extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      meta: [
        { tag: 'nickName', alias: '昵称', style: _.merge({}, cellStyle, { width: '200px' }) },
        { tag: 'roleName', alias: '助教级别', style: _.merge({}, cellStyle, { width: '200px' }) },
      ],
      data: [],
      RasiedClicked:false
    }
  }

  componentWillMount() {
    const { dispatch } = this.props

    dispatch(startLoad())
    loadAssistsStandard(1).then(res=>{
      dispatch(endLoad())
      if(res.code === 200){
        this.setState({
          standards:res.msg.data,tablePage:res.msg.page
        })
      }
      else{
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex=>{
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  openDialog(data) {
    this.setState({
      openDialog:true,
      editData:data,

    })


    //
    //   this.setState({
    //     interviewTime: interviewRecord.interviewTime,
    //     question: interviewRecord.question,
    //     targetChannel,
    //     focusChannelName: interviewRecord.focusChannelName,
    //     targetTouchDuration,
    //     touchDurationName: interviewRecord.touchDurationName,
    //     targetApplyEvent,
    //     applyEventName: interviewRecord.applyEventName,
    //     targetLearningWill,
    //     targetPotentialScore,
    //     targetAward,
    //     applyReason: interviewRecord.applyReason,
    //     openDialog: true,
    //     editData: data,
    //     applyId: data.applyId,
    //     profileId: data.profileId,
    //     remark: interviewRecord.remark
    //   })
    // } else {
    //   this.setState({
    //     openDialog: true,
    //     editData: data,
    //     applyId: data.applyId,
    //     profileId: data.profileId
    //   })
    // }
  }

  // handleChangeCoupon(event, index, value) {
  //   this.setState({ coupon: value })
  // }

  // handleClickRejectApplicationBtn() {
  //   const { dispatch } = this.props
  //   const {
  //     question, targetChannel,
  //     targetTouchDuration,
  //     targetApplyEvent, targetLearningWill, targetPotentialScore, targetAward, remark
  //   } = this.state
  //
  //   if(_.isEmpty(question) || _.isEmpty(targetChannel) || _.isEmpty(targetTouchDuration) ||
  //     _.isEmpty(targetApplyEvent) || _.isEmpty(targetLearningWill) || _.isEmpty(targetPotentialScore) ||
  //     _.isEmpty(targetAward) || _.isEmpty(remark)) {
  //     dispatch(alertMsg('请将信息填写完整'))
  //     return
  //   }
  //
  //   this.setState({
  //     RasiedClicked: true,
  //     showNoticeRejectModal: true
  //   })
  // }

  // handleClickRejectApplication() {
  //   const {
  //     editData = {},interviewTime, applyId, profileId, question, targetChannel,
  //     focusChannelName, targetTouchDuration, touchDurationName,
  //     targetApplyEvent, applyEventName, targetLearningWill, targetPotentialScore, targetAward, applyReason, remark
  //   } = this.state
  //   const { dispatch } = this.props
  //   dispatch(startLoad())
  //
  //
  //
  //   let param = {
  //     applyId,
  //     profileId,
  //     interviewTime,
  //     question,
  //     focusChannel: targetChannel.value,
  //     focusChannelName,
  //     touchDuration: targetTouchDuration.value,
  //     touchDurationName,
  //     applyEvent: targetApplyEvent.value,
  //     applyEventName,
  //     learningWill: targetLearningWill.id,
  //     potentialScore: targetPotentialScore.id,
  //     applyAward: targetAward.id,
  //     applyReason,
  //     remark
  //   }
  //
  //   rejectBusinessApplication(editData.id, param).then(res => {
  //     dispatch(endLoad())
  //     if(res.code === 200) {
  //       this.refreshPage()
  //     } else {
  //       dispatch(alertMsg(res.msg))
  //     }
  //   }).catch(ex => {
  //     dispatch(endLoad())
  //     dispatch(alertMsg(ex))
  //   })
  // }

  // checkCommentedApproval() {
  //   const {
  //     question, targetChannel,
  //     targetTouchDuration,
  //     targetApplyEvent, targetLearningWill, targetPotentialScore, targetAward, remark
  //   } = this.state
  //   const { dispatch } = this.props
  //
  //   if(_.isEmpty(question) || _.isEmpty(targetChannel) || _.isEmpty(targetTouchDuration) ||
  //     _.isEmpty(targetApplyEvent) || _.isEmpty(targetLearningWill) || _.isEmpty(targetPotentialScore) ||
  //     _.isEmpty(targetAward) || _.isEmpty(remark)) {
  //     dispatch(alertMsg('请将信息填写完整'))
  //     return
  //   }
  //
  //   this.setState({
  //     RasiedClicked: true,
  //     showCouponChoose: true
  //   })
  // }
  //
  // handleClickApprove(data, coupon) {
  //   const { dispatch } = this.props
  //   const {
  //    interviewTime, applyId, profileId, question, targetChannel,
  //     focusChannelName, targetTouchDuration, touchDurationName,
  //     targetApplyEvent, applyEventName, targetLearningWill, targetPotentialScore, targetAward, applyReason, remark
  //   } = this.state
  //
  //
  //   let param = {
  //     applyId,
  //     profileId,
  //     interviewTime,
  //     question,
  //     focusChannel: targetChannel.value,
  //     focusChannelName,
  //     touchDuration: targetTouchDuration.value,
  //     touchDurationName,
  //     applyEvent: targetApplyEvent.value,
  //     applyEventName,
  //     learningWill: targetLearningWill.id,
  //     potentialScore: targetPotentialScore.id,
  //     applyAward: targetAward.id,
  //     applyReason,
  //     remark
  //   }
  //
  //   dispatch(startLoad())
  //   approveBusinessApplication(data.id, coupon, param).then(res => {
  //     dispatch(endLoad())
  //     if(res.code === 200) {
  //       this.refreshPage()
  //     } else {
  //       dispatch(alertMsg(res.msg))
  //     }
  //   }).catch(ex => {
  //     dispatch(endLoad())
  //     dispatch(alertMsg(ex))
  //   })
  // }

  // handleClickIgnoreApplication(data) {
  //   const {
  //     interviewTime, applyId, profileId, question, targetChannel,
  //     focusChannelName, targetTouchDuration, touchDurationName,
  //     targetApplyEvent, applyEventName, targetLearningWill, targetPotentialScore, targetAward, applyReason, remark
  //   } = this.state
  //   const { dispatch } = this.props
  //   let param = {
  //     applyId,
  //     profileId,
  //     interviewTime,
  //     question,
  //     focusChannel: targetChannel.value,
  //     focusChannelName,
  //     touchDuration: targetTouchDuration.value,
  //     touchDurationName,
  //     applyEvent: targetApplyEvent.value,
  //     applyEventName,
  //     learningWill: targetLearningWill.id,
  //     potentialScore: targetPotentialScore.id,
  //     applyAward: targetAward.id,
  //     applyReason,
  //     remark
  //   }
  //   dispatch(startLoad())
  //   ignoreBusinessApplication(data.id, param).then(res => {
  //     dispatch(endLoad())
  //     if(res.code === 200) {
  //       this.refreshPage()
  //     } else {
  //       dispatch(alertMsg(res.msg))
  //     }
  //   }).catch(ex => {
  //     dispatch(endLoad())
  //     dispatch(alertMsg(ex))
  //   })
  // }

  // refreshPage() {
  //   this.setState({
  //     openDialog: false,
  //     editData: undefined,
  //     coupon: 0,
  //     comment: undefined,
  //     openInterviewerDialog: false,
  //     assignInterviewer: undefined,
  //     showCouponChoose: false,
  //     applyId: '',
  //     interviewTime: '',
  //     question: '',
  //     targetChannel: '',
  //     focusChannelName: '',
  //     targetTouchDuration: '',
  //     touchDuration: '',
  //     touchDurationName: '',
  //     targetApplyEvent: '',
  //     applyEventName: '',
  //     targetLearningWill: '',
  //     targetPotentialScore: '',
  //     potentialScore: '',
  //     targetAward: '',
  //     applyReason: '',
  //     remark: ''
  //   }, () => {
  //     this.handlePageClick(this.state.page)
  //   })
  // }
  //
  handlePageClick(page) {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadAssistsStandard(page).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ standards: res.msg.data,RasiedClicked:false,tablePage: res.msg.page, page: page })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }
  //
  // handleClickClose() {
  //   this.setState({
  //     openDialog: false,
  //     editData: undefined,
  //     coupon: 0,
  //     comment: undefined,
  //     openInterviewerDialog: false,
  //     assignInterviewer: undefined,
  //     showCouponChoose: false,
  //     applyId: '',
  //     interviewTime: '',
  //     question: '',
  //     targetChannel: '',
  //     focusChannelName: '',
  //     touchDuration: '',
  //     targetTouchDuration: '',
  //     touchDurationName: '',
  //     targetApplyEvent: '',
  //     applyEventName: '',
  //     targetLearningWill: '',
  //     targetPotentialScore: '',
  //     potentialScore: '',
  //     targetAward: '',
  //     applyReason: '',
  //     remark: ''
  //   })
  // }
  //
  // handleClickSend() {
  //   const { dispatch } = this.props
  //   let now = new Date()
  //   let year = now.getFullYear()
  //   let month = (now.getMonth() + 1 < 10) ? ('0' + (now.getMonth() + 1)) : (now.getMonth() + 1)
  //   let day = (now.getDate() < 10) ? ('0' + now.getDate()) : now.getDate()
  //
  //   let dateStr = year + '-' + month + '-' + day
  //   dispatch(startLoad())
  //   sendCheckedApplication(dateStr).then(res => {
  //     dispatch(endLoad())
  //     if(res.code === 200) {
  //       dispatch(alertMsg('发送成功'))
  //     } else {
  //       dispatch(alertMsg(res.msg))
  //     }
  //   }).catch(ex => {
  //     dispatch(endLoad())
  //     dispatch(alertMsg(ex))
  //   })
  // }
  //
  // showInterviewer(data) {
  //   loadAssts().then(res => {
  //     if(res.code === 200) {
  //       let assts = []
  //       for(let i = 0; i < res.msg.length; i++) {
  //         assts.push({
  //           value: res.msg[i],
  //           key: i,
  //           primaryText: `${res.msg[i].asstType} ${res.msg[i].asstName}  已分配${res.msg[i].assignCount}人`
  //         })
  //       }
  //       this.setState({openInterviewerDialog: true, editData: data,assts: assts })
  //     }
  //   })
  // }
  //
  // handleAssign(data, editData) {
  //   this.setState({
  //     assignInterviewer: data
  //   })
  // }
  //
  // handleClickAssign() {
  //   const { assignInterviewer, editData } = this.state
  //   const { dispatch } = this.props
  //   if(_.isEmpty(assignInterviewer)) {
  //     dispatch(alertMsg('请先选择面试官'))
  //     return
  //   }
  //   dispatch(startLoad())
  //   assignApplyInterviewer({
  //     applyId: editData.id,
  //     profileId: assignInterviewer.profileId
  //   }).then(res => {
  //     dispatch(endLoad())
  //     if(res.code === 200) {
  //       dispatch(alertMsg('分配成功'))
  //       this.refreshPage()
  //     }
  //   }).catch(ex => {
  //     dispatch(endLoad())
  //     dispatch(alertMsg(ex))
  //   })
  // }

  render() {
    // const renderDialog = () => {
    //   const { openDialog, editData = {}, showCouponChoose, coupon, RasiedClicked } = this.state
    //   return (
    //     <Dialog open={openDialog} autoScrollBodyContent={true} modal={false}>
    //       <div className="bs-dialog">
    //         <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
    //           申请者信息：
    //         </div>
    //         {renderDialogItem('昵称：', editData.nickname)}
    //         {renderDialogItem('OpenId：', editData.openid)}
    //         {renderDialogItem('当前会员状态：', editData.memberType)}
    //         {renderDialogItem('付费状态：', editData.finalPayStatus)}
    //         {renderDialogItem('申请时会员类型：', editData.originMemberTypeName)}
    //         {renderDialogItem('是否助教：', editData.isAsst)}
    //         {renderDialogItem('最近审核结果：', editData.verifiedResult)}
    //         {renderDialogItem('是否黑名单用户：', editData.isBlack)}
    //         {renderDialogItem('最终付费状态：', editData.finalPayStatus)}
    //         {renderDialogItem('面试官：', editData.interviewerName)}
    //         <div className="bs-dialog-header">
    //           问卷信息：
    //         </div>
    //         {editData.questionList ? editData.questionList.map(item => {
    //           return renderDialogItem(item.question, item.answer, true, item.id)
    //         }) : null}
    //         <div className="bs-dialog-header">
    //           评价：
    //         </div>
    //         <br/>
    //         {renderInterview()}
    //
    //         {
    //           RasiedClicked ? null :
    //             <div ref="raisedButton">
    //               <RaisedButton
    //                 style={{ marginLeft: 30 }}
    //                 label="通过" secondary={true} disabled={editData.isBlack === '是'}
    //                 onClick={() => {
    //                   this.checkCommentedApproval()
    //                 }}/>
    //               <RaisedButton
    //                 style={{ marginLeft: 30 }}
    //                 label="拒绝" secondary={true}
    //                 onClick={() => this.handleClickRejectApplicationBtn(editData)}/>
    //               <RaisedButton
    //                 style={{ marginLeft: 30 }}
    //                 label="私信" secondary={true}
    //                 onClick={() => this.handleClickIgnoreApplication(editData)}/>
    //               <RaisedButton
    //                 style={{ marginLeft: 30 }}
    //                 label="取消" secondary={true}
    //                 onClick={() => this.handleClickClose()}/>
    //             </div>
    //         }
    //
    //         {
    //           showCouponChoose ?
    //             <div className="bs-dialog-coupon">
    //               <SelectField
    //                 floatingLabelText="请选择优惠券"
    //                 value={coupon}
    //                 onChange={(event, index, value) => this.handleChangeCoupon(event, index, value)}
    //               >
    //                 <MenuItem value={0} primaryText="无"/>
    //                 <MenuItem value={200} primaryText="200"/>
    //                 <MenuItem value={300} primaryText="300"/>
    //                 <MenuItem value={400} primaryText="400"/>
    //                 <MenuItem value={500} primaryText="500"/>
    //                 <MenuItem value={600} primaryText="600"/>
    //                 <MenuItem value={800} primaryText="800"/>
    //                 <MenuItem value={1540} primaryText="1540"/>
    //                 <MenuItem value={3080} primaryText="3080"/>
    //               </SelectField>
    //               <RaisedButton
    //                 style={{ marginLeft: 30 }}
    //                 label="确定" primary={true}
    //                 onClick={() => this.handleClickApprove(editData, coupon)}/>
    //             </div> : <div className="bs-dialog-coupon"/>
    //         }
    //       </div>
    //     </Dialog>
    //   )
    // }


    return (
      <div className="bs-container">
        <MessageTable data={this.state.standards} meta={this.state.meta}
                      opsButtons={[{
                        editFunc: (item) => {this.openDialog(item)},
                        opsName: '修改测评标准'
                      }]}
                      page={this.state.tablePage} handlePageClick={(page) => this.handlePageClick(page)}/>
      </div>
    )
  }
}
