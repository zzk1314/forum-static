import * as React from 'react'
import { MessageTable } from './MessageTable'
import { Dialog, TextField, Toggle, RaisedButton } from 'material-ui'
import { loadSubscribeDefaultTextMessage, updateSubscribeMessage } from './async'

interface SubscribeMessageState {
  data: any,
  meta: any,
  showMessageEditor: boolean,

  id: number,
  message: string
  del: number
}
export default class SubscribeMessage extends React.Component<any, SubscribeMessageState> {

  constructor() {
    super()
    this.state = {
      data: [],
      meta: [
        { tag: 'message', alias: '回复内容' },
        { tag: 'del', alias: '是否失效' }
      ],
      id: -1,
      message: '',
      del: 0
    }
  }

  componentWillMount() {
    this.loadData()
  }

  loadData() {
    loadSubscribeDefaultTextMessage().then(res => {
      if(res.code === 200) {
        this.setState({ data: res.msg })
      } else {
        alert(res.msg)
      }
    })
  }

  initDataState() {
    this.setState({
      id: -1,
      message: '',
      del: 0
    })
  }

  handleClickEdit(dataItem) {
    this.initDataState()
    this.setState({
      id: dataItem.id,
      message: dataItem.message ? dataItem.message : '',
      del: dataItem.del,
      showMessageEditor: true
    })
  }

  handleUpdate() {
    const { id, message, del } = this.state
    const param = {
      id: id,
      message: message,
      del: del
    }
    updateSubscribeMessage(param).then(res => {
      if(res.code === 200) {
        if(res.code === 200) {
          this.setState({ showMessageEditor: false })
          this.loadData()
        } else {
          alert(res.msg)
        }
      }
    })
  }

  render() {
    const { data, meta, id, message, del, showMessageEditor } = this.state

    const renderMessageEditor = () => {
      if(!showMessageEditor) return
      return (
        <Dialog open={true}>
          <div style={{ padding: '20px 50px' }}>
            <TextField
              value={message}
              hintText="回复内容"
              floatingLabelText="回复内容"
              multiLine={true}
              fullWidth={true}
              onChange={(e, v) => this.setState({ message: v })}
            />
            <Toggle toggled={del === 0} label="使用中"
                    onToggle={() => this.setState({ del: del === 0 ? 1 : 0 })}/>
            <RaisedButton
              style={{ marginTop: 30 }}
              label="取消" primary={true}
              onClick={() => this.setState({ showMessageEditor: false })}/>
            <RaisedButton
              style={{ marginLeft: 30 }}
              label="提交" primary={true}
              onClick={() => this.handleUpdate()}
            />
          </div>
        </Dialog>
      )
    }

    return (
      <div style={{ padding: '20px 40px' }}>
        <h1>关注事件默认文字回复</h1>
        <MessageTable data={data} meta={meta} editFunc={(dataItem) => this.handleClickEdit(dataItem)}/>
        {renderMessageEditor()}
      </div>
    )
  }
}
