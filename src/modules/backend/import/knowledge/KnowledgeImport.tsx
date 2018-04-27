import * as React from 'react'
import { connect } from "react-redux"
import { loadKnowledgeDetail, updateKnowledge } from './async'
import _ from 'lodash'
import { loadProblem } from '../problem/async'
import { SelectField, MenuItem, RaisedButton, TextField, FlatButton, Snackbar } from 'material-ui'
import Editor from '../../../../components/editor/Editor'
import { ProblemSelector } from '../component/ProblemSelector'
import { KnowledgeSelector } from '../component/KnowledgeSelector'
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { AudioModal } from '../component/AudioModal'

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
  knowledgeAudio:boolean,
  analysisAudio:boolean,
  meansAudio:boolean,
  keynoteAudio:boolean,
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
  targetDescription:string,
  targetKeynote: string
}

@connect(state => state)
export default class KnowledgeImport extends React.Component<any, KnowledgeImportState> {

  constructor() {
    super()
    // 设置初始值
    this.state = {
      schedules: [],
      knowledge: {},
      select: false,
      add: false,
      snackShow: false,
      snackMessage: '',

      targetChapter: 1,
      targetSection: 1,
      knowledgeAudio:false,
      analysisAudio:false,
      meansAudio:false,
      keynoteAudio:false,
      audioId:0,
      analysisAudioId: 0,
      keynoteAudioId: 0,
      meansAudioId: 0,
    }
  }

  componentWillMount() {
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return JSON.stringify(this.state) !== JSON.stringify(nextState)
  }

