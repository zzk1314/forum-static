import * as React from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from '../../../../redux/actions'
import { SelectField, MenuItem, RadioButtonGroup, RadioButton, RaisedButton, TextField, Snackbar } from 'material-ui'
import ChoiceEditor from '../component/ChoiceEditor'
import { insertWarmupPractice, loadWarmUp, saveWarmup } from './async'
import * as _ from 'lodash'
import './WarmupPracticeImport.less'
import Editor from '../../../../components/editor/Editor'
import { loadAllKnowledges, loadAllProblemsAndKnowledges } from '../knowledge/async'

interface WarmupPracticeImportState {
  // 选择题训练对象
  question: string; // 题干
  type: number; // 题型 1-单选 2-多选
  analysis: string; //解析
  pic: string; // 图片
  difficulty: number; // 难度 1-容易 2-普通 3-困难
  knowledgeId: number; // 知识点 id 重要
  sceneId: number; // 场景 id 已过时，默认为 1
  problemId: number; // 难题 id
  sequence: number; // 顺序
  practiceUid: number; // 练习唯一 id，内容团队给出
  example: number; // 是否是例题 0-否 1-是
  problemList: object;
  // 与问题对应的知识点
  knowledgeList: object;
  // 选择题的选择对象
  choices: object;
  choicesCnt: number;
  choiceList: object;
  problems: object; // 返回所有小课列表
  knowledges: object; // 返回所有知识点列表
  knowledgesForSelect: object; // 根据小课列表筛选出的 Knowledge 集合
  problemSelect: number; // 选择 problem
  knowledgeSelect: number; //选择 知识点
  showSnackBar: boolean; // 提交成功提示消息
}

@connect(state => state)
export default class WarmupPracticeImport extends React.Component<any, WarmupPracticeImportState> {

  constructor() {
    super()
    this.state = {
      choices: [],
      choicesCnt: 1,
      problemList: [],
      knowledgeList: [],
      problems: [],
      knowledges: [],
      knowledgesForSelect: [],
      showSnackBar: false,
      choiceList: []
    }
  }

