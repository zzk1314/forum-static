import * as React from "react";
import {connect} from "react-redux";
import * as _ from "lodash";
import "./ConfigDetail.less"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {addConfig, loadConfig, deleteConfig, updateConfig} from "./async"
import {imgSrc} from "utils/imgSrc"
import Divider from 'material-ui/Divider';
import Alert from '../../../components/AlertMessage'


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
  }
}


@connect(state => state)
export default class ConfigDetail extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      projectId:'',
      data:[],
      config:{},
      alert: false,
      idx:0,
      add:false,
      key:"",
      value:"",
    }
  }

  componentWillMount() {
    const {projectId} = this.props.location.query
    loadConfig(projectId).then(res => {
      if(res.code === 200){
        this.setState({projectId, data:res.msg})
      }
    })
  }

  componentWillReceiveProps(newProps){
    if(this.props.location.query.projectId!==newProps.location.query.projectId){
      let projectId = newProps.location.query.projectId
      loadConfig(projectId).then(res => {
        if(res.code === 200){
          this.setState({projectId, data:res.msg})
        }
      })
    }
  }


  onChange(key, value,idx){
    const {projectId} = this.props.location.query
    const {data} = this.state;
    _.set(data,`[${idx}].value`,value);
    this.setState({config:{key:key, value:value, projectId},data})
  }

  onEdit(idx){
    let {data} = this.state
    _.set(data[idx], 'edit', true)
    this.setState({data})
  }

  onAdd(){
    let {key,value, data} = this.state
    const {dispatch} = this.props
    const {projectId} = this.props.location.query
    data.push({key,value,projectId, edit:false, display:true})
    this.setState({data, add:false})

    addConfig({key,value,projectId}).then(res=>{
      const {code, msg} = res
      if(code !== 200){
        dispatch(alertMsg(msg))
      }
    })

  }

  onComplete(idx){
    const {dispatch} = this.props
    let {data, config} = this.state
    _.set(data[idx], 'edit', false)
    _.set(data[idx], config.key, config.value)
    this.setState({data})
    updateConfig(config).then(res=>{
      const {code, msg} = res
      if(code !== 200){
        dispatch(alertMsg(msg))
      }
    })

  }

  onRemove(){
    let {data, idx} = this.state
    const {dispatch} = this.props
    _.set(data[idx], 'display', false)
    this.setState({data, alert:false})
    deleteConfig(data[idx]).then(res=>{
      const {code, msg} = res
      if(code !== 200){
        dispatch(alertMsg(msg))
      }
    })

  }

  render() {
    const {data, alert, add} = this.state

    const actions = [
      {
        "label":"确定",
        "onClick": this.onRemove.bind(this),
        "secondary":true,
      },
      {
        "label":"取消",
        "onClick": ()=>this.setState({alert:false}),
        "primary":true,
      }
    ]

    const renderConfig = (configList)=>{
      return (
          configList.map( (v, idx)=>{
            return (
              v.display === true ?
              <div key={idx}>
                <div className="idx">{idx}</div>
                <div className="key">{v.key}</div>
                <div className="value">
                  <textarea className="edit-textarea" cols={30} rows={10} readOnly={v.edit?false:true}
                            onChange={(e)=>this.onChange(v.key, e.currentTarget.value,idx)} value={v.value} />
                </div>
                <div className="icon">
                  { v.edit === false ?
                      <img className="icon-img" src={imgSrc.configEdit} onClick={this.onEdit.bind(this, idx)}/> :
                      <img className="icon-img" src={imgSrc.configComplete} onClick={this.onComplete.bind(this, idx)}/>}
                  <img className="icon-img" src={imgSrc.configRemove} onClick={()=>this.setState({alert:true, idx:idx})}/>
                </div>
                <Divider/>
              </div>
              : null)
          }
      ))
    }

    return (
      <div className="backendContent">
        <img className="icon-img" src={imgSrc.configAdd} onClick={()=>this.setState({add:true})}/>
        {renderConfig(data)}
        <Alert content="确定要删除这个配置吗？" open={alert} actions={actions}/>
        {add?
        <div>
          <div className="key">
            <textarea className="edit-textarea" cols={30} rows={10} readOnly={false}
                      onChange={(e)=>this.setState({key:e.currentTarget.value}) }/>
          </div>
          <div className="value" style={{marginLeft:10}}>
                  <textarea className="edit-textarea" cols={30} rows={10} readOnly={false}
                            onChange={(e)=>this.setState({value:e.currentTarget.value})} />
          </div>
          <div className="icon">
            <img className="icon-img" src={imgSrc.configComplete} onClick={this.onAdd.bind(this)}/>
            <img className="icon-img" src={imgSrc.configRemove} onClick={()=>this.setState({add:false})}/>
          </div>
          <Divider/>
        </div> :null}
      </div>
    )
  }
}
