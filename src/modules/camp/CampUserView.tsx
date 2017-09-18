import * as React from 'react'
import { DataTable } from './components/DataTable'
import { Tabs, Tab, TextField, RaisedButton } from 'material-ui'
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
      ],
      className: '',
      activeTab: 0,
      activeTabSelected: []
    }
  }

  loadClassData() {
    const { className } = this.state
    loadMonthlyCampByClassName(className).then(res => {
      this.setState({ data: res.msg })
    })
  }

  render() {
    const {
      data,
      meta,
      className,
      activeTab
    } = this.state

    return (
      <div className="camp-view-container" style={{ padding: '20px 40px' }}>
        <h1>班级人员信息查看</h1>
        <TextField
          style={{ height: 50 }}
          hintText="输入班级：如0801，代表八月一班"
          value={className}
          onChange={(e, v) => this.setState({ className: v })}/>
        <RaisedButton
          label="点击查询"
          style={{ height: 30, marginLeft: 20 }}
          onClick={() => this.loadClassData()}/><br/>
        <Tabs style={{ marginTop: 30 }} initialSelectedIndex={activeTab}>
          {
            data.map((item, index) => (
              <Tab label={item.groupId} key={index} value={index}
                   onActive={(e) => this.setState({ activeTab: e.props.value })}>
                <DataTable ref={`table${index}`} data={item.monthlyCampDtos} meta={meta}/>
              </Tab>
            ))
          }
        </Tabs>
      </div>
    )
  }
}
