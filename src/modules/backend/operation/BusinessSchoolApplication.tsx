import * as React from "react";
import { connect } from "react-redux";
import { set, startLoad, endLoad, alertMsg } from "../../../redux/actions"
import "./BusinessSchoolApplication.less";
import { loadBusinessApplicationList, rejectBusinessApplication, approveBusinessApplication, ignoreBusinessApplication } from "./async"
import * as _ from "lodash";
import { MessageTable } from '../message/autoreply/MessageTable'
import { RaisedButton, TextField, Toggle, Dialog, Divider, SelectField, MenuItem } from 'material-ui'
import Loading from '../../../components/Loading'

const cellStyle = {
  paddingLeft: 0,
  paddingRight: 0,
}
@connect(state => state)
export default class BusinessSchoolApplication extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      meta: [
        { tag: 'nickname', alias: '昵称', style: cellStyle },
        { tag: 'isDuplicate', alias: '是否重复申请', style: _.merge({}, cellStyle, { width: '85px' }) },
        { tag: 'isAsst', alias: '助教', style: _.merge({}, cellStyle, { width: '35px' }) },
        { tag: 'originMemberTypeName', alias: '原本会员类型', style: cellStyle },
        { tag: 'finalPayStatus', alias: '最终付费情况', style: cellStyle },
        { tag: 'coupon', alias: '优惠券', style: cellStyle },
        { tag: 'checkTime', alias: '审核时间', style: cellStyle },
        { tag: 'deal', alias: '已处理', style: cellStyle },
        { tag: 'submitTime', alias: '问卷提交时间', style: cellStyle },
      ],
      data: [],
      openDialog: false,
      showCouponChoose: false,
      coupon: 0,
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(startLoad());
    loadBusinessApplicationList(1).then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.setState({ applications: res.msg.data, tablePage: res.msg.page });
      } else {
        dispatch(alertMsg(res.smg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });
  }

  openDialog(data) {
    this.setState({
      openDialog: true,
      editData: data
    })
  }

  handleChangeCoupon(event, index, value) {
    this.setState({ coupon: value });
  }

  handleClickRejectApplication(data, comment) {
    const { dispatch } = this.props;
    dispatch(startLoad());
    rejectBusinessApplication(data.id, comment).then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.refreshPage();
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });
  }

  handleClickApprove(data, coupon, comment) {
    const { dispatch } = this.props;
    dispatch(startLoad());
    approveBusinessApplication(data.id, coupon, comment).then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.refreshPage();
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  handleClickIgnoreApplication(data, comment) {
    const { dispatch } = this.props;
    dispatch(startLoad());
    ignoreBusinessApplication(data.id, comment).then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.refreshPage();
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  refreshPage() {
    this.setState({
      openDialog: false,
      editData: undefined,
      coupon: 0,
      comment: undefined,
      showCouponChoose: false,
    }, () => {
      this.handlePageClick(this.state.page)
    })
  }

  handlePageClick(page) {
    const { dispatch } = this.props;
    dispatch(startLoad());
    loadBusinessApplicationList(page).then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.setState({ applications: res.msg.data, tablePage: res.msg.page, page: page });
      } else {
        dispatch(alertMsg(res.smg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });
  }

  handleClickClose() {
    this.setState({
      openDialog: false,
      editData: undefined,
      coupon: 0,
      comment: undefined,
      showCouponChoose: false,
    })
  }

  render() {
    const renderDialogItem = (label, value, br) => {
      return (
        <div className="bs-dialog-row">
          <span className="bs-dialog-label">{label}：</span>{br ? <br/> : null}
          <span className="bs-dialog-value">{value}</span>
          <Divider/>
        </div>
      )
    }
    const renderDialog = () => {
      const { openDialog, editData = {}, showCouponChoose, coupon, comment } = this.state;

      return (
        <Dialog open={openDialog} autoScrollBodyContent={true} modal={false}>
          <div className="bs-dialog">
            <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
              申请者信息：
            </div>
            {renderDialogItem("昵称", editData.nickname)}
            {renderDialogItem("OpenId", editData.openid)}
            {renderDialogItem("当前会员状态", editData.memberType)}
            {renderDialogItem("付费状态", editData.finalPayStatus)}
            {renderDialogItem("申请时会员类型", editData.originMemberTypeName)}
            {renderDialogItem("是否助教", editData.isAsst)}
            {renderDialogItem("是否重复申请", editData.isDuplicate)}
            {renderDialogItem("最终付费状态", editData.finalPayStatus)}
            <div className="bs-dialog-header">
              问卷信息：
            </div>
            {renderDialogItem("1.请选择您目前从事的行业", editData.q1Answer, true)}
            {renderDialogItem("2.请选择您目前从事的职业", editData.q2Answer, true)}
            {renderDialogItem("3.请选择您的职位层级", editData.q3Answer, true)}
            {renderDialogItem("4.请选择您目前所在公司的企业性质", editData.q4Answer, true)}
            {renderDialogItem("5.请填写您的工作年限", editData.q5Answer, true)}
            {renderDialogItem("6.请选择您的最高学历", editData.q6Answer, true)}
            {renderDialogItem("7.请选择您的最高学历院校", editData.q7Answer, true)}
            {renderDialogItem("8.海外高校名称", editData.q8Answer, true)}
            {renderDialogItem("9.请选择你所在的国内城市", editData.q9Answer, true)}
            {renderDialogItem("10.请填写你所在的海外国家和城市", editData.q10Answer, true)}
            {renderDialogItem("11.请描述您加入圈外商学院的成长目标", editData.q11Answer, true)}
            {renderDialogItem("12.您是否要申请奖学金", editData.q12Answer, true)}
            {renderDialogItem("13.请填写您的奖学金申请词", editData.q13Answer, true)}
            {renderDialogItem("14.请输入您的手机号码", editData.q14Answer, true)}
            {renderDialogItem("15.您的微信号", editData.q15Answer, true)}
            <div className="bs-dialog-header">
              审批：
            </div>
            <br/>
            输入备注：<br/>
            <TextField
              hintText="备注"
              multiLine={true}
              rows={1}
              value={comment}
              onChange={(e, v) => this.setState({ comment: v })}
              rowsMax={4}
            /><br/>
            <RaisedButton
              style={{ marginLeft: 30 }}
              label="通过" secondary={true}
              onClick={() => this.setState({ showCouponChoose: true })}/>
            <RaisedButton
              style={{ marginLeft: 30 }}
              label="拒绝" secondary={true}
              onClick={() => this.handleClickRejectApplication(editData, comment)}/>
            <RaisedButton
              style={{ marginLeft: 30 }}
              label="私信" secondary={true}
              onClick={() => this.handleClickIgnoreApplication(editData, comment)}/>
            <RaisedButton
              style={{ marginLeft: 30 }}
              label="取消" secondary={true}
              onClick={() => this.handleClickClose()}/>
            {
              showCouponChoose ?
                <div className="bs-dialog-coupon">
                  <SelectField
                    floatingLabelText="请选择优惠券"
                    value={coupon}
                    onChange={(event, index, value) => this.handleChangeCoupon(event, index, value)}
                  >
                    <MenuItem value={0} primaryText="无"/>
                    <MenuItem value={100} primaryText="100"/>
                    <MenuItem value={200} primaryText="200"/>
                    <MenuItem value={300} primaryText="300"/>
                    <MenuItem value={500} primaryText="500"/>
                    <MenuItem value={1340} primaryText="1340"/>
                    <MenuItem value={2680} primaryText="2680"/>
                  </SelectField>
                  <RaisedButton
                    style={{ marginLeft: 30 }}
                    label="确定" primary={true}
                    onClick={() => this.handleClickApprove(editData, coupon, comment)}/>
                </div> : <div className="bs-dialog-coupon"/>
            }
          </div>
        </Dialog>
      )
    }
    return (
      <div className="bs-container">
        {renderDialog()}
        <MessageTable data={this.state.applications} meta={this.state.meta} editFunc={(item) => this.openDialog(item)}
                      page={this.state.tablePage} handlePageClick={(page) => this.handlePageClick(page)} opsName="审核"/>
      </div>
    )
  }
}
