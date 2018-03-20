import * as React from 'react'
import { connect } from 'react-redux'
import { FlatButton, MenuItem, RaisedButton, SelectField, TextField } from 'material-ui'
import { alertMsg, startLoad, endLoad } from '../../../redux/actions'
import { loadTemplates, sendTemplateMsg } from './async'
import './SendTemplate.less'
import * as _ from 'lodash'

const forcePushs = [
  { id: 0, value: '是' },
  { id: 1, value: '否' }
]

@connect(state => state)
export default class SendTemplate extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      templates: [],
      template: '',
      comment: '',
      first: '',
      remark: '',
      url: '',
      keyword1: '',
      keyword2: '',
      keyword3: '',
      openIds: '',
      forcePush: '',
      source: '',
      showImg: false
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadTemplates().then(res => {
      dispatch(endLoad())
      if(res.code === 200) {

        let temp = []
        for(let i = 0; i < res.msg.length; i++) {
          temp.push({
            value: res.msg[i].remark,
            key: i
          })
        }
        this.setState({ templates: temp })

      } else {
        dispatch(alertMsg(res.msg))
      }
    })

  }

  sendTemplateToMime = () => {
    const { dispatch } = this.props
    const { template, comment, first, remark, url, keyword1, keyword2, keyword3, openIds, forcePush, source } = this.state
    console.log(template)
    if(_.isEmpty(template) || _.isEmpty(comment) || _.isEmpty(first) || _.isEmpty(remark)
      || _.isEmpty(keyword1) || _.isEmpty(keyword2) || _.isEmpty(keyword3) || _.isEmpty(forcePush) || _.isEmpty(source)) {
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
      templateId: template.key + 1,
      comment,
      first,
      remark,
      url,
      keyword1,
      keyword2,
      keyword3,
      openIds,
      forcePush: push,
      source,
      isMime: true
    }
    dispatch(startLoad())
    sendTemplateMsg(param).then(res => {
      dispatch(endLoad())
      dispatch(alertMsg(res.msg))
    })

  }

  sendTemplate = () => {
    const { dispatch } = this.props
    const { template, comment, first, remark, url, keyword1, keyword2, keyword3, openIds, forcePush, source } = this.state

    if(_.isEmpty(template) || _.isEmpty(comment) || _.isEmpty(first) || _.isEmpty(remark)
      || _.isEmpty(keyword1) || _.isEmpty(keyword2) || _.isEmpty(keyword3) || _.isEmpty(openIds) || _.isEmpty(forcePush) || _.isEmpty(source)) {
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
      templateId: template.key + 1,
      comment,
      first,
      remark,
      url,
      keyword1,
      keyword2,
      keyword3,
      openIds,
      source,
      forcePush: push,
      isMime: false
    }
    dispatch(startLoad())
    sendTemplateMsg(param).then(res => {
      dispatch(endLoad())
      dispatch(alertMsg(res.msg))
    })
  }

  render() {
    const { templates, template, comment, first, remark, url, keyword1, keyword2, keyword3, openIds, forcePush, source, showImg } = this.state

    const renderSelectTemplate = () => {
      return (
        <div>
          <SelectField
            floatingLabelText='请选择模板消息类型'
            value={template}
            onChange={(event, index, value) => this.setState({ template: value })}
          >
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

    const renderComment = () => {
      return (
        <div>
          <div>
            <TextField hintText='请输入备注信息' value={comment} onChange={(e, v) => this.setState({
              comment: v
            })}/>
          </div>
          <div>
            <TextField hintText='请输入来源(英文，格式xx_xx)' value={source} onChange={(e, v) => this.setState({
              source: v
            })}/>
          </div>
        </div>
      )
    }

    const renderSendInfo = () => {
      return (
        <div>
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
          <div>
            <TextField hintText='请输入跳转url（选填）' fullWidth={200} value={url}
                       onChange={(e, v) => this.setState({ url: v })}/>
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
            label="发送给自己" primary={true}
            onClick={() => {
              this.sendTemplateToMime()
            }}/>
          <RaisedButton
            style={{ marginLeft: 30 }}
            label="发送模板消息" primary={true}
            onClick={() => {
              this.sendTemplate()
            }}/>
        </div>
      )
    }

    const renderRemark = () => {
      return (
        <div className={`audio-words-container ${showImg ? 'show-all' : 'hide'}`}>
          <img src="https://static.iqycamp.com/images/template.png" style={{ width: 200 }}/>
          <div className={`words-text-mask`}>
            <div className={`words-mask-tips`} onClick={() => this.setState({ showImg: !showImg })}>
            <span className={`${showImg ? 'hide' : 'show'}`}>
              {showImg ? '收起' : '查看案例图片'}
            </span>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="template-container">
        <div className="title-container">配置内容填写</div>
        {renderSelectTemplate()}
        {renderForcePushSelect()}
        {renderComment()}
        <div className="title-container">模板消息内容填写</div>
        {renderRemark()}
        {renderSendInfo()}
        {renderSendBtn()}
      </div>
    )
  }

}
