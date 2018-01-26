import * as React from "react";
import { connect } from "react-redux";
import * as _ from "lodash";
import "./ConfigDetail.less"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { addConfig, loadConfig, deleteConfig, updateConfig } from "./async"
import { imgSrc } from "utils/imgSrc"
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Confirm from '../../../components/Confirm'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import AssetImg from '../../../components/AssetImg'

const style = {
  divider: {
    backgroundColor: "#f5f5f5",
  },
  listTitle: {
    height: "65px",
    padding: 0,
    overflow: "hidden",
  },
  firstItem: {
    margin: "0px auto",
    padding: "20px 0 25px"
  },
  item: {
    margin: "0 auto",
    padding: "24px 0"
  },
  itemActive: {
    color: "#55cbcb"
  },
}

@connect(state => state)
export default class ConfigDetail extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      projectId: '',
      data: [],
      config: {},
      alert: false,
      idx: 0,
      add: false,
      edit: false,
      key: "",
      value: "",
      desc: "",
    }
  }

  componentWillMount() {
    const { projectId } = this.props.location.query
    loadConfig(projectId).then(res => {
      if(res.code === 200) {
        this.setState({ projectId, data: res.msg })
      }
    })
  }

  componentWillReceiveProps(newProps) {
    if(this.props.location.query.projectId !== newProps.location.query.projectId) {
      let projectId = newProps.location.query.projectId
      loadConfig(projectId).then(res => {
        if(res.code === 200) {
          this.setState({ projectId, data: res.msg })
        }
      })
    }
  }

  onEdit() {
    const { data, desc, key, value, idx } = this.state
    this.setState({ data })
    let config = { desc, key, value, display: true }
    data[ idx ] = config
    const { dispatch } = this.props
    const { projectId } = this.props.location.query
    this.setState({ data, edit: false, key: '', value: '', desc: '' })
    updateConfig({key, value, desc, projectId}).then(res => {
      const { code, msg } = res
      if(code !== 200) {
        dispatch(alertMsg(msg))
      }
    })
  }

  onAdd() {
    let { key, value, data, desc } = this.state
    const { dispatch } = this.props
    const { projectId } = this.props.location.query
    data.push({ key, value, desc, projectId, edit: false, display: true })
    this.setState({ data, add: false, key: '', value: '', desc: '' })

    addConfig({ key, value, desc, projectId }).then(res => {
      const { code, msg } = res
      if(code !== 200) {
        dispatch(alertMsg(msg))
      }
    })

  }

  onRemove() {
    let { data, idx } = this.state
    const { dispatch } = this.props
    _.set(data[ idx ], 'display', false)
    this.setState({ data, alert: false })
    deleteConfig(data[ idx ]).then(res => {
      const { code, msg } = res
      if(code !== 200) {
        dispatch(alertMsg(msg))
      }
    })

  }

  render() {
    const { data, alert, add, key, value, desc, edit } = this.state;
    let show = edit || add
    const actions = [
      {
        "label": "确定",
        "onClick": ()=>this.onRemove(),
      },
      {
        "label": "取消",
        "onClick": () => this.setState({ alert: false }),
        "primary": true,
      }
    ]

    const addActions = [
      <RaisedButton
        label="取消"
        primary={false}
        onClick={() => this.setState({ add: false })}
      />,
      <RaisedButton
        label="确定"
        primary={true}
        onClick={() => this.onAdd()}
      />
    ]

    const editActions = [
      <RaisedButton
        label="取消"
        primary={false}
        onClick={() => this.setState({ edit: false })}
      />,
      <RaisedButton
        label="确定"
        primary={true}
        onClick={() => this.onEdit()}
      />
    ]

    const renderConfig = (configList) => {
      return (
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{width:10}}>序号</TableHeaderColumn>
              <TableHeaderColumn style={{width:120}}>Key</TableHeaderColumn>
              <TableHeaderColumn style={{width:300}}>Value</TableHeaderColumn>
              <TableHeaderColumn style={{width:200}}>配置说明</TableHeaderColumn>
              <TableHeaderColumn>操作</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {configList.map((v, idx) => {
                return (
                  v.display === true ?
                    <TableRow key={idx}>
                      <TableRowColumn style={{width:10}}>{idx + 1}</TableRowColumn>
                      <TableRowColumn style={{width:120}}>
                        {v.key}
                      </TableRowColumn>
                      <TableRowColumn style={{width:300}}>
                        {v.value}
                      </TableRowColumn>
                      <TableRowColumn style={{width:200}}>
                        {v.desc}
                      </TableRowColumn>
                      <TableRowColumn>
                        <AssetImg url={imgSrc.configEdit} size={16} marginRight={5}
                                  onClick={()=>this.setState({edit:true, value:v.value, key:v.key, desc:v.desc, idx})}/>
                        <AssetImg url={imgSrc.configRemove} size={16}
                                  onClick={()=>this.setState({alert:true, idx:idx})}/>
                      </TableRowColumn>
                    </TableRow>
                    : null)
              }
            )}
          </TableBody>
        </Table>
      )
    }

    return (
      <div className="backend-config">
        <RaisedButton
          label="添加配置"
          primary={true}
          onClick={() => this.setState({ add: true })}
        />
        {renderConfig(data)}
        <Confirm content="确定要删除这个配置吗？" open={alert} actions={actions}/>
        {add ?
          <Dialog
            title="添加配置"
            actions={addActions}
            open={add}
            autoScrollBodyContent={true}
          >
            <div className="config-dialog">
              <div className="dialog-block">
                <div className="label">Key</div>
                <textarea className="edit-textarea" cols={30} rows={10} readOnly={false}
                          onChange={(e)=>this.setState({key:e.currentTarget.value}) }/>
              </div>
              <div className="dialog-block">
                <div className="label">Value</div>
                <textarea className="edit-textarea" cols={30} rows={10} readOnly={false}
                          onChange={(e)=>this.setState({value:e.currentTarget.value})}/>
              </div>
              <div className="dialog-block">
                <div className="label">配置说明</div>
                <textarea className="edit-textarea" cols={30} rows={10} readOnly={false}
                          onChange={(e)=>this.setState({desc:e.currentTarget.value})}/>
              </div>
            </div>
          </Dialog> : null}
        {edit ?
          <Dialog
            title="添加配置"
            actions={editActions}
            open={edit}
            autoScrollBodyContent={true}
          >
            <div className="config-dialog">
              <div className="dialog-block">
                <div className="label">Key</div>
                <textarea className="edit-textarea" cols={30} rows={10} readOnly={true} value={this.state.key}
                          onChange={(e)=>this.setState({key:e.currentTarget.value}) }/>
              </div>
              <div className="dialog-block">
                <div className="label">Value</div>
                <textarea className="edit-textarea" cols={30} rows={10} readOnly={false} value={this.state.value}
                          onChange={(e)=>this.setState({value:e.currentTarget.value})}/>
              </div>
              <div className="dialog-block">
                <div className="label">配置说明</div>
                <textarea className="edit-textarea" cols={30} rows={10} readOnly={false} value={this.state.desc}
                          onChange={(e)=>this.setState({desc:e.currentTarget.value})}/>
              </div>
            </div>
          </Dialog> : null}
      </div>
    )
  }
}
