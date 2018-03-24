import * as React from 'react'
import './SubmitRichText.less'
import _ from 'lodash'
import Editor from '../../../../components/editor/Editor'
import AlertMessage from '../../../../components/AlertMessage'
import { TextField, FlatButton } from 'material-ui'
import { insertRichText } from '../async'

export default class SubmitRichText extends React.Component {

  constructor () {
    super()
    this.state = {
      title: '',
      copyValue: '',
    }
  }

  submitValue () {
    insertRichText(this.state.title, this.refs.editorValue.getValue()).then(res => {
      if (res.code === 200) {
        this.setState({
          showAlert: true,
          copyValue: res.msg,
        })
      }
    })
  }

  render () {
    const {
      showAlert = false,
      editorValue = '',
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
      <div className="submit-richtext-container">
        <TextField hintText="请输入文章标题" onChange={(ev, value) => this.setState({ title: value, })}/>
        <br/>
        <Editor ref="editorValue" value={editorValue}/>
        <br/>
        <FlatButton label='提交' onClick={() => this.submitValue()}/>
        {renderAlert()}
      </div>
    )
  }

}
