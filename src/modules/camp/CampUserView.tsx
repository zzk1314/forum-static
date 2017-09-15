import * as React from 'react'
import { DataTable } from './components/DataTable'
import { Tabs, Tab } from 'material-ui'
import { loadMonthlyCampByClassName } from './async'

export default class CampUserView extends React.Component<any, any> {
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
    loadMonthlyCampByClassName('0801').then(res => {
      console.log(res)
      this.setState({ data: res.msg })
    })
  }

  render() {
    const { data, meta } = this.state

    return (
      <div className="camp-view-container" style={{ padding: '20px 40px' }}>
        <h1>班级人员信息查看</h1>
        <Tabs>
          {
            data.map((item, index) => (
              <Tab label={item.groupId} key={index}>
                <DataTable ref="table" data={item.monthlyCampDtos} meta={meta}/>
              </Tab>
            ))
          }
        </Tabs>
      </div>
    )
  }
}
