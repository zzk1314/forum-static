import * as React from "react";
import "./ChoiceEditor.less";
import { Checkbox, TextField } from "material-ui";

interface ChoiceEditorProps {
  onChange: object; // check校验
}
interface ChoiceEditorStates {
  choiceLabel: string; // 显示文字
  selected: boolean; // 是否选择
}
export default class ChoiceEditor extends React.Component<ChoiceEditorProps, ChoiceEditorStates> {

  constructor() {
    super()
    this.state = {
      choiceLabel: "",
      selected: false
    }
  }

  handleOnChangeChoiceEditor() {
    const { selected, choiceLabel } = this.state
    this.props.onChange(selected, choiceLabel)
  }

  handleChangeSelected(ev, isInputCheck) {
    this.setState({ selected: isInputCheck }, () => {
      this.handleOnChangeChoiceEditor()
    })
  }

  handleChangeChoiceLabel(ev, value) {
    this.setState({ choiceLabel: value }, () => {
      this.handleOnChangeChoiceEditor()
    })
  }

  render() {
    return (
      <div className="choice-editor-container">
        <Checkbox
          className="choice-checkbox" label=""
          onCheck={(ev, selected) => this.handleChangeSelected(ev, selected)}/>
        <TextField
          className="choice-textfield" hintText="在此输入选择题信息"
          onChange={(ev, value) => this.handleChangeChoiceLabel(ev, value)}/>
      </div>
    )
  }

}
