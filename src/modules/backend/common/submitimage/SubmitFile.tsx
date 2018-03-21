import * as React from 'react'
import { FlatButton } from 'material-ui'
import { uploadFile } from '../async'

export default class SubmitFile extends React.Component {

  constructor () {
    super()
    this.state = {
      copyValue: '',
    }
  }

  handleSubmitFile () {
    let node = document.getElementById('file')
    if (node && node.files) {
      let file = node.files[0]
      if (file) {
        if (/.*[\u4e00-\u9fa5]+.*$/.test(file.name)) {
          alert('文件名不能包含中文')
        } else {
          let formData = new FormData()
          formData.append('file', file)
          uploadFile(formData).then(res => {
            console.log(res)
            if (res.code === 200) {
              console.log(res.msg)
              this.setState({
                showAlert: true,
                copyValue: res.msg,
              })
            } else {
              alert(res.msg)
            }
          })
        }
      } else {
        alert('您还未选择文件哦！')
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
            if (document.execCommand('copy')) {
              console.log('you copy the' + this.state.copyValue)
            } else {
              alert('复制失败，请重试')
            }
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
        <FlatButton label="点击提交" onClick={() => this.handleSubmitFile()}/>
        {renderAlert()}
      </div>
    )
  }

}
