import * as React from 'react'
import { RaisedButton, TextField, Toggle, Dialog } from 'material-ui'
import { MessageTable } from './MessageTable'
import { addAutoReplyMessage, deleteAutoReplyMessage, loadTextAutoReplyMessage, reloadAutoReplyMessage, updateAutoReplyMessage } from './async'
import AlertMessage from '../../../../components/AlertMessage'

interface AutoReplyMessageState {
  data: any,
  meta: any,

  id: number,
  type: number,
  message: string,
  keyword: string,
  exact: number,
  isDefault: number,
  del: number

  showMessageEditor: boolean,
  showDeleteAlert: boolean,
  submitFunc: any
}

export default class AutoReplyMessage extends React.Component<any, AutoReplyMessageState> {

  constructor() {
    super()
    this.state = {
      data: [],
      meta: [
        { tag: 'message', alias: '回复内容' },
        { tag: 'keyword', alias: '关键词' }
      ]
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDel = this.handleDel.bind(this)
  }

  componentWillMount() {
    this.loadData()
  }

  loadData() {
    loadTextAutoReplyMessage().then(res => {
      if(res.code === 200) {
        this.setState({ data: res.msg })
      }
    })
  }

  initDataState() {
    this.setState({
      id: -1,
      type: 1,
      message: '',
      keyword: '',
      exact: false,
      isDefault: false,
      del: false,
      submitFunc: () => {}
    })
  }

  handleClickAdd() {
    this.initDataState()
    this.setState({
      showMessageEditor: true,
      submitFunc: this.handleAdd
    })
  }

  handleClickEdit(dataItem) {
    this.initDataState()
    this.setState({
      showMessageEditor: true,
      id: dataItem.id ? dataItem.id : -1,
      type: dataItem.type,
      message: dataItem.message ? dataItem.message : '',
      keyword: dataItem.keyword ? dataItem.keyword : '',
      exact: dataItem.exact,
      isDefault: dataItem.isDefault,
      del: dataItem.del,
      submitFunc: this.handleUpdate
    })
  }

  handleAdd() {
    const { id, type, message, keyword, exact, isDefault, del } = this.state
    const param = {
      type: type,
      message: message,
      keyword: keyword,
      exact: exact,
      isDefault: isDefault
    }
    addAutoReplyMessage(param).then(res => {
      if(res.code === 200) {
        this.setState({ showMessageEditor: false })
        this.loadData()
      } else {
        alert(res.msg)
      }
    })
  }

  handleUpdate() {
    const { id, type, message, keyword, exact, isDefault, del } = this.state
    const param = {
      id: id,
      type: type,
      message: message,
      keyword: keyword,
      exact: exact,
      isDefault: isDefault
    }
    updateAutoReplyMessage(param).then(res => {
      if(res.code === 200) {
        this.setState({ showMessageEditor: false })
        this.loadData()
      } else {
        alert(res.msg)
      }
    })
  }

  handleDel() {
    const { id, type, message, keyword, exact, isDefault, del } = this.state
    deleteAutoReplyMessage(id).then(res => {
      if(res.code === 200) {
        this.setState({ showDeleteAlert: false, showMessageEditor: false })
        this.loadData()
      } else {
        alert(res.msg)
      }
    })
  }

  handleReloadAutoReplyMessage() {
    reloadAutoReplyMessage().then(res => {
      if(res.code === 200) {
        alert('刷新缓存成功')
      } else {
        alert('缓存刷新失败')
      }
    })
  }

  render() {
    const {
      data, meta, id, message, keyword,
      exact, isDefault, del, showMessageEditor = false, showDeleteAlert = false,
      submitFunc = () => {}
    } = this.state
    const renderMessageEditor = () => {
      if(!showMessageEditor) return
      return (
        <Dialog open={true}>
          <div style={{ padding: '20px 50px' }}>
            <TextField
              value={keyword}
              hintText="回复关键词，多个关键词用 ‘|’ 分隔"
              floatingLabelText="回复关键词，多个关键词用 ‘|’ 分隔"
              fullWidth={true}
              onChange={(e, v) => this.setState({ keyword: v })}
            />
            <TextField
              value={message}
              hintText="详细内容"
              floatingLabelText="详细内容"
              fullWidth={true} multiLine={true}
              onChange={(e, v) => this.setState({ message: v })}
            /><br/>
            <Toggle toggled={exact} label="是否精准匹配"
                    onToggle={() => this.setState({ exact: !exact })}/>
            <Toggle toggled={isDefault} label="是否默认回复"
                    onToggle={() => this.setState({ isDefault: !isDefault })}/>
            <RaisedButton
              style={{ marginTop: 30 }}
              label="取消" primary={true}
              onClick={() => this.setState({ showMessageEditor: false })}/>
            <RaisedButton
              style={{ marginLeft: 30 }}
              label="删除" secondary={true}
              onClick={() => this.setState({ showDeleteAlert: true })}/>
            <RaisedButton
              style={{ marginLeft: 30 }}
              label="提交" primary={true}
              onClick={() => submitFunc()}
            />
          </div>
        </Dialog>
      )
    }

    const renderOtherComponents = () => {
      const actions = [
        { label: '确认', onClick: () => this.handleDel() },
        { label: '取消', onClick: () => this.setState({ showDeleteAlert: false }) }
      ]

      return (
        <AlertMessage
          open={showDeleteAlert}
          content="确认删除该条自动回复"
          actions={actions}/>
      )
    }

    return (
      <div style={{ padding: '20px 40px'}}>
        <RaisedButton
          label="新增自动回复"
          onClick={() => this.handleClickAdd()}/>
        <RaisedButton
          label="刷新缓存" primary={true} style={{ marginLeft: 30 }}
          onClick={() => this.handleReloadAutoReplyMessage()}/>
        <MessageTable data={data} meta={meta} editFunc={(dataItem) => this.handleClickEdit(dataItem)}/>
        {renderMessageEditor()}
        {renderOtherComponents()}
      </div>
    )
  }
}
