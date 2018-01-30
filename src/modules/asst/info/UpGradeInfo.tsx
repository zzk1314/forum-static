import * as React from 'react'
import { startLoad, endLoad, alertMsg } from '../../../redux/actions'
import { connect } from 'react-redux'
import { loadGradeInfo } from './async'
import './UpGradeInfo.less'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'

@connect(state => state)
export default class UpGradeInfo extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      data: '',
      showDialog: false
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(startLoad())

    loadGradeInfo().then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({
          data: res.msg
        })
      } else {
        dispatch(alertMsg(res.msg))
      }
    })

  }

  render() {
    const { data, showDialog } = this.state

    const renderChoice = () => {
      return (
        <RaisedButton
          style={{ marginLeft: 30 }}
          label="查看升级信息" primary={true}
          onClick={() => {
            this.setState({
              showDialog: true
            })
          }}/>
      )
    }

    const renderUpGradeInfo = () => {

      return (
        <Dialog open={showDialog} autoScrollBodyContent={true} modal={false}>
          <div className="bs-dialog">
            <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
              时间测评：
            </div>
            {renderTimeContent()}
            <div className="bs-dialog-header" style={{ marginTop: '20px' }}>
              课程内容：
            </div>
            {renderProblemContent()}
            <div className="bs-dialog-header" style={{ marginTop: '20px' }}>
              线下工作坊：
            </div>
            {renderOffLineWork()}
            <div className="bs-dialog-header" style={{ marginTop: '20px' }}>
              线上活动
            </div>
            {renderOnlineWork()}
            <div className="bs-dialog-header" style={{ marginTop: '20px' }}>
              训练营
            </div>
            {renderCamp()}
            <div className="bs-dialog-header" style={{ marginTop: '20px' }}>
              企业培训
            </div>
            {renderCompany()}
            <div className="bs-dialog-header" style={{marginTop:'20px'}}>
              升级认证
            </div>
            {renderVerified()}
            <br/>
            {
              <div ref="raisedButton">
                <RaisedButton
                  style={{ marginLeft: 30 }}
                  label="确定" secondary={true}
                  onClick={() => this.setState({ showDialog: false })}/>
              </div>
            }
          </div>
        </Dialog>
      )
    }

    const renderDialogItem = (label, value, style = 'bs-dialog-value', br, key) => {
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

    const renderTimeContent = () => {
      return (
        <div style={{ marginTop: 20 }}>
          {renderDialogItem('开始测评日期：', data.startDate)}
          {renderDialogItem('剩余的天数为:', data.remainDay)}
        </div>
      )
    }

    const renderProblemContent = () => {

      return (
        <div style={{ marginTop: 20 }}>
          {data.needLearnedProblem !== 0 &&
          <div>
            <span>{`您已经学习了${data.learnedProblem}门课程，还需学习`}</span>
            <span className={data.remainProblem > 0 ? `upgrade-warn-class` : ``}>{`${data.remainProblem}`}</span>
            <span>门课程</span>
          </div>

          }
          {data.needReviewedNumber !== 0
          && <div>
            <span>{`您的点评数为${data.reviewedNumber}`}</span>
          </div>
          }
          {

          }
          {data.needRequestReviewNumber !== 0 &&
          <div>
            <span>{`您需要的求点评数为${data.requestReviewNumber}，还需的点评数为`}</span>
            <span
              className={data.remainRequestReviewNumber > 0 ? `upgrade-warn-class` : ``}>{` ${data.remainRequestReviewNumber}`}</span>
          </div>
          }

          {data.needValidReviewNumber !== 0 &&
            <div>
            <span>{`您的有效点评数为${data.validReviewNumber},本级至少需要${data.needValidReviewNumber}`}</span>
            </div>
          }

          {data.needReviewRate !== 0 &&
          <div>
            <span>{`您需要达到的点评率为${data.needReviewRate}%，目前点评率为`}</span>
            <span
              className={data.needReviewRate > data.reviewRate ? `upgrade-warn-class` : ``}>{`${data.reviewRate}%`}</span>
          </div>
          }

          {
            data.needHighAnswer !== 0 &&
            <div>
              <span>{`您已经完成的优质回答数为${data.highAnswer}，还需完成的优质回答数为`}</span>
              <span
                className={data.remainHighAnswer > 0 ? `upgrade-warn-class` : ``}>{`${data.remainHighAnswer}`}</span>
            </div>
          }
        </div>
      )
    }

    const renderOffLineWork = () => {
      return (
        <div style={{ marginTop: 20 }}>
          {data.needHostNumber !==
          0 && <div>
            <span>{`您完成的主持人次数为：${data.hostNumber},还需要完成的次数为：`}</span>
            <span className={data.remainHostNumber > 0 ? `upgrade-warn-class` : ``}>{`${data.remainHostNumber}`}</span>
            <div>
              <span>{`您需要完成的主持人评分为：${data.needHostScore},目前的评分为`}</span>
              <span
                className={data.needHostScore > data.hostScore ? `upgrade-warn-class` : ``}>{`${data.hostScore}`}</span>
            </div>
          </div>} {data.needMainPointNumber !==
        0 && <div>
          <span>{`您完成的串讲人次数为${data.mainPointNumber}，还需要完成的次数为：`}</span>
          <span
            className={data.remainPointNumber > 0 ? `upgrade-warn-class` : ``}>{`${data.remainPointNumber}`}</span>
          <div>
            <span>{`您需要完成的串讲人评分为：${data.needPointScore}，目前的评分为：`}</span>
            <span
              className={data.needPointScore > data.mainPointScore ? `upgrade-warn-class` : ``}>{`${data.mainPointScore}`}</span>
          </div>
        </div>}
        </div>
      )
    }

    const renderOnlineWork = () => {
      return (
        <div style={{ marginTop: 20 }}>
          {data.needOnlineAnswer === 'Y' && <div>{`您需要完成线上答疑演习，目前的状态为${data.onlineAnswer}`}</div>} {data.needSwing ===
        'Y' && <div>{`您需要完成吊打演习，目前的状态为${data.swing}`}</div>} {data.needOnlineNumber !== 0 &&
        <div>{`您完成的线上答疑或吊打演习次数为：${data.onlineOrSwingNumber}，还需要完成的次数为：${data.remainOnlineOrSwingNumber}`}</div>}
          {data.needOnlineScore !== 0 &&
          <div>{`您需要完成的线上答疑或吊打评分为：${data.needOnlineScore},目前的评分为：${data.onlineScore}`}</div>}
        </div>
      )
    }

    const renderCamp = () => {
      return (
        <div style={{ marginTop: 20 }}>
          {data.needCampNumber !==
          0 && <div>
            <span>{`您完成的训练营次数为：${data.campNumber},还需要完成的训练营次数为：`}</span>
            <span className={data.remainCampNumber > 0 ? `upgrade-warn-class` : ``}>{`${data.remainCampNumber}`}</span>
          </div>}
          {data.needAsstNumber !== 0 &&
          <div>
            <span>{`您完成的大教练次数为：${data.asstNumber},还需要完成的大教练次数为：`}</span>
            <span className={data.remainAsstNumber > 0 ? `upgrade-warn-class` : ``}>{`${data.remainAsstNumber}`}</span>
          </div>} {data.needCampScore !==
        0 && <div>
          <span>{`您需要完成的训练营评分为：${data.needCampScore},目前的训练营评分为：`}</span>
          <span
            className={data.needCampScore > data.campScore ? `upgrade-warn-class` : ``}>{`${data.campScore}`}</span>
        </div>}
        </div>
      )
    }

    const renderCompany = () => {
      return (
        <div style={{ marginTop: 20 }}>
          {data.needMonthlyWork
          === 'Y' && <div>{`您需要完成每月作业，目前的状态为：${data.monthlyWork}`}</div>} {data.needFosterNew !== 0 &&
        <div>{`您完成的培养新人次数为：${data.fosterNew}，还需要培养新人的次数为：${data.remainFosterNew}`}</div>} {data.needCompanyNumber !==
        0 && <div>{`您完成的企业培训次数为：${data.companyNumber}，还需要完成的企业培训次数为：${data.remainCompanyNumber}`}</div>}
          {data.needCompanyScore !== 0 &&
          <div>{`您需要的企业培训的分数为：${data.needCompanyScore}，目前的分数为：${data.companyTrainScore}`}</div>} </div>
      )
    }

    const renderVerified = ()=>{
      return (
        <div style={{marginTop:20}}>
          <div>{`是否需要升级认证：${data.needVerified}`}</div>
          <div>{`升级认证结果：${data.upGrade}`}</div>
        </div>
      )
    }

    return (
      <div className="upgrade-info-container">
        {renderChoice()}
        {data != '' && renderUpGradeInfo()}
      </div>
    )
  }

}
