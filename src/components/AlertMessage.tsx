import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import './AlertMessage.less'

export default class AlertMessage extends React.Component<any, any> {

  constructor () {
    super()
  }

  render () {
    const { open, handleClose, title, modal = false, actions } = this.props
    const getActions = (actions) => {
      return actions &&
        actions.map(item =>
          <FlatButton label={item.label}
                      primary={!!item.primary}
                      secondary={!!item.secondary}
                      style={item.style}
                      onClick={item.onClick}/>)
    }

    // 将 props 中的 content 转换成数组，方便下面进行换行处理
    let content = []
    if (this.props.content) {
      content = this.props.content.split('<br/>')
    }

    return (
      <div className="alert-message">
        <Dialog titleClassName="alertTitle"
                bodyClassName="alertBody"
                contentClassName="alertContent"
                actionsContainerClassName="alertActions"
                autoDetectWindowHeight={false}
                actions={getActions(actions)}
                title={title}
                modal={modal}
                open={open}
                onRequestClose={handleClose}>
          {content.map((item, index) => <div key={index}>{item}</div>)}
        </Dialog>
      </div>
    )
  }
}
