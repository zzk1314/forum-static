import * as React from 'react'
import { startLoad, endLoad } from '../../../redux/actions'
import { connect } from 'react-redux'
import { loadGradeInfo } from './async'

@connect(state => state)
export default class UpGradeInfo extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      data: ''
    }
  }

  componentWillMount(){
    const{dispatch} = this.props
    dispatch(startLoad())

    loadGradeInfo().then(res=>{
      dispatch(endLoad())
      if(res.code === 200){
        this.setState({
          data:res.msg
        })
      }
    })


  }


  render() {
    const { data } = this.state
    const renderUpGradeInfo = () => {

      return (
        <div>
          <div>{`倒计时天数:${data.remainDay}`}</div>
          {renderFinished()}
          {renderRemain()}
        </div>
      )
    }

    const renderFinished = ()=>{

      return(
        <div>
            <div>{`已经完成的课程数量：${data.learnedProblem}`}</div>
            <div>{`点评数:${data.reviewedNumber}`}</div>
            <div>{`有效点评率:${data.reviewRate}%`}</div>
            <div>{`已经完成的优质回答数:${data.highAnswer}`}</div>
        </div>
      )
    }

    const renderRemain = () => {
      return(
        <div>
            <div>{`还需完成的课程数量:${data.remainProblem}`}</div>
            <div>{`还需完成的点评数：${data.remainReviewNumber}`}</div>
            <div>{`还需完成的优质回答数:${data.remainHighAnswer}`}</div>
        </div>
      )
    }




    return (
      <div>
        {renderUpGradeInfo()}
      </div>
    )
  }

}
