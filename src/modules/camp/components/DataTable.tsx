import * as React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
  FlatButton,
  Dialog
} from 'material-ui/Table'
import { ProfileModal } from './ProfileModal'
import { modifyAddMonthlyCamp, modifyMonthlyCamp } from '../async'
import ReactPaginate from 'react-paginate'

interface DataTableProps {
  data: any,
  meta: any,
  // 用户信息 submit 方法
  submitFunc?: any,
  page?: any,
  handlePageClick?: any
}
interface DataTableState {
  openProfileModal: boolean,

  selected: any,
  openProfileData: object,

  showRowHover: boolean, // 鼠标悬浮样式
  fixedHeader: boolean, // 固定表格头
  selectable: boolean, // 是否可选择
  multiSelectable: boolean, // 是否允许多选
  enableSelectAll: boolean, // 是否显示全选
  showCheckboxes: boolean, // 显示选择看
  deselectOnClickaway: boolean, // 点击其他区域，取消选择
}
export class DataTable extends React.Component<DataTableProps, DataTableState> {
  constructor() {
    super()
    this.state = {
      selected: [],
      openProfileData: {}
    }
  }

  getInnerState() {
    return this.state
  }

  // 内部逻辑
  handleEditProfile(profileItem) {
    this.setState({ openProfileModal: true, openProfileData: profileItem })
  }

  isSelected(index) {
    return this.state.selected.indexOf(index) !== -1
  }

  handleSelect(selected) {
    this.setState({ selected: selected })
  }

  handleCancleModal() {
    this.setState({ openProfileModal: false })
  }

  handleSubmitModal() {
    const { data = [] } = this.props
    let innerState = this.refs.profile.getInnerState()
    // riseClassMemberId 是否有值作区分
    let submitFunc = innerState.riseClassMemberId ? modifyMonthlyCamp : modifyAddMonthlyCamp
    submitFunc(innerState).then(res => {
      if(res.code === 200) {
        // 更新 data 数据
        data.map((item, index) => {
          if(item.riseId === res.msg.riseId) {
            data[ index ] = res.msg
          }
        })
        this.setState({
          openProfileModal: false
        })
      }
    })
  }

  hanleClickPageSelected(pageSelected) {
    if(this.props.handlePageClick) {
      this.props.handlePageClick(pageSelected.selected + 1)
    }
  }

  render() {
    const { data = [], page, meta = [] } = this.props
    const {
      openProfileModal = false,
      openProfileData,
      showRowHover = true,
      fixedHeader = true,
      selectable = true,
      multiSelectable = true,
      enableSelectAll = true,
      showCheckboxes = true,
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

    const renderProfileDetail = () => {
      const actions = [
        {
          label: '取消',
          onClick: () => this.handleCancleModal()
        },
        {
          label: '提交',
          onClick: () => this.handleSubmitModal()
        }
      ]

      return (
        <ProfileModal
          ref="profile"
          open={openProfileModal}
          profile={openProfileData}
          actions={actions}/>
      )
    }

    return (
      <div>
        <Table
          fixedHeader={fixedHeader} selectable={selectable}
          multiSelectable={multiSelectable}
          onRowSelection={(selected) => this.handleSelect(selected)}>
          <TableHeader
            displaySelectAll={showCheckboxes}
            adjustForCheckbox={showCheckboxes}
            enableSelectAll={enableSelectAll}>
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
          <TableBody
            deselectOnClickaway={deselectOnClickaway}
            showRowHover={showRowHover}
            displayRowCheckbox={showCheckboxes}>
            {
              data.length > 0 ?
                data.map((dataItem, index) => (
                  <TableRow key={index} selected={this.isSelected(index)}>
                    <TableHeaderColumn>{index + 1}</TableHeaderColumn>
                    {
                      meta.map((metaItem, index) => (
                        <TableRowColumn key={index}>{dataItem[ metaItem.tag ]}</TableRowColumn>
                      ))
                    }
                    <TableRowColumn style={{ color: '#55cbcb', cursor: 'pointer' }}>
                      <span onClick={()=>this.handleEditProfile(dataItem)}>编辑</span>
                    </TableRowColumn>
                  </TableRow>
                )) : null
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableRowColumn>
                {
                  page ?
                    <ReactPaginate previousLabel={'上一页'}
                                   nextLabel={'下一页'}
                                   pageCount={page.pageCount}
                                   pageRangeDisplayed={5}
                                   marginPagesDisplayed={1}
                                   onPageChange={(pageSelected) => this.hanleClickPageSelected(pageSelected)}
                                   containerClassName={'pagination'}
                                   subContainerClassName={'pages pagination'}
                                   activeClassName={'active'}/> : null
                }
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
        {renderProfileDetail()}
      </div>
    )
  }
}

