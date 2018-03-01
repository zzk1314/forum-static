import *  as React from 'react'
import { startLoad, endLoad, alertMsg } from '../../../redux/actions'
import { loadCheckedApplication } from './async'
import { MessageTable } from '../message/autoreply/MessageTable'


const cellStyle = {
  paddingLeft: 0,
  paddingRight: 0
}

export default class BusinessHistory extends React.Component<any, any> {

  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      infos: [],
      meta: [
        { tag: 'nickname', alias: '昵称', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'interviewTime', alias: '合适的面试时间', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'workYear', alias: '首次工作时间', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'industry', alias: '当前职位', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'level', alias: '职位层级', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'college', alias: '院校名称', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'submitTime', alias: '问卷提交时间', style: cellStyle },
        { tag: 'interviewerName', alias: '面试人', style: _.merge({}, cellStyle, { width: '70px' }) }
      ]
    }

  }

  componentWillMount() {
    const { dispatch } = this.props
    const { page } = this.state

    dispatch(startLoad())
    loadCheckedApplication(page).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          infos: res.msg.data,
          tablePage: res.msg.page
        })
      }
      else {
        dispatch(alertMsg(msg))
      }
    })
  }

  handlePageClick(page) {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadCheckedApplication(page).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ infos: res.msg.data, tablePage: res.msg.page, page: page })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  openDialog(item) {

  }

  render() {


    // const renderDialog = () => {
    //   const { openDialog, editData = {}, showCouponChoose, coupon, RasiedClicked } = this.state
    //   return (
    //     <Dialog open={openDialog} autoScrollBodyContent={true} modal={false}>
    //       <div className="bs-dialog">
    //         <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
    //           申请者信息：
    //         </div>
    //         {renderDialogItem('昵称：', editData.nickname)}
    //         {renderDialogItem('OpenId：', editData.openid)}
    //         {renderDialogItem('当前会员状态：', editData.memberType)}
    //         {renderDialogItem('付费状态：', editData.finalPayStatus)}
    //         {renderDialogItem('申请时会员类型：', editData.originMemberTypeName)}
    //         {renderDialogItem('是否助教：', editData.isAsst)}
    //         {renderDialogItem('最近审核结果：', editData.verifiedResult)}
    //         {renderDialogItem('是否黑名单用户：', editData.isBlack)}
    //         {renderDialogItem('最终付费状态：', editData.finalPayStatus)}
    //         {renderDialogItem('面试官：', editData.interviewerName)}
    //         <div className="bs-dialog-header">
    //           问卷信息：
    //         </div>
    //         {editData.questionList ? editData.questionList.map(item => {
    //           return renderDialogItem(item.question, item.answer, true, item.id)
    //         }) : null}
    //         <div className="bs-dialog-header">
    //           评价：
    //         </div>
    //         <br/>
    //         {renderInterview()}
    //
    //         {
    //           RasiedClicked ? null :
    //             <div ref="raisedButton">
    //               <RaisedButton
    //                 style={{ marginLeft: 30 }}
    //                 label="通过" secondary={true} disabled={editData.isBlack === '是'}
    //                 onClick={() => {
    //                   this.checkCommentedApproval()
    //                 }}/>
    //               <RaisedButton
    //                 style={{ marginLeft: 30 }}
    //                 label="拒绝" secondary={true}
    //                 onClick={() => this.handleClickRejectApplicationBtn(editData)}/>
    //               <RaisedButton
    //                 style={{ marginLeft: 30 }}
    //                 label="私信" secondary={true}
    //                 onClick={() => this.handleClickIgnoreApplication(editData)}/>
    //               <RaisedButton
    //                 style={{ marginLeft: 30 }}
    //                 label="取消" secondary={true}
    //                 onClick={() => this.handleClickClose()}/>
    //             </div>
    //         }
    //
    //         {
    //           showCouponChoose ?
    //             <div className="bs-dialog-coupon">
    //               <SelectField
    //                 floatingLabelText="请选择优惠券"
    //                 value={coupon}
    //                 onChange={(event, index, value) => this.handleChangeCoupon(event, index, value)}
    //               >
    //                 <MenuItem value={0} primaryText="无"/>
    //                 <MenuItem value={200} primaryText="200"/>
    //                 <MenuItem value={300} primaryText="300"/>
    //                 <MenuItem value={400} primaryText="400"/>
    //                 <MenuItem value={500} primaryText="500"/>
    //                 <MenuItem value={600} primaryText="600"/>
    //                 <MenuItem value={800} primaryText="800"/>
    //                 <MenuItem value={1540} primaryText="1540"/>
    //                 <MenuItem value={3080} primaryText="3080"/>
    //               </SelectField>
    //               <RaisedButton
    //                 style={{ marginLeft: 30 }}
    //                 label="确定" primary={true}
    //                 onClick={() => this.handleClickApprove(editData, coupon)}/>
    //             </div> : <div className="bs-dialog-coupon"/>
    //         }
    //       </div>
    //     </Dialog>
    //   )
    // }

    return (
      <div>
        <MessageTable data={this.state.infos} meta={this.state.meta}
                      opsButtons={[{
                        editFunc: (item) => this.openDialog(item),
                        opsName: '查看详情'
                      }]}
                      page={this.state.tablePage} handlePageClick={(page) => this.handlePageClick(page)}/>
      </div>
    )
  }
}
