import * as React from 'react'
import { FlatButton, MenuItem, RaisedButton, SelectField, Snackbar } from 'material-ui'
import { ProblemSelector } from '../component/ProblemSelector'
import { loadProblem } from '../problem/async'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import { connect } from 'react-redux'
import Editor from '../../../../components/editor/Editor'
import { loadDescription, updatePreview } from './async'
import _ from 'lodash'

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：forum-static
 2. 文件功能：课前思考内容导入
 3. 作者： yangren@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

@connect(state => state)
export default class PreviewImport extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      select: false,
      targetChapter: '',
      targetSection: '',
      snackShow: false,
      snackMessage: ''
    }
  }

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  选择课程
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  onSelect(id) {
    const { dispatch } = this.props
    // 加载当前操作小课名称
    loadProblem(id).then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          problemId: msg.id,
          problemName: msg.problem
        })
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(e => {
      dispatch(alertMsg(e))
    })
  }

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    修改章节
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  onChangeChapter(value) {
    const { problemId, targetSection } = this.state
    const { dispatch } = this.props

    this.setState({ targetChapter: value })

    if(problemId > 0 && targetSection > 0) {
      loadDescription(problemId, value, targetSection).then(res => {
        if(res.code === 200) {
          this.setState({
            targetChapter: value,
            targetDescription: res.msg
          })
        } else {
          this.setState({ targetChapter: value })
          dispatch(alertMsg(res.msg))
        }

      })
    } else {
      this.setState({ targetChapter: value })
    }

  }

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  修改小节
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  onChangeSection(value) {
    const { problemId, targetChapter } = this.state
    const { dispatch } = this.props
    if(problemId > 0 && targetChapter > 0) {
      loadDescription(problemId, targetChapter, value).then(res => {
        if(res.code === 200) {
          this.setState({
            targetSection: value,
            targetDescription: res.msg
          })
        } else {
          this.setState({ targetSection: value })
          dispatch(alertMsg(res.msg))
        }
      })
    } else {
      this.setState({ targetSection: value })
    }
  }

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  关闭提示
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  closeSnackShow() {
    this.setState({ snackShow: false })
  }

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  提交内容
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  handleClickUpdatePreview() {
    const { dispatch } = this.props
    const { problemId, targetChapter, targetSection } = this.state
    const description = this.refs.description.getValue()

    if(problemId == 0 || targetChapter == 0 || targetSection == 0 || _.isEmpty(description)) {
      dispatch(alertMsg('请将课程、章节和内容填写完整'))
      return
    }

    let param = { chapter: targetChapter, section: targetSection, description }

    //添加或者更新
    updatePreview(problemId, param).then(res => {
      if(res.code === 200) {
        this.setState({ snackShow: true, snackMessage: '添加课前思考成功' })
      } else {
        dispatch(alertMsg(res.msg))
      }
    })
  }

  render() {
    const { targetChapter, targetSection, snackShow, snackMessage, targetDescription } = this.state

    const renderAddName = () => {
      return (
        <div>
          {renderChapterSelector()}
          {renderSectionSelector()}
        </div>
      )
    }

    const renderChapterSelector = () => {
      let chapterList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      return (
        <div>
          <FlatButton label="章节"/><br/>
          <SelectField
            value={targetChapter}
            onChange={(e, idx, value) => this.onChangeChapter(value)}
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
      let sectionList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      return (
        <div>
          <FlatButton label="小节"/><br/>
          <SelectField
            value={targetSection}
            onChange={(e, idx, value) => this.onChangeSection(value)}
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
      <div className="preview-import-container">
        <div style={{ padding: 50 }}>
          <FlatButton label="课程"/><br/>
          <ProblemSelector select={(id) => this.onSelect(id)}></ProblemSelector>
          <br/>
          <FlatButton label="一、课前思考"/><br/>
          {renderAddName()}
          <br/>
          <FlatButton label="课前思考内容"/><br/>
          <div style={{ marginBottom: '30px' }}>
            <Editor
              id="description" ref="description" value={targetDescription}/>
          </div>

          <RaisedButton
            label="更新数据" primary={true}
            onClick={() => this.handleClickUpdatePreview()}
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
