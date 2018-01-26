import * as React from 'react'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from '../../../redux/actions'
import './AsstExecution.less'
import * as _ from 'lodash'
import { MessageTable } from '../message/autoreply/MessageTable'
import { loadAssistsExecution, updateAssistsExecution } from './async'
import { Dialog, Divider } from 'material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const cellStyle = {
  paddingLeft: 0,
  paddingRight: 0
}

@connect(state => state)
export default class AsstExecution extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      meta: [
        { tag: 'nickName', alias: '昵称', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'roleName', alias: '助教级别', style: _.merge({}, cellStyle, { width: '80px' }) },
        { tag: 'startDate', alias: '审核开始日期', style: _.merge({}, cellStyle, { width: '120px' }) },
        { tag: 'countDown', alias: '倒计时天数', style: _.merge({}, cellStyle, { width: '80px' }) },
        { tag: 'remainDay', alias: '剩余天数', style: _.merge({}, cellStyle, { width: '80px' }) }
      ],
      id: '',
      editData: undefined,
      startDate: '',
      countDown: '',
      learnedProblem: '',
      reviewNumber: '',
      requestReviewNumber: '',
      validReviewNumber: '',
      validReviewRate: '',
      highQualityAnswer: '',
      hostNumber: '',
      hostScore: '',
      mainPointNumber: '',
      mainPointScore: '',
      onlineAnswer: '',
      swing: '',
      onlineOrSwingNumber: '',
      onlineScore: '',
      campNumber: '',
      asstNumber: '',
      campScore: '',
      monthlyWork: '',
      fosterNew: '',
      companyTrainNumber: '',
      companyTrainScor: '',
      RasiedClicked: false
    }
  }

  componentWillMount() {
    const { dispatch } = this.props

    dispatch(startLoad())
    loadAssistsExecution(1).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({
          executions: res.msg.data, tablePage: res.msg.page
        })
      }
      else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  openDialog(data) {
    const {
      id, startDate,
      countDown, learnedProblem, reviewNumber, requestReviewNumber, validReviewNumber, validReviewRate, highQualityAnswer,
      hostNumber, hostScore, mainPointNumber, mainPointScore,
      onlineAnswer, swing, onlineOrSwingNumber, onlineScore,
      campNumber, asstNumber, campScore,
      monthlyWork, fosterNew, companyTrainNumber, companyTrainScore
    } = data

    this.setState({
      openDialog: true,
      id,
      startDate,
      editData: data,
      countDown,
      learnedProblem,
      reviewNumber,
      requestReviewNumber,
      validReviewNumber,
      validReviewRate,
      highQualityAnswer,
      hostNumber,
      hostScore,
      mainPointNumber,
      mainPointScore,
      onlineAnswer,
      swing,
      onlineOrSwingNumber,
      onlineScore,
      campNumber,
      asstNumber,
      campScore,
      monthlyWork,
      fosterNew,
      companyTrainNumber,
      companyTrainScore
    })
  }

  openUpdateDialog(data) {
    const {
      id,
      hostScore, mainPointScore,
      onlineAnswer, swing, onlineScore,
      campScore,
      monthlyWork, companyTrainScore
    } = data

    this.setState({
      openUpdateDialog: true,
      id,
      editData: data,
      reviewNumber: 0,
      requestReviewNumber: 0,
      validReviewNumber: 0,
      highQualityAnswer: 0,
      hostNumber: 0,
      hostScore,
      mainPointNumber: 0,
      mainPointScore,
      onlineAnswer,
      swing,
      onlineOrSwingNumber: 0,
      onlineScore,
      campNumber: 0,
      asstNumber: 0,
      campScore,
      monthlyWork,
      fosterNew: 0,
      companyTrainNumber: 0,
      companyTrainScore
    })
  }

  handleClickApprove() {
    this.setState({
      openDialog: false
    })

  }

  handleClickUpdateApproval() {
    const { dispatch } = this.props
    const {
      id, reviewNumber, requestReviewNumber, validReviewNumber, highQualityAnswer,
      hostNumber, hostScore, mainPointNumber, mainPointScore,
      onlineAnswer, swing, onlineOrSwingNumber, onlineScore,
      campNumber, asstNumber, campScore,
      monthlyWork, fosterNew,
      companyTrainNumber, companyTrainScore
    } = this.state

    let param = {
      id,
      reviewNumber,
      requestReviewNumber,
      validReviewNumber,
      highQualityAnswer,
      hostNumber,
      hostScore,
      mainPointNumber,
      mainPointScore,
      onlineAnswer,
      swing,
      onlineOrSwingNumber,
      onlineScore,
      campNumber,
      asstNumber,
      campScore,
      monthlyWork,
      fosterNew,
      companyTrainNumber,
      companyTrainScore
    }
    dispatch(startLoad())
    updateAssistsExecution(param).then(res => {
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
      openUpdateDialog: false,
      editData: undefined,
      id: '',
      startDate: '',
      countDown: '',
      learnedProblem: '',
      reviewNumber: '',
      requestReviewNumber: '',
      validReviewRate: '',
      highQualityAnswer: '',
      hostNumber: '',
      hostScore: '',
      mainPointNumber: '',
      mainPointScore: '',
      onlineAnswer: '',
      swing: '',
      onlineOrSwingNumber: '',
      onlineScore: '',
      campNumber: '',
      asstNumber: '',
      campScore: '',
      monthlyWork: '',
      fosterNew: '',
      companyTrainNumber: '',
      companyTrainScore: ''
    }, () => {
      this.handlePageClick(this.state.page)
    })
  }

  handlePageClick(page) {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadAssistsExecution(page).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ executions: res.msg.data, RasiedClicked: false, tablePage: res.msg.page, page: page })
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
      openUpdateDialog: false,
      editData: undefined,
      id: '',
      startDate: '',
      countDown: '',
      learnedProblem: '',
      reviewNumber: '',
      requestReviewNumber: '',
      validReviewRate: '',
      highQualityAnswer: '',
      hostNumber: '',
      hostScore: '',
      mainPointNumber: '',
      mainPointScore: '',
      onlineAnswer: '',
      swing: '',
      onlineOrSwingNumber: '',
      onlineScore: '',
      campNumber: '',
      asstNumber: '',
      campScore: '',
      monthlyWork: '',
      fosterNew: '',
      companyTrainNumber: '',
      companyTrainScore: ''
    })
  }

  render() {
    const {
      reviewNumber, requestReviewNumber, validReviewNumber, highQualityAnswer,
      hostNumber, hostScore, mainPointNumber, mainPointScore,
      onlineAnswer, swing, onlineOrSwingNumber, onlineScore,
      campNumber, asstNumber, campScore,
      monthlyWork, fosterNew, companyTrainNumber, companyTrainScore
    } = this.state
    const renderProblemContent = () => {
      return (
        <div>
          <div>
            新增点评数: <TextField value={reviewNumber} onChange={(e, v) => {this.setState({ reviewNumber: v })}}/>
          </div>
          <div>
            新增求点评的回答数: <TextField value={requestReviewNumber}
                                  onChange={(e, v) => {this.setState({ requestReviewNumber: v })}}/>
          </div>
          <div>
            新增有效的点评数：<TextField value={validReviewNumber}
                                onChange={(e, v) => {this.setState({ validReviewNumber: v })}}/>
          </div>
          <div>
            新增优质回答数: <TextField value={highQualityAnswer}
                                onChange={(e, v) => {this.setState({ highQualityAnswer: v })}}/>
          </div>
        </div>

      )
    }

    const renderOffLineWork = () => {
      return (
        <div>
          <div>
            新增主持人次数: <TextField value={hostNumber} onChange={(e, v) => {this.setState({ hostNumber: v })}}/>
          </div>
          <div>
            修改主持人评分: <TextField value={hostScore} onChange={(e, v) => {this.setState({ hostScore: v })}}/>
          </div>
          <div>
            新增串讲人次数: <TextField value={mainPointNumber} onChange={(e, v) => {this.setState({ mainPointNumber: v })}}/>
          </div>
          <div>
            修改串讲人评分: <TextField value={mainPointScore} onChange={(e, v) => {this.setState({ mainPointScore: v })}}/>
          </div>
        </div>
      )
    }

    const renderOnlineWork = () => {
      return (
        <div>
          <div>
            修改线上答题演习: <TextField value={onlineAnswer} onChange={(e, v) => {this.setState({ onlineAnswer: v })}}/>
          </div>
          <div>
            修改吊打演习: <TextField value={swing} onChange={(e, v) => {this.setState({ swing: v })}}/>
          </div>
          <div>
            新增线上答疑或吊打: <TextField value={onlineOrSwingNumber}
                                  onChange={(e, v) => {this.setState({ onlineOrSwingNumber: v })}}/>
          </div>
          <div>
            修改线上活动反馈分数: <TextField value={onlineScore} onChange={(e, v) => {this.setState({ onlineScore: v })}}/>
          </div>
        </div>
      )
    }

    const renderCamp = () => {
      return (
        <div>
          <div>
            新增训练营次数: <TextField value={campNumber} onChange={(e, v) => {this.setState({ campNumber: v })}}/>
          </div>
          <div>
            新增大教练次数: <TextField value={asstNumber} onChange={(e, v) => {this.setState({ asstNumber: v })}}/>
          </div>
          <div>
            修改反馈评分: <TextField value={campScore} onChange={(e, v) => {this.setState({ campScore: v })}}/>
          </div>
        </div>
      )
    }

    const renderCompany = () => {
      return (
        <div>
          <div>
            修改每月作业: <TextField value={monthlyWork} onChange={(e, v) => {this.setState({ monthlyWork: v })}}/>
          </div>
          <div>
            新增培养新人: <TextField value={fosterNew} onChange={(e, v) => {this.setState({ fosterNew: v })}}/>
          </div>
          <div>
            新增企业培训次数: <TextField value={companyTrainNumber}
                                 onChange={(e, v) => {this.setState({ companyTrainNumber: v })}}/>
          </div>
          <div>
            修改企业培训评分：<TextField value={companyTrainScore}
                                onChange={(e, v) => {this.setState({ companyTrainScore: v })}}/>
          </div>
        </div>
      )
    }
    const renderDialogItem = (label, value, style, br, key) => {
      return (
        <div className="bs-dialog-row" key={key}>
          <span className="bs-dialog-label">{label}</span>{br ? <br/> : null}
          <span className={style}>
            {value}
          </span>

          <Divider/>
        </div>
      )
    }

    const renderDialog = () => {
      const { openDialog, editData = {} } = this.state
      return (
        <Dialog open={openDialog} autoScrollBodyContent={true} modal={false}>
          <div className="bs-dialog">
            <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
              测评时间：
            </div>
            {renderDialogItem('开始日期：', editData.startDate, 'bs-dialog-value')}
            {renderDialogItem('倒计时：', editData.countDown + '天', 'bs-dialog-value')}


            {renderDialogItem('剩余天数：', editData.remainDay + '天', editData.remainDay > 0 ? 'bs-dialog-value' : 'bs-red-dialog-value'
            )}

            <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
              小课完成情况：
            </div>
            {renderDialogItem('小课学习（累积）：', editData.learnedProblem, editData.remainProblem > 0 ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            {renderDialogItem('点评数：', editData.reviewedNumber, editData.remainReviewNumber > 0 ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            {renderDialogItem('求点评的点评数：', editData.requestReviewNumber, editData.remainRequestRevierNumber > 0 ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            {renderDialogItem('有效点评率:', editData.reviewRate + '%', editData.validReviewRate < editData.needReviewRate ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            {renderDialogItem('优质回答：', editData.highAnswer, editData.remainHighAnswer > 0 ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            <div className="bs-dialog-header">
              线下工作坊完成情况：
            </div>
            {renderDialogItem('主持人次数：', editData.hostNumber, editData.remainHostNumbe > 0 ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            {renderDialogItem('主持人分数：', editData.hostScore, editData.remainHostNumbe > 0 ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            {renderDialogItem('串讲人次数：', editData.mainPointNumber, editData.remainPointNumber > 0 ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            {renderDialogItem('串讲人分数：', editData.mainPointScore, editData.mainPointScore < editData.needHostScore ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            <div className="bs-dialog-header">
              线上活动完成情况：
            </div>
            {renderDialogItem('线上答题演习：', editData.onlineAnswer, (editData.onlineAnswer === 'N' && editData.needOnlineAnswer === 'Y') ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            {renderDialogItem('吊打演习：', editData.swing, (editData.swing === 'N' && editData.needSwing === 'Y') ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            {renderDialogItem('线上答疑或吊打次数：', editData.onlineOrSwingNumber, editData.remainOnlineOrSwingNumber > 0 ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            {renderDialogItem('线上活动反馈分数：', editData.onlineScore, editData.needOnlineScore > editData.onlineScore ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            <div className="bs-dialog-header">
              训练营完成情况：
            </div>
            {renderDialogItem('训练营次数：', editData.campNumber, editData.remainCampNumber > 0 ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            {renderDialogItem('大教练次数：', editData.asstNumber, editData.remainAsstNumber > 0 ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            {renderDialogItem('反馈评分：', editData.campScore, editData.needCompanyScore > editData.campScore ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            <div className="bs-dialog-header">
              企业培训完成情况：
            </div>
            {renderDialogItem('每月作业：', editData.monthlyWork, (editData.monthlyWork === 'N' && editData.needMonthlyWork === 'Y') ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            {renderDialogItem('培养新人次数：', editData.fosterNew, editData.remainFosterNew > 0 ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            {renderDialogItem('企业培训次数：', editData.companyNumber, editData.remainCompanyNumber > 0 ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            {renderDialogItem('企业培训评分：', editData.companyScore, editData.needCampScore > editData.companyScore ? 'bs-red-dialog-value' : 'bs-dialog-value')}
            <br/>
          </div>
          {
            <div>
              <RaisedButton
                style={{ marginLeft: 30 }}
                label="确定" secondary={true}
                onClick={() => this.handleClickApprove()}/>
            </div>
          }
        </Dialog>
      )
    }
    const renderUpdateDialog = () => {
      const { openUpdateDialog, RasiedClicked } = this.state
      return (
        <Dialog open={openUpdateDialog} autoScrollBodyContent={true} modal={false}>
          <div className="bs-dialog">
            <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
              小课内容：
            </div>
            {renderProblemContent()}
            <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
              线下工作坊：
            </div>
            {renderOffLineWork()}
            <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
              线上活动
            </div>
            {renderOnlineWork()}
            <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
              训练营
            </div>
            {renderCamp()}
            <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
              企业培训
            </div>
            {renderCompany()}
            <br/>
            {
              RasiedClicked ? null :
                <div ref="raisedButton">
                  <RaisedButton
                    style={{ marginLeft: 30 }}
                    label="确定" secondary={true}
                    onClick={() => {
                      this.handleClickUpdateApproval()
                    }}/>
                  <RaisedButton
                    style={{ marginLeft: 30 }}
                    label="取消" secondary={true}
                    onClick={() => this.handleClickClose()}/>
                </div>
            }
          </div>
        </Dialog>
      )
    }

    return (
      <div className="asst-execution-bs-container">
        {renderDialog()}
        {renderUpdateDialog()}
        <MessageTable data={this.state.executions} meta={this.state.meta}
                      opsButtons={[{
                        editFunc: (item) => {this.openDialog(item)},
                        opsName: '查看详情'
                      },
                        {
                          editFunc: (item) =>
                            this.openUpdateDialog(item),
                          opsName: '录入数据'
                        }]}
                      page={this.state.tablePage} handlePageClick={(page) => this.handlePageClick(page)}/>
      </div>
    )
  }
}
