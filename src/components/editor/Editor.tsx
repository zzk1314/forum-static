/**
 * Created by shen on 2017/3/18.
 */
import React from 'react';
var $ = require('jquery');
var Simditor = require('./simditor');
import "./Editor.less"
export default class Editor extends React.Component {
  propTypes: {
    value: React.PropTypes.string,   //html 字符串
    placeholder: React.PropTypes.string,
    moduleId: React.PropTypes.string,
    defaultImage: React.PropTypes.string  //选择外链图片时 展示的默认图片
  }
  constructor(props) {
    super(props);
    this.state = {
      editor: undefined
    }
  }
  componentDidMount(){
    this.state.editor = new Simditor({
      textarea: $('#editor'),
      toolbar:['title', 'bold', 'italic', 'underline', 'strikethrough', 'ol', 'ul', 'blockquote',
               'code', 'table', 'link', 'image', 'hr', 'indent', 'outdent', 'alignment'],
      upload:{
        url:'/file/image/upload/' + this.props.moduleId || 2,
        fileKey:'file'
      },
      imageButton:'upload',
      defaultImage: this.props.defaultImage //'//p0.meituan.net/dprainbow/958829a6a26fc858e17c7594d38233187415.png'
    });
    if(this.props.value && this.props.value.length>0){
      this.state.editor.setValue(this.props.value)
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.value != this.props.value){
      this.state.editor.setValue(nextProps.value)
    }
  }
  getValue(){
    return this.state.editor.getValue()
  }
  render() {
    return (
      <textarea id="editor"
                placeholder={this.props.placeholder}
                autoFocus>
      </textarea>
    );
  }
}
