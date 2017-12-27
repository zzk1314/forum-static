import * as React from 'react'
import { TextField, RaisedButton } from 'material-ui'
import { loadAssistCatalogs, loadAssists,loadUnAssistByNickName } from './async'
import { AsstDataTable } from './components/AsstDataTable'

export default class AsstImport extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      meta: [
        { tag: 'nickName', alias: '昵称' },
        { tag: 'roleName', alias: '教练类别' }
      ],
      add: false,
    }
  }

  componentWillMount() {
    //加载教练类别
    loadAssistCatalogs().then(res => {
      if(res.code === 200) {
        this.setState({
          assistCatalogs: res.msg
        })
      }
    })
    this.loadUpdateAssists()
  }

  /**
   * 根据NickName加载非教练
   */
  loadUnAssistByNickName() {
    loadUnAssistByNickName(this.state.nickName).then(res => {
      if(res.code === 200) {
        this.setState({ data: res.msg })
      }
    })
  }

  /**
   *加载需要更新的教练
   */
   loadUpdateAssists(){
    loadAssists().then(res=>{
      if(res.code === 200){
        this.setState({
          data:res.msg
        })
      }
    })
  }


  render() {
    const {
      data,
      assistCatalogs,
      meta,
      nickName,
      add
    } = this.state

    const renderSelect = () => {
      return (
        <div>
          {add? <RaisedButton
            label="更新教练" primary={true}
            onClick={() => {
              this.loadUpdateAssists()
              this.setState({ add: false}
              )}
            }
          />: <RaisedButton
            label="添加教练" primary={true}
            style={{ marginRight: 50 }}
            onClick={() => this.setState({ add: true,data:[],nickName:''})}
          />}
        </div>
      )
    }

    /**
     * 加载add
     */
    const renderAdd = () =>{
      return(
        <div>
          <TextField style={{height:50,width:200}} hintText="如：天线宝宝" value={nickName} onChange={(e,v)=> this.setState({
            nickName:v
          })}/>
          <RaisedButton
            label="昵称查询"
            style={{ height: 30, marginLeft: 20 }}
            onClick={() => this.loadUnAssistByNickName()}/>
          <AsstDataTable ref="table" data={data} meta={meta} assistCatalogs={assistCatalogs} addFunc={()=>this.loadUnAssistByNickName()}/>
        </div>
      )
    }


    /**
     * 加载Update
     **/
    const renderUpdate = ()=>{
      return (
        <AsstDataTable ref="table" data={data} meta={meta} assistCatalogs={assistCatalogs} editFunc={()=>this.loadUpdateAssists()}/>
      )
    }

    return (
      <div style={{ padding: '20px 40px' }}>
        {renderSelect()}
        {add? renderAdd():renderUpdate()}
      </div>
    )
  }
}
