import * as React from 'react'
import _ from 'lodash'
import { addNewChapter, addNewSection, loadEditableProblem, loadKnowledgeDetail, updateKnowledge } from './async'
import { SelectField, MenuItem, RaisedButton, TextField, FlatButton, Snackbar } from 'material-ui'
import Editor from '../../../components/editor/Editor'
import { decodeTextAreaString3 } from '../../textUtils'

interface KnowledgeImportState {
  // 后台返回数据
  problemId: string,
  problemName: string,
  schedules: [ {
    section: number,
    knowledgeId: number,
    chapter: number,
    series: number
  } ],
  knowledge: {},

  // SnackBar
  snackShow: boolean,
  snackMessage: string,

  // 逻辑计算数据、状态
  targetChapter: number,
  targetSection: number
  // 目标更改字段：Knowledge Step Analysis Means Keynote
  targetKnowledge: string,
  targetStep: string,
  targetAnalysis: string,
  targetMeans: string,
  targetKeynote: string
}
export default class KnowledgeImport extends React.Component<any, KnowledgeImportState> {

  constructor() {
    super()
    // 设置初始值
    this.state = {
      schedules: [],
      knowledge: {},

      snackShow: false,
      snackMessage: '',

      targetChapter: 1,
      targetSection: 1
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.loadPreData()
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return JSON.stringify(this.state) !== JSON.stringify(nextState)
  }

  loadPreData() {
    // 加载当前操作小课名称
    loadEditableProblem().then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          problemId: msg.id,
          problemName: msg.problem,
          schedules: msg.schedules
        })
      } else {
        alert(msg)
      }
    })
  }

  /**
   * 获取知识点详细信息
   */
  handleLoadKnowledgeDetail() {
    const { schedules, targetChapter, targetSection } = this.state
    let knowledgeId = null
    schedules.map((schedule) => {
      if(schedule.chapter === targetChapter && schedule.section === targetSection) {
        knowledgeId = schedule.knowledgeId
      }
    })
    console.log(knowledgeId)
    loadKnowledgeDetail(knowledgeId).then(res => {
      const { code, msg } = res
      console.log(res)
      if(code === 200) {
        this.setState({
          knowledge: msg,
          targetKnowledge: msg.knowledge,
          targetStep: msg.step,
          targetAnalysis: msg.analysis,
          targetMeans: msg.means,
          targetKeynote: msg.keynote
        })
      } else {
        alert(res.msg)
      }
    })
  }

  /**
   * 新增 chapter
   */
  handleClickAddNewChapter() {
    let maxChapter = this.calculateMaxChapter()
    addNewChapter(maxChapter + 1).then(res => {
      if(res.code === 200) {
        this.setState({ snackShow: true, snackMessage: '添加章节成功' })
        this.loadPreData()
      } else {
        alert(res.msg)
      }
    })
  }

  /**
   * 新增 section，需要提前知道在哪个 chapter 上新增
   */
  handleClickAddNewSection() {
    const { targetChapter } = this.state
    let chapterMaxSection = this.calculateChapterMaxSection()
    console.log(chapterMaxSection, targetChapter)
    addNewSection(targetChapter, chapterMaxSection + 1).then(res => {
      if(res.code === 200) {
        this.setState({ snackShow: true, snackMessage: '添加小节成功' })
        this.loadPreData()
      } else {
        alert(res.msg)
      }
    })
  }

  handleClickUpdateKnowledge() {
    const { knowledge, targetKnowledge, targetStep, targetAnalysis, targetMeans, targetKeynote } = this.state

    const param = {
      id: knowledge.id,
      knowledge: targetKnowledge,
      step: targetStep,
      analysis: this.refs.analysis.getValue(),
      means: this.refs.means.getValue(),
      keynote: this.refs.keynote.getValue()
    }

    updateKnowledge(param).then(res => {
      console.log('更新结果', res)
      if(res.code === 200) {
        alert('更新成功')
      } else {
        alert(res.msg)
      }
    })
  }

  /**
   * 计算当前最大的 Chapter
   */
  calculateMaxChapter() {
    const { schedules } = this.state
    let currentMaxChapter = 0
    schedules.map((schedule) => {
      currentMaxChapter = schedule.chapter > currentMaxChapter ? schedule.chapter : currentMaxChapter
    })
    return currentMaxChapter
  }

  /**
   * 计算当前 Chapter 下的最大 Section
   */
  calculateChapterMaxSection() {
    const { schedules, targetChapter } = this.state
    let currentChapterMaxSection = 0
    schedules.filter((schedule) => {
      if(schedule.chapter === targetChapter) {
        currentChapterMaxSection = schedule.section > currentChapterMaxSection ? schedule.section : currentChapterMaxSection
      }
    })
    return currentChapterMaxSection
  }

  closeSnackShow() {
    this.setState({ snackShow: false })
  }

  render() {
    const { problemId, problemName, schedules, knowledge, snackShow, snackMessage } = this.state

    const { targetChapter, targetSection, targetKnowledge, targetStep, targetAnalysis, targetMeans, targetKeynote } = this.state

    const renderChapterSelector = () => {
      let chapterList = []
      schedules.map((schedule) => {
        chapterList.push(schedule.chapter)
      })
      chapterList = _.uniq(chapterList)
      return (
        <div>
          <h1>章节</h1>
          <SelectField
            value={targetChapter}
            onChange={(e, idx, value) => this.setState({ targetChapter: value })}
          >
            {
              chapterList.map((chapter, idx) => {
                return (
                  <MenuItem key={idx} value={chapter} primaryText={chapter}/>
                )
              })
            }
          </SelectField>
        </div>
      )
    }

    const renderSectionSelector = () => {
      let sectionList = []
      schedules.map((schedule) => {
        if(schedule.chapter === targetChapter) {
          sectionList.push(schedule.section)
        }
      })
      return (
        <div>
          <h1>小节</h1>
          <SelectField
            value={targetSection}
            onChange={(e, idx, value) => this.setState({ targetSection: value })}
          >
            {
              sectionList.map((section, idx) => {
                return (
                  <MenuItem key={idx} value={section} primaryText={section}/>
                )
              })
            }
          </SelectField>
        </div>
      )
    }

    return (
      <div className="knowledge-import-container">
        <div style={{ padding: 50 }}>
          <h1>小课名称： {problemName}</h1>
          {renderChapterSelector()}
          <br/>
          {renderSectionSelector()}
          <br/>
          <RaisedButton
            label="新增章节" primary={true}
            onClick={() => this.handleClickAddNewChapter()}
          />&nbsp;&nbsp;
          <RaisedButton
            label="新增小节" primary={true}
            onClick={() => this.handleClickAddNewSection()}
          />&nbsp;&nbsp;
          <RaisedButton
            label="加载知识点" primary={true}
            onClick={() => this.handleLoadKnowledgeDetail()}
          /><br/><br/>
          <FlatButton label="一、知识点" fullWidth={true}/><br/>
          <TextField
            hintText="知识点"
            value={targetKnowledge}
            onChange={(e, v) => this.setState({ targetKnowledge: v })}
          /><br/>
          <FlatButton label="二、步骤" fullWidth={true}/><br/>
          <TextField
            hintText="步骤"
            value={targetStep}
            onChange={(e, v) => this.setState({ targetStep: v })}
          /><br/>
          <FlatButton label="三、作用" fullWidth={true}/><br/>
          <Editor
            id="analysis" ref="analysis"
            value={decodeTextAreaString3(targetAnalysis)}
          />
          <FlatButton label="四、方法" fullWidth={true}/><br/>
          <Editor
            id="means" ref="means"
            value={decodeTextAreaString3(targetMeans)}
          />
          <FlatButton label="五、要点" fullWidth={true}/><br/>
          <Editor
            id="keynote" ref="keynote"
            value={decodeTextAreaString3(targetKeynote)}
          /><br/>
          <RaisedButton
            label="更新数据" primary={true}
            onClick={() => this.handleClickUpdateKnowledge()}
          /><br/>
          <Snackbar
            open={snackShow}
            message={snackMessage}
            autoHideDuration={2000}
            onRequestClose={() => this.closeSnackShow()}
          />
        </div>
      </div>
    )
  }

}
