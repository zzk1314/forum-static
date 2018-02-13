import * as React from "react";
import "./Discuss.less";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import { renderExist } from "../../../utils/helpers";

export default class Discuss extends React.Component <any, any> {
  constructor(props) {
    super();
    const { isReply, placeholder } = props;
    this.state = {
      isReply: isReply,
      placeholder: placeholder,
      editDisable: false,
      length: 0,
    }
  }

  componentWillReceiveProps(newProps) {
    if(this.state.placeholder !== newProps.placeholder) {
      this.setState({ placeholder: newProps.placeholder })
    }
  }

  onSubmit() {
    const { submit } = this.props;
    const result = submit();
    if(result !== false) {
      this.refs.input.value = '';
    }
  }

  change(value) {
    const { onChange } = this.props;
    this.setState({ length: value.length });
    onChange(value);
  }

  render() {
    const { placeholder, editDisable, length } = this.state;
    const { cancel, showCancelBtn = true, limit } = this.props;

    return (
      <div className="comment-dialog">
        <div className="textarea-div">
          <textarea ref="input" placeholder={placeholder} maxLength={limit}
                    onChange={(e) => this.change(e.currentTarget.value)}>
          </textarea>
        </div>
        <div className="comment-right-area">
          {renderExist(showCancelBtn, <div className="reply-tip click-key" onClick={() => cancel()}>取消评论</div>)}
          {
            editDisable ?
              <div className="comment-button disabled">评论中</div> :
              <div className="comment-button hover-cursor" onClick={()=>this.onSubmit()}>评论</div>
          }
        </div>
        <div className="length-div">
          <div className="length-tip">
            {length} / {limit}
          </div>
        </div>
      </div>
    )
  }
}
