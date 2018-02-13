import * as React from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import * as _ from 'lodash'

import { SelectField, MenuItem, RadioButtonGroup, RadioButton, RaisedButton, TextField, Snackbar } from 'material-ui'
import { insertApplicationPractice, loadApplication, updateApplicationPractice } from './async'
import { loadAllProblemsAndKnowledges, loadAllKnowledges } from '../knowledge/async'

import './ApplicationImport.less'
import Editor from '../../../../components/editor/Editor'

interface ApplicationImportState {
  //应用题对象
  topic: string;//任务标题
  description: string;//描述
  difficulty: number;//难易度（1-容易，2-普通，3-困难）
  knowledgeId: number;//知识点id
  sceneId: number;//场景id
  sequence: number;//顺序
  problemId: number;//专题id
  pic: string;//应用题图片
  practiceUid: string;//练习唯一id
  updated: number;
  problems: object;//返回所有小课列表
  knowledges: object;//返回所有知识点列表
  knowledgesForSelect: object; // 根据小课列表筛选出的 Knowledge 集合
  problemSelect: number; // 选择 problem
  knowledgeSelect: number; //选择 知识点
  sequenceSelect;
  showSnackBar: boolean; // 提交成功提示消息
  isEdit: boolean;//判断是新增还是修改
}

/**
 * 应用题导入
 */
@connect(state => state)
export default class ApplicationImport extends React.Component<any, ApplicationImportState> {
  constructor() {
    super()
    this.state = {
      problems: [],
      knowledges: [],
      knowledgesForSelect: [],
      showSnackBar: false,
      difficulty: -1,
      isEdit: false
    }
  }

  componentWillMount(nextProps) {

    const { location } = nextProps || this.props;
    if(location.query.applicationId) {
      this.setState({
        isEdit:true
      })

      loadAllKnowledges().then(res => {
        const { code, msg } = res
        if(res.code == 200) {
          this.setState({
            knowledgesForSelect: msg
          })
        }
      })

      loadApplication(location.query.applicationId).then(res => {
        const { code, msg } = res
        if(res.code === 200) {
          this.setState({
            problemSelect: msg.problemId,
            knowledgeSelect: msg.knowledgeId,
            practiceUid: msg.practiceUid,
            sequence: msg.sequence,
            topic: msg.topic,
            description: msg.description,
            difficulty: msg.difficulty,
            sequenceSelect: msg.sequence
          })
        }
      })
    }

    else{
      this.clear()
      if(this.refs.description){
        this.refs.description.setValue('')
      }
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
    if(this.props.location.query.applicationId !== nextProps.location.query.applicationId){
      this.componentWillMount(nextProps);
    }
  }

  /**
   * 应用题提交
   **/
  submitApplication() {
    const { topic, difficulty, sequenceSelect, pic, practiceUid, knowledgeSelect, problemSelect } = this.state
    let description = this.refs.description.getValue()
    const param = {
      topic: _.trim(topic),
      description,
      difficulty,
      sceneId: 1,
      updated: 2,
      sequence: sequenceSelect,
      problemId: problemSelect,
      pic:null,
      practiceUid: _.trim(practiceUid),
      knowledgeId: knowledgeSelect
    }
    const { dispatch } = this.props
    if(param.topic == '' || param.description == '' || param.difficulty == -1 || param.sequence == null || param.problemId == '' || param.practiceUid == '' || param.knowledgeId == '') {
      dispatch(alertMsg('数据必输项未填写完成，请重试'))
    } else if(isNaN(param.sequence)) {
      dispatch(alertMsg('数据格式异常，请重试'))
    } else {
      dispatch(startLoad())
      //判断是新增还是更新
      if(this.props.location.query.applicationId) {
        updateApplicationPractice(this.props.location.query.applicationId, topic, description, difficulty).then(res => {
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
      else {
        insertApplicationPractice(param).then(res => {
          dispatch(endLoad())
          if(res.code === 200) {
            this.refs.description.setValue('')
            this.setState({ showSnackBar: true }, () => {
              setTimeout(() => {
                this.clear()
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

  clear() {
    this.setState({
      sequenceSelect: null,
      problemSelect: null,
      knowledgeSelect: null,
      practiceUid: '',
      sequence: '',
      topic: '',
      pic: '',
      difficulty: -1,
      knowledgesForSelect: []
    })
  }

  disableSnackBar() {
    this.setState({
      showSnackBar: false
    })
  }

  render() {
    let isEdit = this.props.location.query.applicationId ? true : false
    const {
      topic, difficulty, description,
      sequenceSelect, pic, practiceUid,
      problems, knowledges, knowledgesForSelect,
      problemSelect, knowledgeSelect, showSnackBar
    } = this.state

    const renderProblemSelect = () => {
      return (
        <SelectField
          floatingLabelText="小课选择" maxHeight={300}
          value={problemSelect} disabled={isEdit}
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
          value={knowledgeSelect} disabled={isEdit}
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

    const renderChooseSequence = () => {
      return (
        <SelectField
          floatingLabelText="顺序选择" maxHeight={300}
          value={sequenceSelect} disabled={isEdit}
          onChange={(ev, value) => {
            let targetValue = ev.target.textContent
            const targetNum = parseInt(targetValue)
            this.setState({
              sequenceSelect: targetNum
            })
          }}
        >
          <MenuItem key={1} value={1} primaryText={1}/>
          <MenuItem key={2} value={2} primaryText={2}/>
        </SelectField>
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
      <div className="application-input-container">
        <div className="application-input-page">
          <div className="application-header">应用题导入(更新)页面</div>
          <div className="application-init">
            <div className="application-step">Step1、选择所在小课及知识点</div>
            <div className="selecte-field">
              {renderProblemSelect()}
              {renderKnowledgeSelect()}
            </div>
          </div>
          <div className="application-basis">
            <div className="application-step">Step2、录入基本要点</div>
            <br/>
            <div className="basis-flex-box">
              <TextField
                hintText="在这里输入练习id" floatingLabelText=" 练习唯一 id(practiceUid)" value={practiceUid} disabled={isEdit}
                onChange={(ev, value) => {
                  this.setState({ practiceUid: value })
                }}
              />
              {renderChooseSequence()}
            </div>

          </div>

          <div className="application-main">
            <div className="application-step">Step3、录入主体详情</div>
            <TextField
              className="block-item" fullWidth={true} hintText="在这里输入任务标题"
              multiLine={true} value={topic} floatingLabelText="任务标题（topic）"
              onChange={(ev, value) => {
                this.setState({ topic: value })
              }}
            />
            <div className="application-description">题干（description）</div>

            <Editor ref="description"
                    value={description} placeholder="在这里输入题干"/>

            <div className="application-addition">
              <div className="application-step">Step4、录入额外信息</div>
              <div className="application-tip">选择题目难易度</div>
              <RadioButtonGroup name="typeGroup" className="radio-group"
                                valueSelected={difficulty}
                                onChange={(ev, value) => this.setState({ difficulty: value })}>
                <RadioButton value={1} label="容易"/>
                <RadioButton value={2} label="普通"/>
                <RadioButton value={3} label="困难"/>
              </RadioButtonGroup>
            </div>
          </div>

          <RaisedButton className="submit-btn" primary={true} label="提交题目"
                        onTouchTap={()=>this.submitApplication()}/>
        </div>
        {renderOtherComponents()}
      </div>
    )
  }
}
