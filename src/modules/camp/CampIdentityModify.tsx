import * as React from 'react'
import { SelectField, MenuItem, TextField, RaisedButton, Snackbar } from 'material-ui'
import { addCertificate } from './async'

interface CampIdentityModifyState {
  identityType: any,
  memberIdListStr: any,
  showSnack: boolean
}

export default class CampIdentityModify extends React.Component<any, CampIdentityModifyState> {

  constructor() {
    super()
    this.state = {}
  }

  // 证书类型 1-优秀班长，2-优秀组长，3-优秀学员，4-优秀团队
  identityType = {
    EXCELLENT_CLASS_LEADER: 1,
    EXCELLENT_GROUP_LEADER: 2,
    EXCELLENT_STUDENT: 3,
    EXCELLENT_TEAM: 4,
    EXCELLENT_COACH: 6
  }

  handleMemberIds() {
    const {identityType, memberIdListStr} = this.state
    let memberIds = memberIdListStr.split('\n')
    memberIds = memberIds.map(memberId => memberId.trim()).filter(memberId => memberId != '')
    console.log(memberIds)
    let param = {type: identityType, memberIds: memberIds}
    addCertificate(param).then(res => {
      if(res.code === 200) {
        this.setState({showSnack: true})
        setTimeout(() => {
          this.clear()
        }, 1000)
      }
    }).catch(e => alert(e))
  }

  clear() {
    this.setState({
      identityType: 0, memberIdListStr: ''
    })
  }

  render() {
    const {
      identityType = 0, memberIdListStr = '', showSnack = false
    } = this.state

    return (
      <section style={{padding: '25px 50px'}}>
        <SelectField value={identityType} floatingLabelText="选择身份类型"
                     onChange={(e, i, v) => this.setState({identityType: v})}>
          <MenuItem value={this.identityType.EXCELLENT_CLASS_LEADER} primaryText="优秀班长"/>
          <MenuItem value={this.identityType.EXCELLENT_GROUP_LEADER} primaryText="优秀组长"/>
          <MenuItem value={this.identityType.EXCELLENT_STUDENT} primaryText="优秀学员"/>
          <MenuItem value={this.identityType.EXCELLENT_TEAM} primaryText="优秀团队"/>
          <MenuItem value={this.identityType.EXCELLENT_COACH} primaryText="优秀教练"/>
        </SelectField><br/>

        <TextField value={memberIdListStr} multiLine={true} floatingLabelText="输入学号，并且换行区分"
                   onChange={(e, v) => this.setState({memberIdListStr: v})}>
        </TextField><br/>

        <RaisedButton label="点击提交" primary={true} onClick={() => this.handleMemberIds()}/>

        <Snackbar
          open={showSnack}
          message="添加成功"
          autoHideDuration={3000}
          onRequestClose={() => {
            this.setState({showSnack: false})
          }}
        />
      </section>
    )
  }

}
