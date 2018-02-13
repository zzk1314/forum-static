import * as React from 'react'
import { DataTable } from './components/DataTable'
import { RaisedButton, FlatButton, Dialog, TextField } from 'material-ui'
import { batchModifyMonthlyCampGroupId, loadUnGroupMonthlyCamp } from './async'
import _ from 'lodash'

export default class CampUserUnGroup extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      page: {},
      meta: [
        { tag: 'nickName', alias: '昵称' },
        { tag: 'classNameStr', alias: '班级' },
        { tag: 'groupId', alias: '小组' },
        { tag: 'memberId', alias: '学号' },
        { tag: 'activeStr', alias: '学习状态' }
      ],
      selectedValue: [],
      openBatchDialog: false,
      batchGroupId: ''
    }
  }

  componentWillMount() {
    loadUnGroupMonthlyCamp(1).then(res => {
      this.setState({ data: res.msg.monthlyCampDtoList, page: res.msg.page })
    })
  }

  batchHandle() {
    let tableState = this.refs.table.getInnerState()
    let selected = tableState.selected
    const { data = [] } = this.state
    let selectedValue = []
    data.map((dataItem, index) => {
      if(selected.indexOf(index) > -1) {
        selectedValue.push(dataItem.riseClassMemberId)
      }
    })
    this.setState({ selectedValue: selectedValue, openBatchDialog: true })
  }

  handleDialogClose() {
    this.setState({ openBatchDialog: false })
  }

  handleDialogSubmit() {
    const { selectedValue, batchGroupId } = this.state
    if(selectedValue.length == 0 || _.trim(batchGroupId) === '') {
      alert('分组数据出错，请确认重试')
    } else {
      batchModifyMonthlyCampGroupId(selectedValue, batchGroupId).then(res => {
        if(res.code === 200) {
          loadUnGroupMonthlyCamp(1).then(res => {
            this.setState({ data: res.msg.monthlyCampDtoList, page: res.msg.page, openBatchDialog: false })
          })
        } else {
          alert('数据分组出错，请及时练习管理员')
        }
      })
    }
  }

  render() {
    const {
      data,
      page,
      meta,
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

    const handlePageClick = (selected) => {
      loadUnGroupMonthlyCamp(selected).then(res => {
        this.setState({ data: res.msg.monthlyCampDtoList, page: res.msg.page })
      })
    }

    return (
      <div style={{ padding: '20px 40px' }}>
        <h1>待分组人员查看</h1><br/>
        <RaisedButton
          label="批量分组"
          style={{ height: 30, marginTop: 20 }}
          onClick={()=>this.batchHandle()}/>
        <DataTable ref="table"
                   data={data}
                   meta={meta}
                   page={page}
                   handlePageClick={handlePageClick}/>
        {renderOtherComponents()}
      </div>
    )
  }
}
