import * as React from 'react'
import './ProfileModal.less'
import { TextField, Toggle, RaisedButton } from 'material-ui'

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
      active: profile.active
    })
  }

  render() {
    const { open, actions } = this.props
    if(!open) return null
    const { headImgUrl, nickname, riseId, className, groupId, memberId, active, tips } = this.state

    return (
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
            <ModalTextField value={className}/>
          </div>
          <div className="group">
            <span>小组</span>
            <ModalTextField
              onChange={(e, v) => this.setState({ groupId: v })}
              value={groupId}/>
          </div>
          <div className="memberid">
            <span>学号</span>
            <ModalTextField value={memberId}/>
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
            onChange={(e, v) => this.setState({ tips: v })}
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
    )
  }
}

interface ModalTextFieldProps {
  onChange?: any,
  value: any
}
class ModalTextField extends React.Component<ModalTextFieldProps, any> {
  render() {
    const { onChange, value } = this.props
    return (
      <TextField
        onChange={onChange}
        value={value}
        fullWidth={true}
        id={(Math.random() * 100).toString()}/>
    )
  }
}
