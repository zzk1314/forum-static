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
      select: false,
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
      select,
      nickName,
      add
    } = this.state

    const renderSelect = () => {
      return (
        <div>
          <RaisedButton
            label="添加教练" primary={true}
            style={{ marginRight: 50 }}
            onClick={() => this.setState({ add: true, select: true })}
          />
          <RaisedButton
            label="更新教练" primary={true}
            onClick={() => {
              this.loadUpdateAssists()
              this.setState({ add: false, select: true }
              )}
            }
          />
        </div>
      )
    }

    //教练升降级
    const renderAddName = () => {
      if(add) {
        return (
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
      } else {
        return (
          <AsstDataTable ref="table" data={data} meta={meta} assistCatalogs={assistCatalogs} editFunc={()=>this.loadUpdateAssists()}/>
        )
      }
    }

    return (
      <div style={{ padding: '20px 40px' }}>
        {select ? renderAddName() : renderSelect()}
      </div>
    )
  }

}
