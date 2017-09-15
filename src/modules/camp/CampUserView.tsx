import * as React from 'react'
import { DataTable } from './components/DataTable'
import { Tabs, Tab, TextField, RaisedButton, Dialog, FlatButton } from 'material-ui'
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
      activeTabSelected: [],
      openBatchDialog: false,
      batchGroupId: ''
    }
  }

  componentWillMount() {
    // loadMonthlyCampByClassName('0801').then(res => {
    //   console.log(res)
    //   this.setState({ data: res.msg })
    // })
  }

  loadClassData(func) {
    const { className } = this.state
    loadMonthlyCampByClassName(className).then(res => {
      this.setState({ data: res.msg }, () => {
        func ? func() : null
      })
    })
  }

  batchHandle() {
    let tableSelected = this.refs[`table${this.state.activeTab}`].getInnerState()
    this.setState({
      activeTabSelected: tableSelected.selected,
      openBatchDialog: true
    })
  }

  handleDialogClose() {
    this.setState({ openBatchDialog: false })
  }

  handleDialogSubmit() {
    // 提交
    this.loadClassData(() => this.setState({ openBatchDialog: false }))
  }

  render() {
    const {
      data,
      meta,
      className,
      activeTab,
      openBatchDialog,
      batchGroupId
    } = this.state

    const renderOtherComponents = () => {
      const actions = [
        <FlatButton
          label="取消"
          primary={true}
          onClick={() => this.handleDialogClose()}/>,
        <FlatButton
          label="提交"
          primary={true}
          onClick={() => this.handleDialogSubmit()}/>
      ]

      return (
        <Dialog
          title="批量分组"
          actions={actions}
          modal={false}
          open={openBatchDialog}
          onRequestClose={() => this.handleDialogClose()}>
          <TextField
            hintText="输入准备批量转义的小组号"
            value={batchGroupId}
            onChange={(e, v) => this.setState({ batchGroupId: v })}/>
        </Dialog>
      )
    }

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
          onClick={() => this.loadClassData()}/> <br/>
        <RaisedButton
          label="批量分组"
          style={{ height: 30, marginTop: 20 }}
          onClick={this.batchHandle.bind(this)}/>
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
        {renderOtherComponents()}
      </div>
    )
  }
}