  componentWillMount(nextProps) {
    const { location } = nextProps || this.props;

    if(location.query.id) {
      const { id } = location.query
      loadWarmUp(id).then(res => {
        const { msg } = res
        if(res.code == 200) {
          this.setState({
            id: id,
            problemSelect: msg.problemId,
            practiceUid: msg.practiceUid,
            sequence: msg.sequence,
            question: msg.question,
            analysis: msg.analysis,
            difficulty: msg.difficulty,
            knowledgeSelect: msg.knowledgeId,
            type: msg.type,
            example: msg.example ? 1 : 0,
            choicesCnt: msg.choicesCnt,
            choiceList: msg.choiceList
          })
        }
      })

      loadAllKnowledges().then(res => {
        const { code, msg } = res
        if(res.code == 200) {
          this.setState({
            knowledgesForSelect: msg
          })
        }
      })

    } else {
      this.clear()
    }

    loadAllProblemsAndKnowledges().then(res => {
      const { code, msg } = res
      if(res.code === 200) {
        this.setState({
          problems: msg.problems,
          knowledges: msg.knowledges
        })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.location.query.id !== nextProps.location.query.id) {
      this.componentWillMount(nextProps);
    }
  }

  submitWarmupPractice() {
    const {
      id,
      question, type, analysis, choiceList,
      difficulty, sequence, practiceUid, example,
      choices, problemSelect, knowledgeSelect
    } = this.state

    const { dispatch } = this.props
    if(this.props.location.query.id) {
      let question, analysis
      if(this.refs.question) {
        question = this.refs.question.getValue()
      }
      else {
        question = this.state.question
      }
      if(this.refs.analysis) {
        analysis = this.refs.analysis.getValue()
      }
      else {
        analysis = this.state.analysis
      }

      const param = {
        id,
        question: question,
        analysis: analysis,
        edit: true,
        type,
        difficulty,
        knowledgeId: knowledgeSelect,
        problemId: problemSelect,
        sequence: parseInt(_.trim(sequence)),
        practiceUid: _.trim(practiceUid),
        example,
        choiceList,
        choices: _.filter(choices, function(choice) {
          return _.trim(choice.subject) != ''
        })

      }
      if(param.question == '' || param.analysis == '' || param.practiceUid == '') {
        dispatch(alertMsg('数据必输项未填写完成，请重试'))
      } else if(!param.sequence) {
        dispatch(alertMsg('数据格式异常，请重试'))
      } else {
        dispatch(startLoad())
        saveWarmup(param).then(res => {
          dispatch(endLoad())
          if(res.code === 200) {
            this.setState({ showSnackBar: true }, () => {
              setTimeout(() => {
                this.disableSnackBar()
              }, 1000)
            })
          } else {
            dispatch(alertMsg(res.msg))
          }
        }).catch(e => {
          dispatch(endLoad())
          dispatch(alertMsg(e))
        })
      }
    }
    else {
      const param = {
        question: this.refs.question.getValue(),
        type,
        analysis: this.refs.analysis.getValue(),
        pic: null,
        difficulty,
        knowledgeId: knowledgeSelect,
        problemId: problemSelect,
        sequence: parseInt(_.trim(sequence)),
        practiceUid: _.trim(practiceUid),
        example,
        choiceList,
        choices: _.filter(choices, function(choice) {
          return _.trim(choice.subject) != ''
        })
      }
      if(param.question == '' || param.analysis == '' || param.practiceUid == '' || param.choices.length == 0 || type == undefined || difficulty == undefined || example == undefined) {
        dispatch(alertMsg('数据必输项未填写完成，请重试'))
      } else if(!param.sequence) {
        dispatch(alertMsg('数据格式异常，请重试'))
      } else {
        dispatch(startLoad())
        insertWarmupPractice(param).then(res => {
          dispatch(endLoad())
          if(res.code === 200) {
            this.setState({ showSnackBar: true }, () => {
              this.refs.question.setValue('')
              this.refs.analysis.setValue('')
              this.clear()
              setTimeout(() => {
                this.disableSnackBar()
              }, 1000)
            })
          } else {
            dispatch(alertMsg(res.msg))
          }
        }).catch(e => {
          dispatch(endLoad())
          dispatch(alertMsg(e))
        })
      }
    }

  }

  disableSnackBar() {
    this.setState({
      showSnackBar: false
    })
  }

  // 选择题答案 check
  handleClickCheckBox(isRight, subject, id) {
    // 开始时 默认值都为 false
    // 将对应 id 值的 checkbox 值拼装
    // questionid 要通过后端 insert WarmupPractice 返回得到
    let { choices } = this.state
    choices[ id ] = { sequence: id + 1, isRight, subject: _.trim(subject) }
    this.setState({
      choices: choices
    })
  }

  // 移除选择
  handleClickRemoveChoice() {
    const { choicesCnt } = this.state
    if(choicesCnt >= 1) {
      this.setState({ choicesCnt: choicesCnt - 1 })
    }
  }

  onAnswerChange(value, idx) {
    const { choiceList = [] } = this.state
    if(value != choiceList[ idx ].isRight) {
      _.set(choiceList[ idx ], 'isRight', value === '√')
      this.setState({ choiceList, edit: true })
    }
  }

  onChoiceEdit(idx) {
    const { choiceList = [] } = this.state
    _.set(choiceList[ idx ], 'choiceEdit', true)
    this.setState({ choiceList })
  }

  onChoiceChange(value, idx) {
    const { choiceList = [] } = this.state
    if(value !== choiceList[ idx ].subject) {
      _.set(choiceList[ idx ], 'subject', value)
      _.set(choiceList[ idx ], 'choiceEdit', false)
      this.setState({ choiceList, edit: true })
    }
  }

  clear() {
    this.setState({
      type: null,
      pic: null,
      difficulty: null,
      knowledgeId: null,
      sceneId: 1,
      problemId: null,
      sequence: '',
      practiceUid: '',
      example: null,
      problemList: [],
      knowledgeList: [],
      choices: [],
      choicesCnt: 1,
      choiceList: [],
      knowledgesForSelect: [],
      problemSelect: null,
      knowledgeSelect: null,
      question: '',
      analysis: ''
    })
    if(this.refs.question) {
      this.refs.question.setValue('')
    }
    if(this.refs.analysis) {
      this.refs.analysis.setValue('')
    }
  }

  render() {
    let isUpdate = this.props.location.query.id ? true : false
    const {
      question, type, analysis, choiceList,
      difficulty, sequence,
      practiceUid, example,
      choices, choicesCnt, problems, knowledges, knowledgesForSelect,
      problemSelect, knowledgeSelect, showSnackBar
    } = this.state

    const renderProblemSelect = () => {
      return (
        <SelectField
          floatingLabelText="小课选择" maxHeight={300}
          value={problemSelect} disabled={isUpdate}
          onChange={(ev, value) => {
            let targetValue = ev.target.textContent
            const targetNum = parseInt(targetValue.slice(0, targetValue.indexOf('、')))
            const targetKnowledges = _.filter(knowledges, { problemId: targetNum })
            let knowledgesForSelect = []
            if(targetKnowledges.length > 0) {
              knowledgesForSelect = targetKnowledges[0].knowledges
            }
            this.setState({
              problemSelect: targetNum,
              knowledgesForSelect: knowledgesForSelect
            })
          }}
        >
          {
            problems.map((item, idx) => {
              return (
                <MenuItem key={idx} value={item.id} primaryText={item.id + '、' + item.problem}/>
              )
            })
          }
        </SelectField>
      )
    }

    const renderKnowledgeSelect = () => {
      return (
        <SelectField
          floatingLabelText="知识点选择" maxHeight={400}
          value={knowledgeSelect} disabled={isUpdate}
          onChange={(ev, value) => {
            let targetValue = ev.target.textContent
            const targetNum = parseInt(targetValue.slice(0, targetValue.indexOf('、')))
            this.setState({
              knowledgeSelect: targetNum
            })
          }}>
          {
            knowledgesForSelect.map((item, idx) => {
              return (
                <MenuItem value={item.id} primaryText={item.id + '、' + item.knowledge} key={idx}/>
              )
            })
          }
        </SelectField>
      )
    }

    /**
     * 加载主体信息
     **/
    const renderMainInfo = () => {
      return (

        <div className="intro-container">
          <div className="question">
            <div className="question-title">【题干】</div>
            <Editor
              id="question" ref="question"
              value={question}
            />

          </div>
          <div className="analysis">
            <div className="analysis-title">【解析】</div>
            <Editor
              id="analysis" ref="analysis"
              value={analysis}
            />
          </div>
        </div>
      )
    }

    const renderUpdateChoices = () => {
      return (
        <div className="choice-list">
          {choiceList.map((choice, idx) => choiceRender(choice, idx))}
        </div>
      )
    }

    const choiceRender = (choice, idx) => {
      const { id, subject, choiceEdit, isRight } = choice
      return (
        <div key={id} className={`choice`}>
          <div className="select">
            <SelectField style={{ width: '70' }}
                         floatingLabelText="选项" maxHeight={300}
                         value={isRight === true ? 'true' : 'false'}
                         onChange={(e) => this.onAnswerChange(e.target.textContent, idx)}
            >
              <MenuItem key={1} value={'true'} primaryText={'√'}/>
              <MenuItem key={2} value={'false'} primaryText={'×'}/>
            </SelectField>
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
    const renderChoices = () => {
      let choices = []
      for(let i = 0; i < this.state.choicesCnt; i++) {
        choices.push(
          <ChoiceEditor
            key={i}
            onChange={(isInputCheck, choiceLabel) => this.handleClickCheckBox(isInputCheck, choiceLabel, i)}
          />
        )
      }
      return choices
    }

    const showChoiceBtn = () => {
      return (
        <div>
          <RaisedButton className="main-btn" label="增加选项" primary={true}
                        onTouchTap={() => {
                          this.setState({ choicesCnt: this.state.choicesCnt + 1 })
                        }}/>
          <RaisedButton className="main-btn" label="删除选项" primary={true}
                        onTouchTap={()=>this.handleClickRemoveChoice()}/>
        </div>
      )
    }

    const renderOtherComponents = () => {
      return (
        <Snackbar
          open={showSnackBar}
          message="提交数据成功"
          autoHideDuration={1000}
        />
      )
    }

    return (
      <div className="practice-input-container">
        <div className="practice-input-page">
          <div className="practice-header">选择题录入（更新）页面</div>
          <div className="practice-init">
            <div className="practice-step">Step1、选择所在小课及知识点</div>
            <div className="selecte-field">
              {renderProblemSelect()}
              {renderKnowledgeSelect()}
            </div>
          </div>
          <div className="practice-basis">
            <div className="practice-step">Step2、录入基本要点</div>
            <br/>
            <div className="basis-flex-box">
              <TextField
                hintText="在这里输入练习唯一 id" floatingLabelText=" 练习唯一 id" value={practiceUid} disabled={isUpdate}
                onChange={(ev, value) => {
                  this.setState({ practiceUid: value })
                }}
              />
              <TextField
                hintText="在这里输入题目顺序" floatingLabelText="题目顺序" value={sequence} disabled={isUpdate}
                onChange={(ev, value) => {
                  this.setState({ sequence: value })
                }}
              />
            </div>
          </div>
          <div className="practice-main">
            <div className="practice-step">Step3、录入主体详情</div>
            {renderMainInfo()}
            <div className="practice-choice ">
              {isUpdate ? <div className="practice-step">Step4、选择题选项</div> :
                <div className="practice-step">Step4、添加选择题选项（若该选项为正确选项，勾选左侧按钮）</div>}
              {isUpdate ? renderUpdateChoices() : renderChoices()}

              {isUpdate ? null : showChoiceBtn()}
            </div>
          </div>
          <div className="practice-addition">
            <div className="practice-step">Step5、录入额外信息</div>
            <div className="pratice-tip">1）选择题目类型</div>
            <RadioButtonGroup name="typeGroup" className="radio-group"
                              valueSelected={type}
                              onChange={(ev, value) => this.setState({ type: value })}>
              <RadioButton value={1} label="单选"/>
              <RadioButton value={2} label="多选"/>
            </RadioButtonGroup>
            <div className="pratice-tip">2）选择题目难易度</div>
            <RadioButtonGroup name="typeGroup" className="radio-group"
                              valueSelected={difficulty}
                              onChange={(ev, value) => this.setState({ difficulty: value })}>
              <RadioButton value={1} label="容易"/>
              <RadioButton value={2} label="普通"/>
              <RadioButton value={3} label="困难"/>
            </RadioButtonGroup>
            <div className="pratice-tip">3）该题是否为例题</div>
            <RadioButtonGroup name="exampleGroup" className="radio-group"
                              valueSelected={example}
                              onChange={(ev, value) => this.setState({ example: value })}>
              <RadioButton value={0} label="否"/>
              <RadioButton value={1} label="是"/>
            </RadioButtonGroup>
          </div>
          <RaisedButton
            className="submit-btn" label="提交题目" primary={true}
            onTouchTap={()=>this.submitWarmupPractice()}/>
        </div>
        {renderOtherComponents()}
      </div>
    )
  }

}

