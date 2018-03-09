import * as React from 'react'
import { connect } from 'react-redux'
import {MenuItem, RaisedButton, SelectField, TextField } from 'material-ui'
import { alertMsg, startLoad, endLoad } from '../../../redux/actions'
import { sendTemplateMsg } from './async'
import './SendTemplate.less'
import * as _ from 'lodash'

const templates = [
  { id: 0, value: '代办事项提醒' }
]

const forcePushs = [
  { id: 0, value: '是' },
  { id: 1, value: '否' }
]

@connect(state => state)
export default class SendTemplate extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      templateId: '',
      comment: '',
      first: '',
      remark: '',
      url: '',
      keyword1: '',
      keyword2: '',
      keyword3: '',
      openIds: '',
      forcePush: ''
    }
  }

  sendTemplate = () => {
    const { dispatch } = this.props
    const { templateId, comment, first, remark, url, keyword1, keyword2, keyword3, openIds,forcePush } = this.state

    if(_.isEmpty(templateId) || _.isEmpty(comment) || _.isEmpty(first) || _.isEmpty(remark) || _.isEmpty(url)
      || _.isEmpty(keyword1) || _.isEmpty(keyword2) || _.isEmpty(keyword3) || _.isEmpty(openIds)  || _.isEmpty(forcePush)) {
      dispatch(alertMsg('请将信息填写完成'))
      return
    }
    let push
    if(forcePush.id === 0) {
      push = true
    } else {
      push = false
    }

    let param = {
      templateId: templateId.id,
      comment,
      first,
      remark,
      url,
      keyword1,
      keyword2,
      keyword3,
      openIds,
      forcePush: push
    }
    dispatch(startLoad())
    sendTemplateMsg(param).then(res => {
      dispatch(endLoad())
      dispatch(alertMsg(res.msg))
    })
  }

  render() {
    const { templateId, comment, first, remark, url, keyword1, keyword2, keyword3, openIds, forcePush } = this.state
    const renderSelectTemplate = () => {

      return (
        <div>
          <SelectField
            floatingLabelText='请选择模板消息类型'
            value={templateId}
            onChange={(event, index, value) => this.setState({ templateId: value })}
            maxHeight={400}>
            {
              templates.map((item, idx) => {
                return (
                  <MenuItem key={idx} value={item} primaryText={item.value}/>
                )
              })
            }
          </SelectField>
        </div>
      )
    }

    const renderForcePushSelect = () => {
      return (
        <div>
          <SelectField
            floatingLabelText='请选择是否强制推送'
            value={forcePush}
            onChange={(event, index, value) => this.setState({ forcePush: value })}
            maxHeight={400}>
            {
              forcePushs.map((item, idx) => {
                return (
                  <MenuItem key={idx} value={item} primaryText={item.value}/>
                )
              })
            }
          </SelectField>
        </div>
      )
    }

    const renderSendInfo = () => {
      return (
        <div>
          <div>
            <TextField hintText='请输入备注信息' value={comment} onChange={(e, v) => this.setState({
              comment: v
            })}/>
          </div>
          <div>
            <textarea placeholder='请输入内容' className='comment-container' value={first}
                      onChange={(e, v) => this.setState({ first: e.target.value })}></textarea>
          </div>
          <div>
            <TextField hintText='请输入keyword1' fullWidth={200} value={keyword1} onChange={(e, v) => this.setState({
              keyword1: v
            })}/>
          </div>
          <div>
            <TextField hintText='请输入keyword2' fullWidth={200} value={keyword2}
                       onChange={(e, v) => this.setState({ keyword2: v })}/>
          </div>
          <TextField hintText='请输入keyword3' fullWidth={200} value={keyword3}
                     onChange={(e, v) => this.setState({ keyword3: v })}/>
          <div>
            <textarea placeholder="请输入remark" className='comment-container' value={remark}
                      onChange={(e, v) => this.setState({ remark: e.target.value })}/>
          </div>
          {/*<div>*/}
            {/*<FlatButton label="remarkColor"/>*/}
            {/*<TextField hintText='请输入remarkColor' value={remarkColor}*/}
                       {/*onChange={(e, v) => this.setState({ remarkColor: v })}/>*/}
          {/*</div>*/}

          <div>
            <TextField hintText='请输入url' fullWidth={200} value={url} onChange={(e, v) => this.setState({ url: v })}/>
          </div>
          <div>
            <textarea placeholder='请输入发送人员的openid（用换行符隔开）' className='comment-container' value={openIds}
                      onChange={(e, v) => this.setState({ openIds: e.target.value })}/>
          </div>
        </div>
      )
    }

    const renderSendBtn = () => {
      return (
        <div>
          <RaisedButton
            style={{ marginLeft: 30 }}
            label="发送模板消息" primary={true}
            onClick={() => {
              this.sendTemplate()
            }}/>
        </div>
      )
    }

    return (
      <div className="template-container">
        {renderSelectTemplate()}
        {renderForcePushSelect()}
        {renderSendInfo()}
        {renderSendBtn()}
      </div>
    )
  }

}
