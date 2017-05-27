import * as React from "react"
import { loadRiseWorkList } from "../async";

export default class ApplicationEditList extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      problemId: undefined,
      practices: []
    }
  }

  // 页面更新之后再次渲染
  componentDidUpdate() {
    const locationProblemId = this.props.location.query.problemId
    if(this.state.problemId === undefined || locationProblemId !== this.state.problemId) {
      this.setState({problemId: locationProblemId}, () => {
        loadRiseWorkList(locationProblemId).then(res => {
          this.setState({practices: res.msg})
          console.log(res.msg)
        }).catch(e => {
          console.error(e)
        })
      })
    }
  }

  onClickGoEditView(practiceId) {
    console.log(practiceId)
    this.context.router.push({
      pathname: "/backend/application/edit/view",
      query: {practiceId: practiceId}
    })
  }


  renderPractices() {
    const practices = this.state.practices
    return (
      <div>
        {practices.map(practice => (
          <div onClick={() => this.onClickGoEditView(practice.id)} key={practice.id}>{practice.topic}</div>
        ))}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderPractices()}
      </div>
    )
  }

}