  onSelect(id) {
    const { dispatch } = this.props
    // 加载当前操作小课名称
    loadProblem(id).then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          problemId: msg.id,
          problemName: msg.problem,
          schedules: msg.schedules
        })
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(e=>{
      dispatch(alertMsg(e))
    })
  }

  /**
   * 获取知识点详细信息
   */
  handleLoadKnowledgeDetail(knowledgeId) {
    const { dispatch } = this.props

    loadKnowledgeDetail(knowledgeId).then(res => {
      const { code, msg } = res
      if(code === 200) {
        if(msg.audioId===null){
          msg.audioId= 0
        }
        if(msg.analysisAudioId===null){
          msg.analysisAudioId= 0
        }
        if(msg.analysisAudioId===null){
          msg.analysisAudioId= 0
        }
        if(msg.meansAudioId===null){
          msg.meansAudioId= 0
        }
        if(msg.keynoteAudioId===null){
          msg.keynoteAudioId= 0
        }
        this.setState({
          // snackBar
          snackShow: true,
          snackMessage: "加载数据成功",

          knowledge: msg,
          targetChapter: msg.chapter,
          targetSection: msg.section,
          targetKnowledge: msg.knowledge,
          targetStep: msg.step,
          targetAnalysis: msg.analysis,
          targetMeans: msg.means,
          targetKeynote: msg.keynote,
          audioId: msg.audioId,
          analysisAudioId:msg.analysisAudioId,
          meansAudioId:msg.meansAudioId,
          keynoteAudioId:msg.keynoteAudioId,
          targetDescription:msg.description
        })
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(e=>{
      dispatch(alertMsg(e))
    })
  }

  handleClickUpdateKnowledge() {
    const { problemId, knowledge, targetKnowledge, targetStep,
    analysisAudioId, keynoteAudioId, meansAudioId, audioId, targetChapter, targetSection} = this.state
    const { dispatch } = this.props

    const analysis = this.refs.analysis.getValue()
    const means = this.refs.means.getValue()
    const keynote = this.refs.keynote.getValue()
    const description = this.refs.description.getValue()
    let id = 0
    if(knowledge.id){
      id = knowledge.id
    }

    let param = { analysis, means, keynote, knowledge: targetKnowledge, step: targetStep, chapter:targetChapter,
      section:targetSection, id, analysisAudioId, keynoteAudioId, meansAudioId, audioId,description}
    if(_.isEmpty(targetKnowledge) || _.isEmpty(targetStep)) {
      dispatch(alertMsg('请将所有信息填写完毕'))
      return
    }

    updateKnowledge(problemId, param).then(res => {
      if(res.code === 200) {
        this.setState({ snackShow: true, snackMessage: '添加知识点成功', add:false, select:true })
      }else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(e=>{
      dispatch(alertMsg(e))
    })
  }

  closeSnackShow() {
    this.setState({ snackShow: false })
  }

  render() {
    const { problemId,snackShow, snackMessage, select, add, knowledgeAudio, analysisAudio, meansAudio, keynoteAudio,
      targetChapter, targetSection, targetKnowledge, targetStep, targetAnalysis, targetMeans, targetKeynote,targetDescription,
      audioId, analysisAudioId, keynoteAudioId, meansAudioId } = this.state

    const renderSelect = () => {
      return (
        <div>
          <RaisedButton
            label="添加知识点" primary={true}
            style={{marginRight:50}}
            onClick={() => this.setState({add:true, select:true})}
          />
          <RaisedButton
            label="更新知识点" primary={true}
            onClick={() => this.setState({add:false, select:true})}
          />
        </div>
      )
    }

    const renderAudio = (prefix, audioId, upload, close)=>{
      return (
        <AudioModal ref="problemAudio" prefix={prefix} upload={(id)=>upload(id)} audioId={audioId}
                    close={()=>close()}></AudioModal>
      )
    }

    const renderAddName = () => {
      if(add) {
        return (
            <TextField
              value={targetKnowledge}
              onChange={(e, v) => this.setState({ targetKnowledge: v })}
            />
        )
      } else {
        return (
          <KnowledgeSelector problemId={problemId} select={(id)=>this.handleLoadKnowledgeDetail(id)}></KnowledgeSelector>
        )
      }
    }

    const renderChapterSelector = () => {
      let chapterList = [1,2,3,4,5,6,7,8,9]
      return (
        <div>
          <FlatButton label="章节" /><br/>
          <SelectField
            value={targetChapter}
            disabled={!add}
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
      let sectionList = [1,2,3,4,5,6,7,8,9]
      return (
        <div>
          <FlatButton label="小节" /><br/>
          <SelectField
            value={targetSection}
            disabled={!add}
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
          <FlatButton label="小课" /><br/>
          <ProblemSelector select={(id)=>this.onSelect(id)}></ProblemSelector>
          <br/>
          <FlatButton label="一、知识点" /><br/>
          {
            select ? renderAddName() : renderSelect()
          }
          <br/>
          {renderChapterSelector()}
          <br/>
          {renderSectionSelector()}
          <br/>
          <FlatButton label="知识点语音"/><br/>
          {knowledgeAudio? renderAudio('rise_kn', audioId, (id)=>this.setState({audioId:id}),
              ()=>this.setState({knowledgeAudio:false})) :
            <RaisedButton
              label="上传语音" primary={true}
              onClick={() => this.setState({knowledgeAudio:true})}
            />}
          <br/>
          <FlatButton label="二、步骤" /><br/>
          <TextField
            hintText="步骤"
            value={targetStep}
            onChange={(e, v) => this.setState({ targetStep: v })}
          /><br/>
          <FlatButton label="三、知识点正文(商业思维课程)"/><br/>
          <Editor
          id="description" ref="description" value={targetDescription}/>
          <FlatButton label="四、作用" /><br/>
          <Editor
            id="analysis" ref="analysis"
            value={targetAnalysis}
          />
          <FlatButton label="作用语音"/><br/>
          {analysisAudio? renderAudio('rise_a', analysisAudioId, (id)=>this.setState({analysisAudioId:id}),
              ()=>this.setState({analysisAudio:false})) :
            <RaisedButton
              label="上传语音" primary={true}
              onClick={() => this.setState({analysisAudio:true})}
            />}
          <br/>
          <FlatButton label="五、方法" /><br/>
          <Editor
            id="means" ref="means"
            value={targetMeans}
          />
          <FlatButton label="方法语音"/><br/>
          {meansAudio? renderAudio('rise_m', meansAudioId, (id)=>this.setState({meansAudioId:id}),
              ()=>this.setState({meansAudio:false})) :
            <RaisedButton
              label="上传语音" primary={true}
              onClick={() => this.setState({meansAudio:true})}
            />}
          <br/>
          <FlatButton label="六、要点" /><br/>
          <Editor
            id="keynote" ref="keynote"
            value={targetKeynote}
          /><br/>
          <FlatButton label="要点语音"/><br/>
          {keynoteAudio? renderAudio('rise_k', keynoteAudioId, (id)=>this.setState({keynoteAudioId:id}),
              ()=>this.setState({keynoteAudio:false})) :
            <RaisedButton
              label="上传语音" primary={true}
              onClick={() => this.setState({keynoteAudio:true})}
            />}
          <br/><br/><br/>
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
