import React from "react";
import { connect } from "react-redux";
import './SurveyConfig.less';
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { loadSurveyConfigs, updateSurveyConfig } from "./async"
import * as _ from "lodash";
import { MessageTable } from '../message/autoreply/MessageTable'
import { RaisedButton, TextField, Toggle, Dialog, Divider, SelectField, MenuItem } from 'material-ui'

const cellStyle = {
  paddingLeft: 0,
  paddingRight: 0,
}

@connect(state => state)
export default class SurveyConfig extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      page: 1,
      meta: [
        { tag: 'name', alias: '问卷名', style: cellStyle },
        { tag: 'activity', alias: '问卷id', style: cellStyle },
      ],
      data: [],
      openDialog: false,
    }
  }

  componentWillMount() {
    this.reloadPage();
  }

  handleClickShowUpdate(dataInfo) {
    this.setState({ updateDataInfo: dataInfo, openDialog: true })
  }

  reloadPage() {
    const { dispatch } = this.props;
    dispatch(startLoad());
    loadSurveyConfigs().then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.setState({ data: res.msg });

      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  handleClickShowAdd() {
    this.setState({ updateDataInfo: {}, openDialog: true })
  }

  handleUpdate() {
    const { updateDataInfo } = this.state;
    const { dispatch } = this.props;

    if(!updateDataInfo.activity) {
      dispatch(alertMsg('请填写问卷id'));
      return;
    }
    if(!updateDataInfo.realHref) {
      dispatch(alertMsg('请填写问卷星链接'));
      return;
    }

    dispatch(startLoad());
    updateSurveyConfig(updateDataInfo).then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.setState({ openDialog: false, updateDataInfo: undefined }, () => this.reloadPage());
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  render() {
    const { openDialog, updateDataInfo = {} } = this.state;

    return (
      <div className="survey-config-page">
        <div className="survey-config-tips">
          问卷设置前提：请在问卷星，为问卷设置"数据推送API"，其值为: https://www.iquanwai.com/pc/survey/wjx/submit
        </div>
        <RaisedButton
          style={{ marginLeft: 30, marginTop: 30 }}
          label="新增" primary={true}
          onClick={() => this.handleClickShowAdd()}
        />
        <div className="data-area">
          <MessageTable data={this.state.data} meta={this.state.meta} opsButtons={[
            { editFunc: (dataInfo) => this.handleClickShowUpdate(dataInfo), opsName: '修改' },
          ]} opsName="修改"/>
        </div>
        <Dialog open={openDialog} autoScrollBodyContent={true} modal={false}>
          <div style={{
            marginTop: '0px', backgroundColor: '#efefef',
            fontSize: '25px',
            padding: '5px 25px',
            margin: '10px -25px 0',
            color: '#333'
          }}>
            问卷信息：
          </div>
          <TextField
            value={updateDataInfo.activity}
            hintText="问卷id"
            floatingLabelText="问卷id"
            multiLine={true} fullWidth={true} rowsMax={1}
            onChange={(e, v) => this.setState({ updateDataInfo: _.merge({}, updateDataInfo, { activity: v }) })}
          />
          <TextField
            value={updateDataInfo.name}
            hintText="问卷名"
            floatingLabelText="问卷名"
            multiLine={true} fullWidth={true} rowsMax={1}
            onChange={(e, v) => this.setState({ updateDataInfo: _.merge({}, updateDataInfo, { name: v }) })}
          />
          <TextField
            value={updateDataInfo.realHref}
            hintText="问卷星链接"
            floatingLabelText="问卷星链接"
            onChange={(e, v) => this.setState({ updateDataInfo: _.merge({}, updateDataInfo, { realHref: v }) })}
            multiLine={true} fullWidth={true} rowsMax={1}
          />
          <TextField
            value={updateDataInfo.mobileHref}
            hintText="移动端链接"
            floatingLabelText="移动端链接"
            multiLine={true} fullWidth={true} rowsMax={1}
            disabled={true}
          />
          <TextField
            value={updateDataInfo.pcHref}
            hintText="PC端链接"
            floatingLabelText="PC端链接"
            multiLine={true} fullWidth={true} rowsMax={1}
            disabled={true}
          />

          <RaisedButton
            style={{ marginTop: 30 }}
            label="取消" primary={true}

            onClick={() => this.setState({ openDialog: false })}/>
          <RaisedButton
            style={{ marginLeft: 30 }}
            label="提交" primary={true}
            onClick={() => this.handleUpdate()}
          />
        </Dialog>
      </div>
    )
  }

}
