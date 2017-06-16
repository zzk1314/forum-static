import * as React from "react";
import "./Discuss.less";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";

export default class Discuss extends React.Component <any, any> {
  constructor(props) {
    super()
    const {isReply, placeholder} = props
    this.state = {
      isReply: isReply,
      placeholder: placeholder,
      editDisable: false,
    }
  }

  componentWillReceiveProps(newProps) {
    if(this.state.placeholder !== newProps.placeholder) {
      this.setState({placeholder: newProps.placeholder})
    }
  }

  // componentDidMount(){
  //   this.refs.input.focus()
  //   //解决ios键盘弹出挡住输入框的问题
  //   setInterval(function() {
  //     document.body.scrollTop = document.body.scrollHeight
  //   }, 100)
  //
  // }

  onSubmit() {
    const {submit} = this.props
    submit()
  }

  render() {
    const {placeholder, editDisable} = this.state
    const {onChange, cancel} = this.props

    return (
      <div className="comment-dialog">
          <textarea ref="input" placeholder={placeholder} onChange={(e) => onChange(e.currentTarget.value)}>
          </textarea>
        <div className="comment-right-area">
          <div className="reply-tip click-key" onClick={() => cancel()}>取消评论</div>
          {
            editDisable ?
            <div className="comment-button disabled">评论中</div> :
            <div className="comment-button hover-cursor" onClick={this.onSubmit.bind(this)}>评论</div>
          }
        </div>
      </div>
    )
  }
}
