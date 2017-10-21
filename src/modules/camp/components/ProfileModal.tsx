import * as React from 'react'
import './ProfileModal.less'
import { TextField, Toggle, RaisedButton, Dialog } from 'material-ui'
import _ from 'lodash'

interface ProfileModalProps {
  open: boolean,
  profile: object,
  actions: any
}
interface ProfileModalState {
  riseClassMemberId: number,
  headImgUrl: string,
  nickname: string,
  riseId: string,
  className: string,
  groupId: string,
  memberId: string,
  active: number,
  tips: string
}
export class ProfileModal extends React.Component<ProfileModalProps, ProfileModalState> {

  constructor() {
    super()
    this.state = {
      riseClassMemberId: -1,
      headImgUrl: '',
      nickname: '',
      riseId: '',
      className: '',
      groupId: '',
      memberId: '',
      active: -1,
      tips: ''
    }
    this.getInnerState = this.getInnerState.bind(this)
  }

  getInnerState() {
    return this.state
  }

  componentWillMount() {
    this.setPropsToState(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.setPropsToState(nextProps)
    }
  }

  setPropsToState(props) {
    const { profile } = props
    this.setState({
      riseClassMemberId: profile.riseClassMemberId,
      headImgUrl: profile.headImgUrl,
      nickname: profile.nickName,
      riseId: profile.riseId,
      className: profile.className,
      groupId: profile.groupId,
      memberId: profile.memberId,
      active: !profile.active ? 0 : 1
    })
  }

  render() {
    const { open, actions } = this.props
    if(!open) return null
    const { headImgUrl, nickname, riseId, className, groupId, memberId, active, tips } = this.state

    return (
      <div>
        <div className="profile-modal" style={{ maxHeight: window.innerHeight }}>
          <div className="main-info">
            <span className="header">主要信息</span>
            <div className="headimage">
              <img src={headImgUrl}/>
            </div>
            <div className="nickname">
              <span>昵称</span>
              <ModalTextField value={nickname}/>
            </div>
            <div className="riseid">
              <span>RiseId</span>
              <ModalTextField value={riseId}/>
            </div>
          </div>
          <div className="camp-info">
            <span className="header">训练营信息</span>
            <div className="classname">
              <span>班级</span>
              <ModalTextField value={className} onChange={(e, v) => this.setState({ className: v })}/>
            </div>
            <div className="group">
              <span>小组</span>
              <ModalTextField
                onChange={(e, v) => this.setState({ groupId: _.trim(v) })}
                value={groupId}/>
            </div>
            <div className="memberid">
              <span>学号</span>
              <ModalTextField
                hintText="自动生成，勿填"
                value={memberId}/>
            </div>
            <div className="active">
              <span>学习中</span>
              <Toggle
                toggled={active === 1 } style={{ top: 20 }}
                onToggle={(e, v) => this.setState({ active: v ? 1 : 0 })}/>
            </div>
          </div>
          <div className="operate-note">
            <span className="header">操作备注</span>
            <ModalTextField
              onChange={(e, v) => this.setState({ tips: _.trim(v) })}
              value={tips}/>
          </div>
          {
            actions.map((action, index) => (
              <RaisedButton
                key={index} label={action.label}
                onClick={action.onClick} style={{ marginRight: 40 }}/>
            ))
          }
        </div>
        <div className="mask" style={{ height: window.innerHeight, width: window.innerWidth }}/>
      </div>
    )
  }
}

interface ModalTextFieldProps {
  onChange?: any,
  value: any,
  hintText?: string
}
class ModalTextField extends React.Component<ModalTextFieldProps, any> {
  render() {
    const { onChange, value, hintText } = this.props
    return (
      <TextField
        hintText={hintText}
        onChange={onChange}
        value={value}
        fullWidth={true}
        id={(Math.random() * 100).toString()}/>
    )
  }
}
