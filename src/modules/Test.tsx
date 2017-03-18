/**
 * Created by shen on 2017/3/18.
 */
import * as React from "react"
import {connect} from "react-redux"
import Editor from "../components/editor/Editor"

@connect(state => state)
export default class Reject extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      html:undefined,
      html2:''
    }
  }
  componentDidMount(){
    console.warn(this.refs.editor.getValue())
  }
  getValue(){
    this.state.html = this.refs.editor.getValue()
    console.warn(this.state.html)
    this.setState(this.state)
  }
  setValue(){
    this.html2 = '<p><b>神用浅色噶时代&nbsp;</b></p><p><b>萨达</b></p><hr><ol><li>打双打</li><li>萨达省</li></ol>';
    this.setState(this.state)
  }
  render() {
    return (<div>
      <div style={{"width":"500px","display":"inline-block","border":"1px solid #ddd","verticalAlign": "middle"}}>
        <Editor ref="editor" value={this.html2}/>
      </div>
      <div style={{"width":"120px","textAlign":"center","display":"inline-block","verticalAlign": "middle"}}>
        <p><a onClick={()=>{this.getValue()}} style={{"lineHeight":"40px"}}>获取html</a></p>
        <p><a onClick={()=>{this.setValue()}} style={{"lineHeight":"40px"}}>更新</a></p>
      </div>
      <div
        dangerouslySetInnerHTML={{__html:this.state.html}}
        style={{"width":"500px","height":"600px","display":"inline-block","border":"1px solid #ddd","verticalAlign": "middle"}}>
      </div>
    </div>)
  }
}
