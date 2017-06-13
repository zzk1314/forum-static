import * as React from "react";
import {connect} from "react-redux";
import "./PracticeView.less";
import {loadNextWarmup, saveWarmup, loadWarmUp} from "../async"
import {BreakSignal, Stop} from "../../../../utils/request"
import {set, startLoad, endLoad, alertMsg} from "../../../../redux/actions"
import Subheader from 'material-ui/Subheader'
import Snackbar from 'material-ui/Snackbar'
import _ from "lodash"
var $ = require('jquery');
import {encodeTextAreaString, decodeTextAreaString, decodeTextAreaString3} from "../../../textUtils"
import Editor from "../../../../components/editor/Editor"
import values = require("lodash/values");

const sequenceMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
}

@connect(state => state)
export default class practiceView extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {},
      edit: false,
      analysisEdit: false,
      questionEdit: false,
      snackOpen: false,
      message: "",
      saving: false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const {dispatch, location} = this.props
    const {id} = location.query
    loadWarmUp(id).then(res => {
      if (res.code === 200) {
        this.setState({
          data: res.msg
        })
      } else {
        throw new BreakSignal(res.msg, "加载当前问题失败")
      }
    })
  }

  onChoiceChange(value, idx) {
    const {data} = this.state
    const {choiceList = []} = data
    if (value !== choiceList[idx].subject) {
      _.set(choiceList[idx], "subject", value)
      _.set(choiceList[idx], "choiceEdit", false)
      this.setState({data, edit: true})
    }
  }

  onAnswerChange(value, idx) {
    const {data} = this.state
    const {choiceList = []} = data
    if (value != choiceList[idx].isRight) {
      _.set(choiceList[idx], "isRight", value === 'true')
      this.setState({data, edit: true})
    }
  }

  onChoiceEdit(idx) {
    const {data} = this.state
    const {choiceList = []} = data
    _.set(choiceList[idx], "choiceEdit", true)
    this.setState({data})
  }

  save() {
    const {data, edit} = this.state
    if (this.refs.editor_question || this.refs.editor_analysis) {
      let editor_question_value = this.refs.editor_question.getValue()
      if (data.question != editor_question_value) {
        this.setState({edit: true})
        _.set(data, "question", editor_question_value)
      }
      let editor_analysis_value = this.refs.editor_analysis.getValue()
      if (data.analysis != editor_analysis_value) {
        _.set(data, "analysis", editor_analysis_value)
        this.setState({edit: true})
      }
    }
    // 保存更新后的题目信息
    saveWarmup(data).then(res => {
      const {code, msg} = res
      if (code === 200) {
        this.setState({message: '保存成功', snackOpen: true, saving: false})
      } else {
        this.setState({message: msg, snackOpen: true, saving: false})
      }
    })
    setTimeout(() => {
      this.setState({snackOpen: false})
    }, 2000)
  }

  back() {
    const {data, edit} = this.state
    if (edit) {
      saveWarmup(data).then(res => {
        this.context.router.push({
          pathname: "/backend/warmup/edit/list",
          query: this.props.location.query
        });
      })
    } else {
      this.context.router.push({
        pathname: "/backend/warmup/edit/list",
        query: this.props.location.query
      });
    }
  }

  render() {
    const {data, questionEdit, analysisEdit, saving} = this.state

    const questionRender = (practice) => {
      const {id, question, voice, analysis, choiceList = [], score = 0, discussList = []} = practice
      return (
        <div className="intro-container">
          <div className="question">
            {
              questionEdit ?
                <Editor id={`editor1`} value={decodeTextAreaString3(question)} ref="editor_question"/> :
                <div className="context" dangerouslySetInnerHTML={{__html: question}}
                     onClick={() => this.setState({questionEdit: true})}></div>
            }
          </div>
          <div className="choice-list">
            {choiceList.map((choice, idx) => choiceRender(choice, idx))}
          </div>
          <div className="analysis">
            <div className="analysis-title">【解析】</div>
            {
              analysisEdit ?
                <Editor id={`editor2`} value={decodeTextAreaString3(analysis)} ref="editor_analysis"/> :
                <div className="context" dangerouslySetInnerHTML={{__html: analysis}}
                     onClick={() => this.setState({analysisEdit: true})}></div>
            }
          </div>
        </div>
      )
    }

    const choiceRender = (choice, idx) => {
      const {id, subject, choiceEdit, isRight} = choice
      return (
        <div key={id} className={`choice`}>
          <div className="select">
            <select value={isRight === true ? 'true' : 'false'}
                    onChange={(e) => this.onAnswerChange(e.currentTarget.value, idx)}>
              <option value={'true'}>√</option>
              <option value={'false'}>×</option>
            </select>
          </div>
          {
            choiceEdit ?
              <input type="text" className="text"
                     onBlur={(e) => this.onChoiceChange(e.currentTarget.value, idx)} defaultValue={subject}/>
              : <div className="text" onClick={() => this.onChoiceEdit(idx)}>{subject}</div>
          }
        </div>
      )
    }

    return (
      <div className="warm-up-edit">
        <Subheader>巩固练习</Subheader>
        {questionRender(data)}

        <div className="submitArea">
          {
            saving ? <div className="submitBtn disabled">保存中</div> :
              <div className="submitBtn" onClick={() => this.save()}>保存</div>
          }
          <div className="submitBtn" onClick={() => this.back()}>返回</div>
        </div>
        <Snackbar
          open={this.state.snackOpen}
          message={this.state.message}
          autoHideDuration={2000}/>
      </div>
    )
  }
}

