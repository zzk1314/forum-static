import * as React from "react";
import { SelectField, MenuItem } from 'material-ui'
import { loadSimpleKnowledges } from "../knowledge/async"

export class KnowledgeSelector extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      data: [],
      targetKnowledge:{}
    }

  }

  componentWillMount(){
    loadSimpleKnowledges(this.props.problemId).then(res => {
      if(res.code === 200) {
        this.setState({ data: res.msg })
      }
    })
  }

  componentWillReceiveProps(props){
    if(props.problemId !== this.props.problemId){
      loadSimpleKnowledges(props.problemId).then(res => {
        if(res.code === 200) {
          this.setState({ data: res.msg })
        }
      })
    }
  }


  getValue(){
    const { targetKnowledge } = this.state
    return targetKnowledge.id
  }

  onSelect(value){
    this.setState({ targetKnowledge: value})
    console.log(value)
    const {select} = this.props
    if(select){
      select(value.id)
    }
  }

  render() {
    const { data, targetKnowledge } = this.state

    return (
      <div className="knowledge-selector">
        <SelectField
          value={targetKnowledge}
          floatingLabelText="选择知识点"
          onChange={(e, idx, value) => this.onSelect(value)}
        >
          {
            data.map((knowledge, idx) => {
              return (
                <MenuItem key={idx} value={knowledge} primaryText={knowledge.knowledge}/>
              )
            })
          }
        </SelectField>
      </div>
    )
  }
}
