import * as React from "react";
import "./Modal.less";

export default class Modal extends React.Component<any,any> {
  constructor(props) {
    super(props);
  }


  render() {
    const renderButton = (buttons = []) => {
      if (!buttons || buttons.length > 2) {
        return null;
      }
      if (buttons.length == 2) {
        return (
          buttons.map((item, key) => {
            return <div className={`${key==0?'left':'right'}`} onClick={()=>item.click()}>{item.content}</div>
          })
        )
      } else {
        return (
          <div className="button" onClick={()=>buttons[0].click()}>{buttons[0].content}</div>
        )
      }
    }

    return (
      <div className="modal">
        {this.props.show ?<div className="mask">
          <div className="finished-modal" style={{height:`${this.props.height?this.props.height:349}px`}}>
            {this.props.header && this.props.header.replace ? this.props.header.children :
              <div className="modal-header">{this.props.header ? this.props.header.children : null}</div>}
            <div className="modal-context">
              {this.props.children}
            </div>
            <div className="modal-button-footer">
              {renderButton(this.props.buttons)}
            </div>
          </div>
        </div>: null}
      </div>
    )
  }
}
