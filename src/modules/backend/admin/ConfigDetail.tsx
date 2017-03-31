import * as React from "react";
import {connect} from "react-redux";
import {List, ListItem,makeSelectable} from 'material-ui/List';
import * as _ from "lodash";
import "./ConfigDetail.less"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {TextField} from 'material-ui/TextField';
import {addConfig, loadConfig, deleteConfig, updateConfig} from "./async"
import {imgSrc} from "utils/imgSrc"
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';


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
      data:{},
      config:{},
    }
  }

  componentWillMount() {
    const {projectId} = this.props.location.query
    loadConfig(projectId).then(res => {
      if(res.code === 200){
        this.setState({projectId, data:_.merge(res.msg, {display:true, edit:false})})
      }
    })
  }


  onChange(key, value){
    this.setState({config:{key:key, value:value}})
  }

  onEdit(key){
    console.log(key)
  }

  onComplete(key){
    console.log(key)
  }

  render() {
    const {data} = this.state

    return (
      <div className="backendContent">
        {_.keys(data).map( (key)=>{
          return (
          data.display === true ?
            <div key={key}>
              <div className="key">{key}</div>
              <div className="value">
                {data.edit === false ?
                  <textarea className="config-textarea" cols={30} rows={10} readOnly={true}
                    defaultValue={`data.${key}`} />:
                    <textarea className="config-textarea" cols={30} rows={10} readOnly={false}
                              onChange={(e)=>this.onChange(key, e.currentTarget.value)} defaultValue={`data.${key}`} />
                }
              </div>
              <div className="icon">
                { data.edit === false ?
                <img className="icon-img" src={imgSrc.configEdit} onClick={this.onEdit.bind(this, key)}/> :
                    <img className="icon-img" src={imgSrc.configComplete} onClick={this.onComplete.bind(this, key)}/>}
                <img className="icon-img" src={imgSrc.configAdd}/>
                <img className="icon-img" src={imgSrc.configRemove}/>
              </div>
              <Divider/>
            </div>
            : null
          )
        })}
      </div>
    )
  }
}
