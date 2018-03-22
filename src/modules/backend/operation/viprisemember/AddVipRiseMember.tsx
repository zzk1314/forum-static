import * as React from 'react'
import { TextField, RaisedButton } from 'material-ui'
import './AddVipRiseMember.less'
import { openVipRiseMember } from '../async'
import _ from 'lodash'

export default class AddVipRiseMember extends React.Component {
  constructor () {
    super()
    this.state = {
      riseId: '',
      month: 0,
      memo: '',
    }
  }

  handleClickOpenRiseMember () {
    const { riseId, month, memo } = this.state
    if (_.isEmpty(riseId) || _.isEmpty(month) || _.isEmpty(month)) {
      alert('请补充完整数据再提交')
      return
    }
    if (month < 0 || month > 12) {
      alert('月份不能超过 12')
      return
    }
    openVipRiseMember(riseId, month, memo).then(res => {
      if (res.code === 200) {
        alert('更新成功')
      } else {
        alert('更新失败')
      }
    })
  }

  render () {
    return (
      <div className="add-vip-risemember-container">
        <TextField hintText="输入学员 riseid" onChange={(e, v) => this.setState({ riseId: v, })}/>
        <br/>
        <TextField hintText="会员有效期（月），不超过 12" onChange={(e, v) => this.setState({ month: v })}/>
        <br/>
        <TextField hintText="说明，必填" onChange={(e, v) => this.setState({ memo: v })}/>
        <br/>
        <RaisedButton label="提交" onClick={() => this.handleClickOpenRiseMember()} primary={true}/>
      </div>
    )
  }
}
