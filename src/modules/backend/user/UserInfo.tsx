import * as React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { startLoad, endLoad, alertMsg } from '../../../redux/actions'
import { searchInfoById, searchInfoByMember, searchInfoByRiseId } from './async'
import Dialog from 'material-ui/Dialog'
import { Divider } from 'material-ui'
import './UserInfo.less'

@connect(state => state)
export default class UserInfo extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      memberId: '',
      profileId: '',
      riseId: '',
      openDialog: false,
      info: ''
    }
  }

  /**
   * 根据学号查询
   * @param memberId
   */
  searchInfoByMemberId(memberId) {
    const { dispatch } = this.props
    dispatch(startLoad())

    searchInfoByMember(memberId).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          openDialog: true,
          info: msg
        })

      }
      else {
        dispatch(alertMsg(msg))
      }
    })
  }

  /**
   * 根据profileId查询
   * @param id
   */
  searchInfoById(id){
    const {dispatch} = this.props
    if(isNaN(id)){
      dispatch(alertMsg('请输入数字'))
      return
    }

    dispatch(startLoad())

    searchInfoById(id).then(res=>{
      dispatch(endLoad())
      const{code,msg} = res
      if(code === 200){
        this.setState({
          openDialog:true,
          info:msg
        })
      }
      else{
        dispatch(alertMsg(msg))
      }
    })
  }

  /**
   * 根据RiseId查询
   * @param riseId
   */
  searchInfoByRiseId(riseId){
    const{dispatch} = this.props
    dispatch(startLoad())

    searchInfoByRiseId(riseId).then(res=>{
      dispatch(endLoad())
      const{code,msg} = res
      if(code===200){
        this.setState({
          openDialog:true,
          info:msg
        })
      }
      else{
        dispatch(alertMsg(msg))
      }
    })

  }

  closeDialog = () => {
    this.setState({
      openDialog: false,
      memberId: '',
      profileId: '',
      riseId: '',
      info: ''
    })
  }

  render() {
    const { memberId,profileId,riseId } = this.state
    const renderSearch = () => {
      return (
        <div className="search-container">
          <div className="search-item-container">
            <TextField hintText={'输入学号查询'} style={{ margin: 40,width:180}} value={memberId}
                       onChange={(e, v) => this.setState({ memberId: v })}/>
            <RaisedButton
              label="点击查询" onClick={() => this.searchInfoByMemberId(memberId)}
            /><br/>
          </div>
          <div className="search-item-container">
            <TextField hintText={'输入profileId查询'} style={{ margin: 40,width:180 }} value={profileId}
                       onChange={(e, v) => this.setState({ profileId: v })}/>
            <RaisedButton
              label="点击查询" onClick={() => this.searchInfoById(profileId)}
            /><br/>
          </div>
          <div className="search-item-container">
            <TextField hintText={'输入RiseId查询'} style={{ margin: 40,width:180 }} value={riseId}
                       onChange={(e, v) => this.setState({ riseId: v })}/>
            <RaisedButton
              label="点击查询" onClick={() => this.searchInfoByRiseId(riseId)}
            /><br/>
          </div>
        </div>


      )
    }

    const renderDialog = () => {
      const { openDialog, info } = this.state
      return (
        <Dialog open={openDialog} autoScrollBodyContent={true} modal={false}>
          <div className="bs-dialog">
            <div className="bs-dialog-header" style={{ marginTop: '0px',marginBottom:'20px' }}>
              用户信息：
            </div>
            {renderDialogItem('昵称：', info.nickname)}
            {renderDialogItem('openid：', info.openid)}
            {renderDialogItem('真实姓名：', info.realName)}
            {renderDialogItem('收件人：', info.receiver)}
            {renderDialogItem('圈外id：', info.riseId)}
            {renderDialogItem('微信号：', info.weixinId)}
            {renderDialogItem('联系方式：', info.mobileNo)}
            {renderDialogItem('婚恋情况：', info.married)}

            <div className="bs-dialog-header" style={{ marginTop: '20px',marginBottom:'20px'  }}>
              会员信息
            </div>
            {renderDialogItem('当前会员类型：', info.memberType)}
            {renderDialogItem('学号：', info.memberId)}
            {renderDialogItem('入学日期：', info.openDate)}


            <div className="bs-dialog-header" style={{ marginTop: '20px',marginBottom:'20px'  }}>
              地址信息：
            </div>
            {renderDialogItem('国家：', info.country)}
            {renderDialogItem('省份：', info.province)}
            {renderDialogItem('城市：', info.city)}
            {renderDialogItem('地址：', info.address)}
            {
              <div ref="raisedButton">
                <RaisedButton
                  style={{ marginLeft: 30, marginTop: 30 }}
                  label="确定" primary={true}
                  onClick={() => {
                    this.closeDialog()
                  }}/>
              </div>
            }
          </div>
        </Dialog>
      )
    }

    const renderDialogItem = (label, value, br, key) => {
      return (
        <div className="bs-dialog-row" key={key}>
          <span className="bs-dialog-label">{label}</span>{br ? <br/> : null}

          <span className={`${(value == '是' && label == '是否黑名单用户：') ? 'bs-dialog-true-value' : 'bs-dialog-value'}`}>
            {value}
          </span>

          <Divider/>
        </div>
      )
    }

    return (
      <div className="user-info-container">
        {renderSearch()}
        {renderDialog()}
      </div>
    )
  }

}

