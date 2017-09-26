import * as React from "react";
import { connect } from "react-redux";
import { startLoad, endLoad, alertMsg } from "redux/actions";
import { SelectField, MenuItem, RadioButtonGroup, RadioButton, RaisedButton, TextField, Snackbar } from "material-ui";
import ChoiceEditor from "./inputcomponents/ChoiceEditor";
import { insertWarmupPractice, loadAllProblemsAndKnowledges, loadWarmupPracticeByPracticeUid } from "../async";
import * as _ from "lodash";
import "./WarmupPracticeImport.less";

interface WarmupPracticeImportState {
  // 巩固练习训练对象
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
  // 巩固练习的选择对象
  choices: object;
  choicesCnt: number;

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
      showSnackBar: false
    }
  }

  componentWillMount() {
    loadAllProblemsAndKnowledges().then(res => {
      const { code, msg } = res
      if(res.code === 200) {
        this.setState({
          problems: msg.problems,
          knowledges: msg.knowledges,
        })
      }
    })
  }

  submitWarmupPractice() {
    const {
      question, type, analysis, pic,
      difficulty, sequence, practiceUid, example,
      choices, problemSelect, knowledgeSelect
    } = this.state

    const param = {
      question: _.trim(question),
      type,
      analysis: _.trim(analysis),
      pic: _.trim(pic),
      difficulty,
      knowledgeId: knowledgeSelect,
      problemId: problemSelect,
      sequence: parseInt(_.trim(sequence)),
      practiceUid: _.trim(practiceUid),
      example,
      choices: _.filter(choices, function(choice) {
        return _.trim(choice.subject) != ''
      })
    }

    const { dispatch } = this.props
    if(param.question == "" || param.analysis == "" || param.practiceUid == "" || param.choices.length == 0) {
      dispatch(alertMsg("数据必输项未填写完成，请重试"))
    } else if(!param.sequence) {
      dispatch(alertMsg('数据格式异常，请重试'))
    } else {
      dispatch(startLoad())
      insertWarmupPractice(param).then(res => {
        dispatch(endLoad())
        if(res.code === 200) {
          this.setState({ showSnackBar: true }, () => {
            this.clear();
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

  loadDefaultWarmupPractice(practiceUid) {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadWarmupPracticeByPracticeUid(_.trim(practiceUid)).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        console.log(msg)
        const targetKnowledges = _.filter(this.state.knowledges, {problemId: msg.problemId})
        this.setState({
          question: msg.question,
          analysis: msg.analysis,
          problemId: msg.problemId,
          problemSelect: msg.problemId,
          knowledgeId: msg.knowledgeId,
          knowledgeSelect: msg.knowledgeId,
          knowledgesForSelect: targetKnowledges[0].knowledges,
          sequence: msg.sequence,
          type: msg.type,
          difficulty: msg.difficulty,
          example: msg.example ? 1 : 0
        })
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })
  }

  // 选择题答案 check
  handleClickCheckBox(isRight, subject, id) {
    // 开始时 默认值都为 false
    // 将对应 id 值的 checkbox 值拼装
    // questionid 要通过后端 insert WarmupPractice 返回得到
    let { choices } = this.state
    choices[id] = { sequence: id + 1, isRight, subject: _.trim(subject) }
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

  clear(){
    this.setState({
    question: '',
    type: null,
    analysis: '',
    pic: null,
    difficulty: null,
    knowledgeId: null,
    sceneId: 1,
    problemId: null,
    sequence: null,
    practiceUid: '',
    example: null,
    problemList: [],
    knowledgeList: [],
    choices: [],
    choicesCnt: 1,
    knowledgesForSelect: [],
    problemSelect: null,
    knowledgeSelect: null,
    showSnackBar: false,
    })
  }

  render() {
    const {
      warmupPractice, question, type, analysis, pic,
      difficulty, knowledgeId, problemId, sequence,
      practiceUid, example, problemList, knowledgeList,
      choices, choicesCnt, problems, knowledges, knowledgesForSelect,
      problemSelect, knowledgeSelect, showSnackBar
    } = this.state

    const renderProblemSelect = () => {
      return (
        <SelectField
          floatingLabelText="小课选择" maxHeight={300}
          value={problemSelect}
          onChange={(ev, value) => {
            let targetValue = ev.target.textContent
            const targetNum = parseInt(targetValue.slice(0, targetValue.indexOf("、")))
            const targetKnowledges = _.filter(knowledges, { problemId: targetNum });
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
                <MenuItem key={idx} value={item.id} primaryText={item.id + "、" + item.problem}/>
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
          value={knowledgeSelect}
          onChange={(ev, value) => {
            let targetValue = ev.target.textContent
            const targetNum = parseInt(targetValue.slice(0, targetValue.indexOf("、")))
            this.setState({
              knowledgeSelect: targetNum
            })
          }}>
          {
            knowledgesForSelect.map((item, idx) => {
              return (
                <MenuItem value={item.id} primaryText={item.id + "、" + item.knowledge} key={idx}/>
              )
            })
          }
        </SelectField>
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
          <div className="practice-header">巩固练习录入页面</div>
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
            <div className="pratice-tip">根据 PracticeUid 获取当前其余数据（更改题目时需要）</div>
            <RaisedButton
              className="load-practice" label="加载数据" primary={true}
              onTouchTap={this.loadDefaultWarmupPractice.bind(this, practiceUid)}/>
            <div className="basis-flex-box">
              <TextField
                hintText="在这里输入练习唯一 id" floatingLabelText=" 练习唯一 id" value={ practiceUid }
                onChange={(ev, value) => {
                  this.setState({ practiceUid: value })
                }}
              />
              <TextField
                hintText="在这里输入题目顺序" floatingLabelText="题目顺序" value={ sequence }
                onChange={(ev, value) => {
                  this.setState({ sequence: value })
                }}
              />
            </div>
          </div>
          <div className="practice-main">
            <div className="practice-step">Step3、录入主体详情</div>
            <TextField
              className="block-item" fullWidth={true} hintText="在这里输入巩固练习的题干"
              multiLine={true} value={question} floatingLabelText="题干（question）"
              onChange={(ev, value) => {
                this.setState({ question: value })
              }}
            />
            <TextField
              className="block-item" fullWidth={true} value={ pic }
              hintText="在这里输入图片链接地址" floatingLabelText="图片 URL（pic），非必填"
              onChange={(ev, value) => {
                this.setState({ pic: value })
              }}
            />
            <TextField
              className="block-item" fullWidth={true} hintText="在这里输入巩固练习的解析"
              floatingLabelText="解析（analysis）" multiLine={true} value={analysis}
              onChange={(ev, value) => {
                this.setState({ analysis: value })
              }}
            />
            <div className="practice-choice ">
              <div className="practice-step">Step4、添加巩固练习选项（若该选项为正确选项，勾选左侧按钮）</div>
              {renderChoices()}
              <RaisedButton className="main-btn" label="增加选项" primary={true}
                            onTouchTap={() => {
                              this.setState({ choicesCnt: this.state.choicesCnt + 1 })
                            }}/>
              <RaisedButton className="main-btn" label="删除选项" primary={true}
                            onTouchTap={this.handleClickRemoveChoice.bind(this)}/>
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
            onTouchTap={this.submitWarmupPractice.bind(this)}/>
        </div>
        {renderOtherComponents()}
      </div>
    )
  }

}

