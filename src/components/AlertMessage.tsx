import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import "./AlertMessage.less"

export default class AlertMessage extends React.Component {
  propTypes: {
    open: React.PropTypes.bool,
    handlerClose: React.PropTypes.func,
    title: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    const {handleClose, open, title, modal = false, content, actions} = this.props;
    const getActions = (actions) => {

      return actions?actions.map(item =><FlatButton label={item.label} primary={!!item.primary} secondary={!!item.secondary}
                                              style={item.style} onClick={item.onClick}/>):null;
    }

    return (
      <div>
        <Dialog
          titleClassName="alertTitle"
          bodyClassName="alertBody"
          contentClassName="alertContent"
          actionsContainerClassName="alertActions"
          autoDetectWindowHeight={false}
          actions={getActions(actions)}
          title={title}
          modal={modal}
          open={open}
          onRequestClose={handleClose}
        >
          {content}
        </Dialog>
      </div>
    );
  }
}
