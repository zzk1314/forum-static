import * as React from "react"
import { loadApplication } from "../async";

export default class ApplicationEditView extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {practice: {}}
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
    return (
      <div>
        <div>{topic}</div>
        <div>{description}</div>
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
