import * as React from "react"
import "./DropChoice.less"
import TweenOne, { TweenOneGroup } from 'rc-tween-one'
import { get, set, merge, findIndex } from "lodash"
import AssetImg from "./AssetImg"
import { mark } from "utils/request"

export default class DropChoice extends React.Component<any,any> {
  constructor(props) {
    super(props)
    this.contentWidth = (560 / 750 * window.innerWidth) > 300 ? 300 : (560 / 750 * window.innerWidth)
    this.problemFontSize = (30 / 750 * window.innerWidth) > 25 ? 25 : (30 / 750 * window.innerWidth)
    this.topFontSize = (28 / 750 * window.innerWidth) > 20 ? 20 : (28 / 750 * window.innerWidth)
    this.topLineHeight = (40 / 750 * window.innerWidth) > 40 ? 40 : 40 / 750 * window.innerWidth
    this.topHeight = 384 / 560 * this.contentWidth

    this.topDotBM = 20 / 560 * this.contentWidth
    this.topDotSize = 14 / 560 * this.contentWidth
    this.dotFontSize = 24 / 560 * this.contentWidth
    this.topDotTM = 15 / 560 * this.contentWidth
    this.topTipBM = this.topDotBM + this.topDotSize + this.topDotTM

    this.choiceFontSize = 30 / 560 * this.contentWidth
    this.choiceLRPD = 80 / 560 * this.contentWidth

    this.closeTMB = 30 / 560 * this.contentWidth
    this.closeSize = 70 / 560 * this.contentWidth
    this.contentHeight = this.topHeight

    this.state = {
      idx: 0,
      curChoice: null,
      questionList: this.props.questionList ? this.props.questionList : [],
      next: false,
      close: false,
      submit: false,
    }
  }

  next() {
    const { questionList, idx } = this.state
    // 检查是否能下一个
    if(questionList && (!questionList[ idx ].choiceList ||
      findIndex(questionList[ idx ].choiceList, (o) => o.selected) !== -1)) {
      if(idx === (questionList.length - 1)) {
        mark({module:"打点", function:"课程打分", action:"提交"})
        // 最后一个
        this.setState({ submit: true })
      } else {
        mark({module:"打点", function:"课程打分", action:"点击下一步", memo: idx+1})
        //选择题为必填，填空题选填
        if(questionList[ idx + 1 ].choiceList) {
          this.setState({ idx: idx + 1, next: false })
        } else {
          this.setState({ idx: idx + 1, next: true })
        }

      }
    }
  }

  selected(choice, seq) {
    const { questionList, idx } = this.state
    let newList = merge([], questionList)

    // 如果多选，注释掉下面即可
    newList[ idx ].choiceList.forEach(item => {
      item.selected = false
    })

    this.setState({
      questionList: set(newList,
        `[${idx}].choiceList[${seq}].selected`,
        !get(questionList, `[${idx}].choiceList[${seq}].selected`)),
      next: !get(questionList, `[${idx}].choiceList[${seq}].selected`)
    })
  }

  comment(e) {
    let { questionList, idx } = this.state
    set(questionList, `[${idx}].comment`, e.currentTarget.value)
    this.setState({ questionList })
  }

  onEnd(e) {
    const { questionList, idx } = this.state
    if(e.mode === "onComplete") {
      if(this.state.close) {
        // 关闭
        this.props.onClose()
      } else if(this.state.submit) {
        // 提交
        this.props.onSubmit(questionList)
      } else {
      }
    }
  }

  render() {
    const { questionList = [] } = this.state
    const curQuestion = questionList && questionList.length > 0 ? questionList[ this.state.idx ] : {}
    const { subject, choiceList } = curQuestion
    return (
      <div className="screen-mask-container">
        <div className="screen-mask"/>
        <TweenOne
          style={{width:`${this.contentWidth}px`,marginTop:`${-this.contentHeight}px`,left:`${(window.innerWidth - this.contentWidth)/2}px`}}
          onChange={(e)=>this.onEnd(e)}
          animation={{y:this.state.close || this.state.submit? - window.innerWidth:this.contentHeight }} component="div"
          className="content-container">
          <div className="top" style={{height:`${this.topHeight}px`}}>
            <div className="top-tips" style={{height:`${this.topHeight/2.1}px`}}>
              <span dangerouslySetInnerHTML={{__html: subject}}/>
            </div>
            <div className="top-dots"
                 style={{height:`${this.topTipBM}px`,lineHeight:`${this.topTipBM}px`,fontSize:`${this.dotFontSize}px`}}>
              {`${this.state.idx + 1}/${questionList ? questionList.length : 0}`}
            </div>
          </div>
          <div className="choice-list" style={{padding:`0 ${this.choiceLRPD/2}px`}}>
            {choiceList ? choiceList.map((item, seq) => {
                return (
                  <div className={`choice ${item.selected?"selected":""}`} onClick={()=>this.selected(item,seq)}
                       style={{paddingTop:`${this.choiceFontSize /3*2}px`,paddingBottom:`${this.choiceFontSize/3*2}px`,fontSize:`${this.choiceFontSize}px`,lineHeight:`${this.choiceFontSize}px`}}>
                    {item.subject}
                  </div>
                )
              }) : <textarea className="comment" placeholder="每一条我们都会仔细阅读，如果建议被采纳的话，可能有机会成为我们的优先体验官哦！（字数上限1000）"
                             maxLength="1000" onChange={(e)=>this.comment(e)}>
              </textarea>}
          </div>
          <div className={`bottom-btn ${this.state.next?'can':''}`} onClick={()=>this.next()}
               style={{height:`${this.choiceLRPD}px`,lineHeight:`${this.choiceLRPD}px`}}>
            <span>{questionList && (questionList.length - 1) === this.state.idx ? "完成" : '下一步'}</span>
          </div>
          <div className="close-container" style={{marginTop:`${this.closeTMB}px`}}>
            <span onClick={()=>this.setState({close:true})}><AssetImg type="white_close_btn"
                                                                      size={this.closeSize}/></span>
          </div>
        </TweenOne>
      </div>
    )
  }

}
