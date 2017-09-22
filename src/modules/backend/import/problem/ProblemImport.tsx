import * as React from 'react'
import {connect} from "react-redux";
import _ from 'lodash'
import { loadProblem, saveProblem } from './async'
import { SelectField, MenuItem, RaisedButton, TextField, FlatButton, Snackbar } from 'material-ui'
import Editor from '../../../../components/editor/Editor'
import { decodeTextAreaString3 } from '../../../../utils/textUtils'
import { ProblemSelector } from '../component/ProblemSelector'
import { CatalogSelector } from '../component/CatalogSelector'
import {set, startLoad, endLoad, alertMsg} from "redux/actions"

interface ProblemImportState {
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
}

@connect(state => state)
export default class ProblemImport extends React.Component<any, ProblemImportState> {

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

  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return JSON.stringify(this.state) !== JSON.stringify(nextState)
  }

  handleClickUpdateProblem(){
    const {problem, length, abbreviation} = this.state
    const {dispatch} = this.props
    const why = this.refs.why.getValue()
    const how = this.refs.how.getValue()
    const who = this.refs.who.getValue()
    const {catalogId, subCatalogId} = this.refs.catalog.getValue()
    let param = {problem, length, abbreviation, why, how, who, catalogId, subCatalogId}
    if(_.isEmpty(problem) || _.isEmpty(length) || _.isEmpty(abbreviation) ||
      _.isEmpty(why) || _.isEmpty(how) || _.isEmpty(who) || !catalogId || !subCatalogId){
      dispatch(alertMsg('请将所有信息填写完毕'))
      return
    }

    saveProblem({problem, length, abbreviation, why, how, who, catalogId, subCatalogId}).then(res => {
      if(res.code === 200){
        this.setState({snackShow: true, snackMessage: '添加小课成功'})
      } else {
        this.setState({snackShow: true, snackMessage: '添加小课失败'})
      }
    })
  }

  closeSnackShow() {
    this.setState({ snackShow: false })
  }

  render() {
    const { id, problem, length, catalogId, subCatalogId, who, why, how, abbreviation, snackShow,snackMessage } = this.state

    return (
      <div className="problem-import-container">
        <div style={{ padding: 50 }}>
          <FlatButton label="一、小课标题" /><br/>
          {/*<ProblemSelector></ProblemSelector>*/}
          <TextField
            value={problem}
            onChange={(e, v) => this.setState({ problem: v })}
          /><br/>
          <FlatButton label="二、小课长度" /><br/>
          <TextField
            value={length}
            onChange={(e, v) => this.setState({ length: v })}
          /><br/>
          <FlatButton label="三、小课缩略名称" /><br/>
          <TextField
            value={abbreviation}
            onChange={(e, v) => this.setState({ abbreviation: v })}
          /><br/>
          <FlatButton label="四、小课类别" /><br/>
          <CatalogSelector ref="catalog"></CatalogSelector><br/>
          <FlatButton label="五、课程介绍" /><br/>
          <Editor
            id="why" ref="why"
            value={decodeTextAreaString3(why)}
          />
          <FlatButton label="六、适用人群" /><br/>
          <Editor
            id="who" ref="who"
            value={decodeTextAreaString3(who)}
          />
          <FlatButton label="七、知识体系" /><br/>
          <Editor
            id="how" ref="how"
            value={decodeTextAreaString3(how)}
          /><br/>
          <RaisedButton
            label="更新数据" primary={true}
            onClick={() => this.handleClickUpdateProblem()}
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
