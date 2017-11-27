import * as React from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import * as _ from 'lodash'

import { SelectField, MenuItem, RadioButtonGroup, RadioButton, RaisedButton, TextField, Snackbar } from 'material-ui'
import {loadAllKnowledges, loadAllProblemsAndKnowledges, loadApplication, updateApplicationPractice } from '../async'

import './ApplicationEdit.less'
import Editor from '../../../../../components/editor/Editor'

/**
 * 废弃代码，已不用
 */
interface ApplicationEditState {
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
  showSnackBar: boolean; // 提交成功提示消息
}

/**
 * 应用题导入
 */
@connect(state => state)
export default class ApplicationEdit extends React.Component<any, ApplicationEditState> {
  constructor() {
    super()
    this.state = {
      problems: [],
      knowledges: [],
      knowledgesForSelect: [],
      showSnackBar: false,
      difficulty: -1,
    }
  }

  componentWillMount(nextProps) {

    const { location } = nextProps || this.props;


    if(location.query.applicationId){
      loadAllProblemsAndKnowledges().then(res => {
        const { code, msg } = res
        if(res.code === 200) {
          this.setState({
            problems: msg.problems,
            knowledges: msg.knowledges
          })
        }
      })

      loadAllKnowledges().then(res=>{
        const{code,msg} = res
        if(res.code==200){
          this.setState({
            knowledgesForSelect:msg
          })
        }
      })

      loadApplication(location.query.applicationId).then(res => {
        const {code,msg} = res
        if(res.code===200){
          this.setState  ({
            problemSelect:msg.problemId,
            knowledgeSelect:msg.knowledgeId,
            practiceUid:msg.practiceUid,
            sequence:msg.sequence,
            topic:msg.topic,
            description:msg.description,
            difficulty:msg.difficulty
          })
        }
      })
    }
  }

  /**
   * 应用题提交
   **/
  updateApplication() {
    const { topic, difficulty, sequence, problemId, pic, practiceUid, knowledgeSelect, problemSelect } = this.state
    let description = this.refs.description.getValue()
    const param = {
      topic: _.trim(topic),
      description,
      difficulty,
      sceneId: 1,
      updated: 2,
      sequence: _.trim(sequence),
      problemId: problemSelect,
      pic: _.trim(pic),
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
      updateApplicationPractice(this.props.location.query.applicationId,topic,description,difficulty).then(res => {
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

  disableSnackBar() {
    this.setState({
      showSnackBar: false
    })
  }

  render() {
    const {
      topic, difficulty, description,
      sequence, pic, practiceUid,
      problems, knowledges, knowledgesForSelect,
      problemSelect, knowledgeSelect, showSnackBar
    } = this.state

    const renderProblemSelect = () => {
      return (
        <SelectField
          floatingLabelText="小课内容" maxHeight={300}  disabled={true}
          value={problemSelect}
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
          floatingLabelText="知识点内容" maxHeight={400}  disabled={true}
          value={knowledgeSelect}
         >
          {
            knowledgesForSelect.map((item, idx) => {
              return (
                <MenuItem key={idx} value={item.id} primaryText={item.id + '、' + item.knowledge}/>
              )
            })
          }


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
      <div className="application-edit-input-container">
        <div className="application-edit-input-page">
          <div className="application-edit-header">应用题更新页面</div>
          <div className="application-edit-init">
            <div className="application-edit-step">Step1、所在小课及知识点</div>
            <div className="selecte-field">
              {renderProblemSelect()}
              {renderKnowledgeSelect()}
            </div>
          </div>
          <div className="application-edit-basis">
            <div className="application-edit-step">Step2、录入基本要点</div>
            <br/>

            <div className="basis-flex-box">
              <TextField
                floatingLabelText=" 练习唯一 id(practiceUid)" value={practiceUid} readOnly="readonly"
              />
              <TextField
               floatingLabelText="题目顺序" value={sequence} readOnly="readonly"
              />
            </div>
          </div>

          <div className="application-edit-main">
            <div className="application-edit-step">Step3、录入主体详情</div>
            <TextField
              className="block-item" fullWidth={true} hintText="在这里输入任务标题"
              multiLine={true} value={topic} floatingLabelText="任务标题（topic）"
              onChange={(ev, value) => {
                this.setState({ topic: value })
              }}
            />
            <div className="application-edit-description">题干（description）</div>

            <Editor ref="description"
                    value={description} placeholder="在这里输入题干"/>

            <div className="application-edit-addition">
              <div className="application-edit-step">Step4、录入额外信息</div>
              <div className="application-edit-tip">选择题目难易度</div>
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
                        onTouchTap={this.updateApplication.bind(this)}/>
        </div>
        {renderOtherComponents()}
      </div>
    )
  }
}
