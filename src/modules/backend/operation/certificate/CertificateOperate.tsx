import * as React from 'react'
import { Dialog, SelectField, MenuItem, RaisedButton } from 'material-ui'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import { generateCertificate, sendCertificate, sendFullAttendance } from '../async'
import proxy from '../../../../components/proxy/proxy'

@connect(state => state)
export default class CertificateOperate extends React.Component {

  constructor () {
    super()
    this.state = {
      year: 2018,
      month: 1,
      memberTypeId: 0,
      showDialog: false,
      handleFunc: () => {
      },
      dialogContent: '',
    }
  }

  handleGenerateCertificate () {
    const {
      year,
      month,
      memberTypeId,
    } = this.state
    this.setState({
      showDialog: true,
      dialogContent: `点击生成${year}年${month}月的证书`,
      handleFunc: async () => {
        if (memberTypeId === 0) {
          return
        }
        let res = await generateCertificate(year, month, memberTypeId)
        proxy.alertMessage('证书正在生成中，生成成功你将收到模板消息提醒')
        this.setState({
          showDialog: false,
        })
      },
    })
  }

  handleSendCertificate () {
    const {
      year,
      month,
      memberTypeId,
    } = this.state
    this.setState({
      showDialog: true,
      dialogContent: `点击发送${year}年${month}月的证书（将会发送模板消息通知学员，谨慎操作）`,
      handleFunc: async () => {
        if (memberTypeId === 0) {
          return
        }
        let res = await sendCertificate(year, month, memberTypeId)
        proxy.alertMessage('证书正在发送中，发送成功你将收到模板消息提醒')
        this.setState({
          showDialog: false,
        })
      },
    })
  }

  handleSendFullAttendance () {
    const {
      year,
      month,
      memberTypeId,
    } = this.state
    this.setState({
      showDialog: true,
      dialogContent: `点击发送${year}年${month}月的全勤奖（将会发送模板消息通知学员，谨慎操作）`,
      handleFunc: async () => {
        this.setState({
          showDialog: false,
        })
        if (memberTypeId === 0) {
          return
        }
        if (memberTypeId === this.MEMBERTYPE.BUSINESS_THINKG) {
          proxy.alertMessage('商业思维课程无需生成全勤奖')
          return
        }
        let res = await sendFullAttendance(year, month, memberTypeId)
        proxy.alertMessage('全勤奖正在发送中，发送成功你将收到模板消息提醒')
      },
    })
  }

  MEMBERTYPE = {
    CORE_ABILITY: 3,
    MONTH_CAMP: 5,
    BUSINESS_THINKG: 8,
  }

  render () {
    const {
      year, month, memberTypeId, showDialog, dialogContent, handleFunc = () => {
      },
    } = this.state

    const renderMonthItems = () => {
      const menuItems = []
      for (let i = 1; i <= 12; i++) {
        menuItems.push(<MenuItem key={i}
                                 value={i}
                                 primaryText={`${i}月`}></MenuItem>)
      }
      return menuItems
    }

    return (
      <div className="certificate-operate-container"
           style={{ padding: '6rem 8rem' }}>
        <SelectField floatingLabelText={'选择生成证书年份'}
                     value={year}
                     onChange={(event, index, value) => this.setState({ year: value })}>
          <MenuItem key={1}
                    value={2018}
                    primaryText={'2018年'}></MenuItem>
          <MenuItem key={2}
                    value={2019}
                    primaryText={'2019年'}></MenuItem>
        </SelectField>
        <br/>
        <SelectField floatingLabelText={'选择生成证书月份'}
                     value={month}
                     onChange={(event, index, value) => this.setState({ month: value })}>
          {renderMonthItems()}
        </SelectField>
        <br/>
        <SelectField floatingLabelText={'选择生成学习项目'}
                     value={memberTypeId}
                     onChange={(event, index, value) => this.setState({ memberTypeId: value })}>
          <MenuItem key={11}
                    value={this.MEMBERTYPE.CORE_ABILITY}
                    primaryText={'核心能力'}></MenuItem>
          <MenuItem key={12}
                    value={this.MEMBERTYPE.BUSINESS_THINKG}
                    primaryText={'商业思维'}></MenuItem>
          <MenuItem key={13}
                    value={this.MEMBERTYPE.MONTH_CAMP}
                    primaryText={'专项课'}></MenuItem>
        </SelectField>
        <br/><br/>
        <RaisedButton primary={true}
                      label={'生成证书'}
                      onClick={() => this.handleGenerateCertificate()}></RaisedButton>
        <RaisedButton secondary={true}
                      label={'发送证书'}
                      onClick={() => this.handleSendCertificate()}
                      style={{ marginLeft: '20px' }}></RaisedButton>
        <RaisedButton secondary={true}
                      label={'发送全勤奖'}
                      onClick={() => this.handleSendFullAttendance()}
                      style={{ marginLeft: '20px' }}></RaisedButton>

        <Dialog open={showDialog}>
          {dialogContent}
          <br/>
          <div style={{ padding: '20px 50px' }}>
            <RaisedButton style={{ marginTop: 30 }}
                          label="取消"
                          primary={true}
                          onClick={() => this.setState({ showDialog: false })}/>
            <RaisedButton style={{ marginLeft: 30 }}
                          label="确认"
                          primary={true}
                          onClick={() => handleFunc()}/>
          </div>
        </Dialog>
      </div>
    )
  }

}
