import * as React from "react"
import { loadApplication } from "../async";
import { default as Editor, Editor } from "../../../../components/editor/Editor"

export default class ApplicationEditView extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {practice: {}, editable: false}
  }

  componentWillMount() {
    const practiceId = this.props.location.query.practiceId
    loadApplication(practiceId).then(res => {
      console.log("view", res)
      this.setState({practice: res.msg})
    }).catch(e => {
      console.error(e)
    })
  }

  renderPracticeArticle() {
    const {description, topic} = this.state.practice
    const {editable} = this.state
    return (
      this.state.editable ?
        <div>
          <div>{topic}</div>
          <div>{description}</div>
        </div> :
        <div>
          <Editor id="topic" value={topic} ref="topic"/>
          <Editor id="description" value={description} ref="description"/>
        </div>
    )
  }

  render() {
    console.log(this.props)
    console.log(this.state)
    return (
      <div>{this.renderPracticeArticle()}</div>
    )
  }

}
