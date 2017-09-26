import * as React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  FlatButton,
  Dialog
} from 'material-ui/Table'
import isBoolean = require('lodash/isBoolean')

// data: []
// meta: [
//  {tag: '', alias: ''}
// ]
interface TableProps {
  data: any,
  meta: any,
  editFunc: any
}
interface TableState {
  selected: any,
  showRowHover: boolean, // 鼠标悬浮样式
  fixedHeader: boolean, // 固定表格头
  selectable: boolean, // 是否可选择
  multiSelectable: boolean, // 是否允许多选
  enableSelectAll: boolean, // 是否显示全选
  showCheckboxes: boolean, // 显示选择看
  deselectOnClickaway: boolean, // 点击其他区域，取消选择
}
export class MessageTable extends React.Component {

  constructor() {
    super()
    this.state = {
      selected: []
    }
  }

  getInnerState() {
    return this.state
  }

  isSelected(index) {
    return this.state.selected.indexOf(index) !== -1
  }

  handleSelect(selected) {
    this.setState({ selected: selected })
  }

  render() {
    const { data = [], meta = [], editFunc = {} } = this.props
    const {
      showRowHover = true,
      fixedHeader = true,
      selectable = true,
      multiSelectable = false,
      enableSelectAll = false,
      showCheckboxes = false,
      deselectOnClickaway = false
    } = this.state

    if(meta.length == 0 || data.length == 0) {
      return (
        <Table fixedHeader={fixedHeader} selectable={selectable} multiSelectable={multiSelectable}
               onRowSelection={(selected) => this.handleSelect(selected)}>
          <TableHeader displaySelectAll={showCheckboxes} adjustForCheckbox={showCheckboxes}
                       enableSelectAll={enableSelectAll}>
            <TableRow>
              <TableHeaderColumn>暂无数据</TableHeaderColumn>
            </TableRow>
          </TableHeader>
        </Table>
      )
    }

    return (
      <div>
        <Table
          fixedHeader={fixedHeader} selectable={selectable} multiSelectable={multiSelectable}
          onRowSelection={(selected) => this.handleSelect(selected)}>
          <TableHeader
            displaySelectAll={showCheckboxes} adjustForCheckbox={showCheckboxes} enableSelectAll={enableSelectAll}>
            <TableRow>
              <TableHeaderColumn>序号</TableHeaderColumn>
              {
                meta.map((metaItem, index) => (
                  <TableHeaderColumn key={index}>{metaItem.alias}</TableHeaderColumn>
                ))
              }
              <TableHeaderColumn>操作</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={deselectOnClickaway} showRowHover={showRowHover}
                     displayRowCheckbox={showCheckboxes}>
            {
              data.map((dataItem, index) => (
                <TableRow key={index} selected={this.isSelected(index)}>
                  <TableHeaderColumn>{index + 1}</TableHeaderColumn>
                  {
                    meta.map((metaItem, index) => (
                      <TableRowColumn key={index}>
                        {
                          dataItem[metaItem.tag] == '0' || dataItem[metaItem.tag] == '1' ?
                            dataItem[metaItem.tag] == '0' ? '否' : '是' :
                            dataItem[metaItem.tag]
                        }
                      </TableRowColumn>
                    ))
                  }
                  <TableRowColumn style={{ color: '#55cbcb', cursor: 'pointer' }}>
                    <span onClick={() => editFunc(dataItem)}>编辑</span>
                  </TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    )
  }

}
