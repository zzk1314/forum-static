import * as React from "react";
import {connect} from "react-redux";
import "./SmsManager.less"
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import {sendMessage} from "./async";
import {set, startLoad, endLoad, alertMsg} from "../../../redux/actions"


const textareaStyle = {
  border: '1px solid rgb(224, 224, 224)'
}
const hintStyle = {
  top: '12px',
  left: '0'
}

@connect(state=>state)
export default class SmsManager extends React.Component<any,any> {
  constructor() {
    super();
    this.state = {phone: '', content: ''}
  }

  handleClickSendMessage(phone, content) {
    const {dispatch} = this.props;
    if(!phone){
      dispatch(alertMsg("请输入电话号码"));
    }
    if(!content){
      dispatch(alertMsg("请输入短信内容"));
    } else {
      if(content.length > 350){
        dispatch(alertMsg("短信内容不得超过350字"));
      }
    }


    dispatch(startLoad());
    sendMessage(phone, content).then((res) => {
      dispatch(endLoad());
      if(res.code === 200){
        dispatch(alertMsg("发送成功"));
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex=>{
      dispatch(endLoad());
      dispatch(alertMsg(res.msg));
    })
  }

  render() {
    const {phone, content} = this.state;

    return (
      <div className="sms-manager">
        <div className="sms-send-form">
          <div className="sms-title">
            <TextField
              style={{width:'150px'}}
              hintText="请输入手机号"
              value={phone}
              onChange={(event,value)=> this.setState({phone:value})}
            />
            <FlatButton
              label="发送短信"
              labelPosition="before"
              primary={true}
              icon={<CommunicationEmail/>}
              onClick={()=>{this.handleClickSendMessage(phone,content)}}
            />
          </div>
          <div className="sms-content">
            <TextField
              fullWidth={true}
              textareaStyle={textareaStyle}
              hintText="请输入短信内容"
              multiLine={true}
              rows={5}
              rowsMax={5}
              underlineShow={false}
              hintStyle={hintStyle}
              value={content}
              onChange={(event,value)=>{this.setState({content:value})}}
            />
            字数:{content.length}
          </div>
        </div>
      </div>
    )
  }
}
