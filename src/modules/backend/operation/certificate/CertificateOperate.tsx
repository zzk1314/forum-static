import * as React from 'react'
import { Dialog, SelectField, MenuItem, RaisedButton } from 'material-ui'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import { generateCertificate, sendCertificate } from '../async'

@connect(state => state)
export default class CertificateOperate extends React.Component {

  constructor () {
    super()
    this.state = {
      year: 2018,
      month: 1,
      showDialog: false,
      handleFunc: () => {},
      dialogContent: '',
    }
  }

  handleGenerateCertificate () {
    const {
      year,
      month,
    } = this.state
    const { dispatch } = this.props
    this.setState({
      showDialog: true,
      dialogContent: `点击生成${year}年${month}月的证书`,
      handleFunc: () => {
        alert('正在生成证书')
        generateCertificate(year, month).then(res => {
          if (res.code == 200) {
            dispatch(alertMsg('证书正在生成中，生成成功你将收到模板消息提醒'))
          } else {
            dispatch(alertMsg(res.msg))
          }
        })
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
    } = this.state
    const { dispatch } = this.props
    this.setState({
      showDialog: true,
      dialogContent: `点击发送${year}年${month}月的证书（将会发送模板消息通知学员，谨慎操作）`,
      handleFunc: () => {
        alert('发送证书拉')
        sendCertificate(year, month).then(res => {
          if (res.code == 200) {
            dispatch(alertMsg('证书正在发送中，发送成功你将收到模板消息提醒'))
          } else {
            dispatch(alertMsg(res.msg))
          }
        })
        this.setState({
          showDialog: false,
        })
      },
    })
  }

  render () {
    const { year, month, showDialog, dialogContent, handleFunc = () => {} } = this.state

    const renderMonthItems = () => {
      const menuItems = []
      for (let i = 1; i <= 12; i++) {
        menuItems.push(<MenuItem key={i} value={i} primaryText={`${i}月`}></MenuItem>)
      }
      return menuItems
    }

    return (
      <div className="certificate-operate-container" style={{ padding: '6rem 8rem' }}>
        <SelectField floatingLabelText={'选择生成证书年份'}
                     value={year}
                     onChange={(event, index, value) => this.setState({ year: value })}>
          <MenuItem key={1} value={2018} primaryText={'2018年'}></MenuItem>
          <MenuItem key={2} value={2019} primaryText={'2019年'}></MenuItem>
        </SelectField>
        <br/>
        <SelectField floatingLabelText={'选择生成证书月份'}
                     value={month}
                     onChange={(event, index, value) => this.setState({ month: value })}>
          {renderMonthItems()}
        </SelectField>
        <br/><br/>
        <RaisedButton primary={true} label={'生成证书'} onClick={() => this.handleGenerateCertificate()}></RaisedButton>
        <RaisedButton secondary={true}
                      label={'发送证书'}
                      onClick={() => this.handleSendCertificate()}
                      style={{ marginLeft: '20px' }}></RaisedButton>

        <Dialog open={showDialog}>
          {dialogContent}
          <br/>
          <div style={{ padding: '20px 50px' }}>
            <RaisedButton style={{ marginTop: 30 }}
                          label="取消"
                          primary={true}
                          onClick={() => this.setState({ showDialog: false })}/>
            <RaisedButton style={{ marginLeft: 30 }} label="确认" primary={true} onClick={() => handleFunc()}/>
          </div>
        </Dialog>
      </div>
    )
  }

}
