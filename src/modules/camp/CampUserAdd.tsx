import * as React from 'react'
import { TextField, RaisedButton } from 'material-ui'
import { DataTable } from './components/DataTable'
import { loadProfileByMemberId, loadProfileByNickName, loadProfileByRiseId } from './async'

export default class CampUserAdd extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      meta: [
        {tag: 'nickName', alias: '昵称'},
        {tag: 'classNameStr', alias: '班级'},
        {tag: 'groupId', alias: '小组'},
        {tag: 'memberId', alias: '学号'},
        {tag: 'activeStr', alias: '学习状态'}
      ],
      nickName: '',
      riseId: '',
      memberId: ''
    }
  }

  loadProfilesByNickName() {
    loadProfileByNickName(this.state.nickName).then(res => {
      if(res.code === 200) {
        this.setState({data: res.msg})
      }
    })
  }

  loadProfileByRiseId() {
    loadProfileByRiseId(this.state.riseId).then(res => {
      if(res.code === 200) {
        this.setState({data: res.msg})
      }
    })
  }

  loadProfileByMemberId() {
    loadProfileByMemberId(this.state.memberId).then(res => {
      if(res.code === 200) {
        this.setState({data: res.msg})
      }
    })
  }

  render() {
    const {
      data,
      meta,
      nickName,
      riseId,
      memberId
    } = this.state

    return (
      <div style={{padding: '20px 40px'}}>
        <h1>用户查找，输入用户昵称或者 RISEID</h1>
        <TextField
          style={{height: 50, width: 200}}
          hintText="如：天线宝宝"
          value={nickName}
          onChange={(e, v) => this.setState({nickName: v})}/>
        <RaisedButton
          label="昵称查询"
          style={{height: 30, marginLeft: 20}}
          onClick={() => this.loadProfilesByNickName()}/>
        <TextField
          style={{height: 50, width: 200, marginLeft: 50}}
          hintText="输入用户RISEID"
          value={riseId}
          onChange={(e, v) => this.setState({riseId: v})}/>
        <RaisedButton
          label="RISEID查询"
          style={{height: 30, marginLeft: 20}}
          onClick={() => this.loadProfileByRiseId()}/>
        <TextField
          style={{height: 50, width: 200, marginLeft: 50}}
          hintText="输入用户学号"
          value={memberId}
          onChange={(e, v) => this.setState({memberId: v})}/>
        <RaisedButton
          label="学号查询"
          style={{height: 30, marginLeft: 20}}
          onClick={() => this.loadProfileByMemberId()}/>
        <br/>
        <DataTable ref="table" data={data} meta={meta}/>
      </div>
    )
  }

}
