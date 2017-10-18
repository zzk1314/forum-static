import * as React from 'react'
import { RaisedButton, TextField, Snackbar } from 'material-ui'
import { startLoad, endLoad, alertMsg } from '../../../../redux/actions'
import Editor from '../../../../components/editor/Editor'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import { uploadAudioFile, updateAudioDB, loadAudio } from "./async"

interface AudioModalProps {
  prefix: string,
  close: object,
}
interface AudioModalState {
}
@connect(state => state)
export class AudioModal extends React.Component<AudioModalProps, AudioModalState> {

  constructor() {
    super()
    this.state = {
      showSnackBar: false,
      snackMessage: '',
      data: {},
      loading: false,
    }
  }

  componentWillMount() {
    const { audioId } = this.props
    if(audioId) {
      loadAudio(audioId).then(res => {
        if(res.code === 200) {
          this.setState({ data: res.msg, name:res.msg.name })
        }
      })
    }
  }

  getValue() {
    return this.state
  }

  handleSubmit() {
    const { dispatch } = this.props
    const { name } = this.state

    const { prefix = 'iquanwai', close, audioId, upload } = this.props

    let words = this.refs.editor.getValue()

    let node = document.getElementById('file').files
    if(node.length === 0) {
      this.setState({ showSnackBar: true, snackMessage: '请上传音频' })
      return
    }
    let formData = new FormData()
    formData.append('file', node[ 0 ])

    this.setState({loading:true})
    uploadAudioFile(formData, prefix).then(res => {
      if(res.code === 200) {
        updateAudioDB(name, res.msg, words).then(res2 => {
          this.setState({loading:false})
          if(res2.code === 200) {
            if(upload){
              upload(res2.msg)
            }
            if(close) {
              close()
            }
            this.setState({ showSnackBar: true })
          } else {
            this.setState({ showSnackBar: true, snackMessage: res2.msg })
          }
        }).catch(e => this.setState({ showSnackBar: true, snackMessage: e }))
      } else {
        this.setState({ showSnackBar: true, snackMessage: res.msg })
      }
    }).catch(e => this.setState({ showSnackBar: true, snackMessage: e }))
  }

  handleRequestClose() {
    this.setState({ showSnackBar: false })
  }

  render() {
    const { name, data, showSnackBar = false, snackMessage, loading } = this.state
    const { words } = data

    const renderOtherComponents = () => {
      return (
        <Snackbar
          open={showSnackBar}
          message={snackMessage}
          autoHideDuration={3000}
          onRequestClose={() => this.handleRequestClose()}/>
      )
    }

    return (
      <Dialog open={true}
              title="上传语音"
              style={{top:-50}}
              autoScrollBodyContent={true}
              modal={false}>
        <div className="audio-component">
          <div className="audio-name">
            <TextField
              hintText="输入音频名称"
              value={name} fullWidth={true}
              onChange={(e, v) => this.setState({ name: v })}/>
          </div>
          <div>
            <Editor
              ref="editor"
              value={words}
              placeholder="输入文字版"/>
          </div>
          <RaisedButton fullWidth={true} style={{ marginTop: 10 }}>
            <input type="file" id="file" label=""/>
          </RaisedButton>
          { loading ?
          <RaisedButton
              primary={true} disabled={true}
              label="提交中" style={{ marginTop: 20, marginRight: 50 }} /> :
          <RaisedButton
            primary={true}
            label="提交" style={{ marginTop: 20, marginRight: 50 }}
            onClick={() => this.handleSubmit()}/> }
          <RaisedButton
            primary={false}
            label="取消" style={{ marginTop: 20 }}
            onClick={() => this.props.close()}/>
        </div>
        {renderOtherComponents()}
      </Dialog>
    )
  }
}

