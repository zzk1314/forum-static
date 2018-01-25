import * as React from 'react'
import { startLoad, endLoad } from '../../../redux/actions'
import { connect } from 'react-redux'
import { loadGradeInfo } from './async'
import './UpGradeInfo.less'

@connect(state => state)
export default class UpGradeInfo extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      data: ''
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
      }
    })

  }

  render() {
    const { data } = this.state
    const renderUpGradeInfo = () => {

      return (
        <div className="info-container">
          <div>{`开始审核日期：${data.startDate}`}</div>
          <div>{`倒计时天数：${data.countDown}`}</div>
          <div>{`剩余的天数为：${data.remainDay}`}</div>
          {data.needLearnedProblem !== 0 && <div>{`您已经学习了${data.learnedProblem}门课程，还需学习${data.remainProblem}门课程`}</div>}
          {data.needReviewedNumber !== 0 &&
          <div>{`您的点评数为${data.reviewedNumber}，还需的点评数为${data.remainReviewNumber}`}</div>}
          {data.needRequestReviewNumber !== 0 &&
          <div>{`您已经完成的求点评数为${data.requestReviewNumber},还要完成的求点评数为${data.remainRequestReviewNumber}`}</div>}
          {data.needReviewRate !== 0 && <div>{`您需要完成的点评率为${data.needReviewRate}%,目前的点评率为${data.reviewRate}%`}</div>}
          {data.needHighAnswer !== 0 &&
          <div>{`您已经完成的优质回答数为${data.highAnswer}，还需完成的优质回答数为${data.remainHighAnswer}`}</div>}
          {data.needHostNumber !== 0 && <div>{`您完成的主持人次数为：${data.hostNumber},还需要完成的次数为：${data.remainHostNumber}`}</div>}
          {data.needHostScore !== 0 && <div>{`您需要完成的主持人评分为：${data.needHostScore},目前的评分为${data.hostScore}`}</div>}
          {data.needMainPointNumber !== 0 &&
          <div>{`您完成的串讲人次数为${data.mainPointNumber}，还需要完成的次数为：${data.remainPointNumber}`}</div>}
          {data.needPointScore !== 0 &&
          <div>{`您需要完成的串讲人评分为：${data.needPointScore}，目前的评分为：${data.mainPointScore}`}</div>}
          {data.needOnlineAnswer === 'Y' && <div>{`您需要完成线上答疑演习，目前的状态为${data.onlineAnswer}`}</div>}
          {data.needSwing === 'Y' && <div>{`您需要完成吊打演习，目前的状态为${data.swing}`}</div>}
          {data.needOnlineNumber !== 0 &&
          <div>{`您完成的线上答疑或吊打演习次数为：${data.onlineOrSwingNumber}，还需要完成的次数为：${data.remainOnlineOrSwingNumber}`}</div>}
          {data.needOnlineScore !== 0 &&
          <div>{`您需要完成的线上答疑或吊打评分为：${data.needOnlineScore},目前的评分为：${data.onlineScore}`}</div>}
          {data.needCampNumber !== 0 &&
          <div>{`您完成的训练营次数为：${data.campNumber},还需要完成的训练营次数为：${data.remainCampNumber}`}</div>}
          {data.needAsstNumber !== 0 &&
          <div>{`您完成的大教练次数为：${data.asstNumber},还需要完成的大教练次数为：${data.remainAsstNumber}`}</div>}
          {data.needCampScore !== 0 && <div>{`您需要完成的训练营评分为：${data.needCampScore},目前的训练营评分为：${data.campScore}`}</div>}
          {data.needMonthlyWork === 'Y' && <div>{`您需要完成每月作业，目前的状态为：${data.monthlyWork}`}</div>}
          {data.needFosterNew !== 0 && <div>{`您完成的培养新人次数为：${data.fosterNew}，还需要培养新人的次数为：${data.remainFosterNew}`}</div>}
          {data.needCompanyNumber!== 0 && <div>{`您完成的企业培训次数为：${data.companyNumber}，还需要完成的企业培训次数为：${data.remainCompanyNumber}`}</div>}
          {data.needCompanyScore!==0 && <div>{`您需要的企业培训的分数为：${data.needCompanyScore}，目前的分数为：${data.companyScore}`}</div>}
          </div>
      )
    }

    return (
      <div className="upgrade-info-container">
        {renderUpGradeInfo()}
      </div>
    )
  }

}
