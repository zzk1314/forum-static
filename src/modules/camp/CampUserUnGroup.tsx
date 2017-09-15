import * as React from 'react'
import { DataTable } from './components/DataTable'
import { loadMonthlyCampUnGroup } from './async'

export default class CampUserUnGroup extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      meta: [
        { tag: 'nickName', alias: '昵称' },
        { tag: 'classNameStr', alias: '班级' },
        { tag: 'groupId', alias: '小组' },
        { tag: 'memberId', alias: '学号' },
        { tag: 'activeStr', alias: '学习状态' }
      ]
    }
  }

  componentWillMount() {
    loadMonthlyCampUnGroup().then(res => {
      this.setState({ data: res.msg })
    })
  }

  render() {
    const { data, meta } = this.state

    return (
      <div className="camp-view-container" style={{ padding: '20px 40px' }}>
        <h1>待分组人员查看</h1>
        <DataTable ref="table" data={data} meta={meta}/>
      </div>
    )
  }
}
