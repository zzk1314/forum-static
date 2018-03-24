import * as React from 'react'
import './SubmitFile.less'
import { FlatButton } from 'material-ui'
import { uploadFile } from '../async'
import AlertMessage from '../../../../components/AlertMessage'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import { connect } from 'react-redux'

@connect(state => state)
export default class SubmitFile extends React.Component {

  constructor () {
    super()
    this.state = {
      copyValue: '',
    }
  }

  handleSubmitFile () {
    let node = document.getElementById('file')
    const { dispatch } = this.props
    if (node && node.files) {
      let file = node.files[0]
      if (file) {
        if (/.*[\u4e00-\u9fa5]+.*$/.test(file.name)) {
          dispatch(alertMsg('文件名不能包含中文'))
        } else {
          let formData = new FormData()
          formData.append('file', file)
          uploadFile(formData).then(res => {
            if (res.code === 200) {
              this.setState({
                showAlert: true,
                copyValue: res.msg,
              })
            } else {
              dispatch(alertMsg(alert(res.msg)))
            }
          })
        }
      } else {
        dispatch(alertMsg('您还未选择文件哦！'))
      }
    }
  }

  render () {
    const {
      showAlert = false,
    } = this.state

    const renderAlert = () => {
      const actions = [
        {
          label: '确认',
          onClick: () => {
            const input = document.createElement('input')
            document.body.appendChild(input)
            input.setAttribute('value', this.state.copyValue)
            input.select()
            document.execCommand('copy')
            document.body.removeChild(input)
            this.setState({ showAlert: false })
          },
        },
      ]
      return <AlertMessage actions={actions} open={showAlert} content={this.state.copyValue}/>
    }

    return (
      <div className="submit-file-container">
        <input type="file" id='file'/>
        <br/>
        <FlatButton label="点击提交" onClick={() => this.handleSubmitFile()}/>
        {renderAlert()}
      </div>
    )
  }

}
