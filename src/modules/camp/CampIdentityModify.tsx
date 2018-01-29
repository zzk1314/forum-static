import * as React from 'react'
import { Dialog, SelectField, MenuItem, TextField, RaisedButton, Snackbar } from 'material-ui'
import { addCertificate } from './async'

interface CampIdentityModifyState {
  year: number,
  month: number,
  identityType: any,
  memberIdListStr: any,
  showDialog: boolean,
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
    const {year, month, identityType, memberIdListStr} = this.state
    let memberIds = memberIdListStr.split('\n')
    memberIds = memberIds.map(memberId => memberId.trim()).filter(memberId => memberId != '')
    console.log(memberIds)
    let param = {year: year, month: month, type: identityType, memberIds: memberIds}
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
      year: '', month: '', identityType: 0, memberIdListStr: '', showDialog: false
    })
  }

  render() {
    const {
      year, month, identityType = 0, memberIdListStr = '', showDialog = false, showSnack = false
    } = this.state

    return (
      <section style={{padding: '25px 50px'}}>

        <TextField value={year} floatingLabelText="证书生成年份"
                   onChange={(e, v) => this.setState({year: v})}>
        </TextField><br/>

        <TextField value={month} floatingLabelText="证书生成月份"
                   onChange={(e, v) => this.setState({month: v})}>
        </TextField><br/>

        <SelectField value={identityType} floatingLabelText="选择身份类型"
                     onChange={(e, i, v) => this.setState({identityType: v})}>
          <MenuItem value={this.identityType.EXCELLENT_CLASS_LEADER} primaryText="优秀班长"/>
          <MenuItem value={this.identityType.EXCELLENT_GROUP_LEADER} primaryText="优秀组长"/>
          <MenuItem value={this.identityType.EXCELLENT_STUDENT} primaryText="优秀学员"/>
          <MenuItem value={this.identityType.EXCELLENT_TEAM} primaryText="优秀团队"/>
          <MenuItem value={this.identityType.EXCELLENT_COACH} primaryText="优秀教练"/>
        </SelectField><br/>

        <TextField value={memberIdListStr} multiLine={true} floatingLabelText="输入学号，换行区分"
                   onChange={(e, v) => this.setState({memberIdListStr: v})}>
        </TextField><br/>

        <RaisedButton label="点击提交" primary={true} onClick={() => this.setState({showDialog: true})}/>

        <Dialog open={showDialog}>
          {`您将要添加 ${year} 年 ${month} 月的证书，请确认`}
          <br/>
          <div style={{padding: '20px 50px'}}>
            <RaisedButton
              style={{marginTop: 30}} label="取消" primary={true}
              onClick={() => this.setState({showDialog: false})}/>
            <RaisedButton
              style={{marginLeft: 30}} label="确认" primary={true}
              onClick={() => this.handleMemberIds()}
            />
          </div>
        </Dialog>

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
