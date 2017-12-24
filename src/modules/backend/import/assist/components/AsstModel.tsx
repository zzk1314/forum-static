import * as React from 'react'
import './AsstModel.less'
import { TextField, Toggle, RaisedButton, FlatButton, SelectField, MenuItem } from 'material-ui'
import _ from 'lodash'

interface ProfileModalProps {
  open: boolean,
  profile: object,
  actions: any
}

interface ProfileModalState {
  riseClassMemberId: number,
  assist:number,
  headImgUrl: string,
  nickname: string,
  riseId: string,
  className: string,
  groupId: string,
  memberId: string,
  active: number,
  tips: string
}

export class AsstModel extends React.Component<ProfileModalProps, ProfileModalState> {

  constructor() {
    super()
    this.state = {
      assist:-1,
      headImgUrl: '',
      nickname: '',
      riseId: '',
      assistCatalog: ''
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
    const { asst, assistCatalogs } = props
    this.setState({
      assist:asst.id,
      headImgUrl: asst.headImageUrl,
      nickname: asst.nickName,
      riseId: asst.riseId,
      assistCatalog:asst.roleId
    })
  }

  render() {
    const { open, actions, assistCatalogs } = this.props
    if(!open) return null
    const { headImgUrl, nickname, riseId, assistCatalog } = this.state

    return (
      <div>
        <div className="asst-model" style={{ maxHeight: window.innerHeight }}>
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
          <div>
            <SelectField
              value={assistCatalog}
              floatingLabelText="选择教练类别"
              onChange={(e, idx, value) => {
                this.setState({
                  assistCatalog: value
                })
              }}
            >
              {
                assistCatalogs.map((item, idx) => {
                  return (
                    <MenuItem key={idx} value={item.catalogId} primaryText={item.catalogId + '、' + item.catalogName}/>
                  )
                })
              }
            </SelectField>
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
